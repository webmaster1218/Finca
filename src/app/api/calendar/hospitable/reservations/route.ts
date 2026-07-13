import { NextResponse } from 'next/server';
import { getHospitableToken } from '@/lib/hospitable';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const propertyUuid = '64a2977f-a48b-4ec6-8bd1-f8e11db5b40a';
    const apiToken = getHospitableToken();

    if (!apiToken) {
        console.error('[API Reservations] HOSPITABLE_API_TOKEN is not configured.');
        return NextResponse.json({
            error: 'HOSPITABLE_API_TOKEN is not configured',
            details: 'Ensure HOSPITABLE_TOKEN_1 through TOKEN_5 are set in Hostinger environment variables.'
        }, { status: 500 });
    }

    if (!start_date || !end_date) {
        return NextResponse.json({ error: 'start_date and end_date are required' }, { status: 400 });
    }

    const url = new URL('https://public.api.hospitable.com/v2/reservations');
    url.searchParams.append('start_date', start_date);
    url.searchParams.append('end_date', end_date);
    url.searchParams.append('properties[]', propertyUuid);
    url.searchParams.append('include', 'financials,guest,properties,listings');

    try {
        console.log(`[API Reservations] Requesting range: ${start_date} to ${end_date}`);
        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[API Reservations] Hospitable Error (${response.status}): ${errorText}`);
            return NextResponse.json({
                error: 'Hospitable API Error',
                status: response.status,
                details: errorText
            }, { status: response.status });
        }

        const data = await response.json();

        const count = Array.isArray(data.data) ? data.data.length : (Array.isArray(data) ? data.length : 0);
        console.log(`[API Reservations] Success. Received ${count} reservations.`);

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API Reservations] Fetch failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const apiToken = getHospitableToken();
    const propertyUuid = '64a2977f-a48b-4ec6-8bd1-f8e11db5b40a';

    if (!apiToken) {
        return NextResponse.json({ error: 'HOSPITABLE_API_TOKEN is not configured' }, { status: 500 });
    }

    try {
        const body = await request.json();
        body.property_id = propertyUuid;

        console.log('[API Reservations] POST Payload:', JSON.stringify(body, null, 2));

        // Get info for alerts
        const guestName = `${body.guest?.first_name || ''} ${body.guest?.last_name || ''}`.trim() || 'Huésped';
        const guestEmail = body.guest?.email || '';
        const guestPhone = body.guest?.phone || '';
        const checkIn = body.check_in || '';
        const checkOut = body.check_out || '';
        const adults = body.guests?.adults || 0;
        const children = body.guests?.children || 0;
        const infants = body.guests?.infants || 0;
        const pets = body.guests?.pets || 0;

        const totalAmountCents = body.financials?.other_fees?.[0]?.amount || 0;
        const totalAmountFormatted = totalAmountCents > 0
            ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(totalAmountCents / 100)
            : '$0 COP';

        // 1. Send Email Notification (Both Admin & Guest)
        try {
            const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
            const smtpPort = parseInt(process.env.SMTP_PORT || '465');
            const smtpUser = process.env.SMTP_USER || '';
            const smtpPass = process.env.SMTP_PASS || '';
            const smtpFrom = process.env.SMTP_FROM || smtpUser || 'reservas@lajuanacerrotusa.com';
            const adminEmail = process.env.SMTP_TO || 'lajuanacerrotusa@gmail.com';

            if (smtpUser && smtpPass) {
                const transporter = nodemailer.createTransport({
                    host: smtpHost,
                    port: smtpPort,
                    secure: true,
                    auth: {
                        user: smtpUser,
                        pass: smtpPass,
                    },
                });

                // Standard recipient list: admin and guest (if exists)
                const recipients = [adminEmail];
                if (guestEmail) {
                    recipients.push(guestEmail);
                }
                // Resolve path to the logo file in the public folder
                const logoPath = path.join(process.cwd(), 'public', 'identidad de marca', 'LOGO LA JUANA CERRO TUSA-01.png');
                const attachments: any[] = [];
                let hasLogoAttachment = false;

                if (fs.existsSync(logoPath)) {
                    attachments.push({
                        filename: 'logo.png',
                        path: logoPath,
                        cid: 'logo'
                    });
                    hasLogoAttachment = true;
                }

                const emailHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body {
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            background-color: #fafaf9;
                            color: #222222;
                            margin: 0;
                            padding: 0;
                            -webkit-font-smoothing: antialiased;
                        }
                        .container {
                            max-width: 600px;
                            margin: 40px auto;
                            background-color: #ffffff;
                            border-radius: 24px;
                            overflow: hidden;
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                            border: 1px solid #ebebeb;
                        }
                        .header {
                            background-color: #1a3c34;
                            color: #ffffff;
                            padding: 40px 30px;
                            text-align: center;
                        }
                        .header img {
                            max-height: 80px;
                            margin-bottom: 20px;
                            display: block;
                            margin-left: auto;
                            margin-right: auto;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 28px;
                            font-weight: 700;
                            letter-spacing: -0.5px;
                        }
                        .header p {
                            margin: 10px 0 0 0;
                            font-size: 16px;
                            opacity: 0.9;
                        }
                        .content {
                            padding: 40px 30px;
                        }
                        .welcome-text {
                            font-size: 18px;
                            line-height: 1.6;
                            color: #444444;
                            margin-bottom: 30px;
                        }
                        .details-box {
                            background-color: #f7f7f7;
                            border-radius: 16px;
                            padding: 24px;
                            margin-bottom: 30px;
                            border: 1px solid #ebebeb;
                        }
                        .details-row {
                            display: flex;
                            justify-content: space-between;
                            padding: 12px 0;
                            border-bottom: 1px solid #ebebeb;
                        }
                        .details-row:last-child {
                            border-bottom: none;
                        }
                        .details-label {
                            font-weight: bold;
                            color: #717171;
                            font-size: 14px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        .details-value {
                            font-weight: 600;
                            color: #222222;
                            font-size: 15px;
                            text-align: right;
                        }
                        .total-row {
                            display: flex;
                            justify-content: space-between;
                            padding-top: 16px;
                            margin-top: 8px;
                            border-top: 2px solid #dddddd;
                        }
                        .total-label {
                            font-size: 18px;
                            font-weight: bold;
                            color: #1a3c34;
                        }
                        .total-value {
                            font-size: 20px;
                            font-weight: bold;
                            color: #1a3c34;
                        }
                        .footer {
                            background-color: #f7f7f7;
                            padding: 20px 30px;
                            text-align: center;
                            font-size: 12px;
                            color: #717171;
                            border-top: 1px solid #ebebeb;
                        }
                        .footer a {
                            color: #1a3c34;
                            text-decoration: underline;
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            ${hasLogoAttachment ? '<img src="cid:logo" alt="Logo La Juana Cerro Tusa" />' : ''}
                            <h1>¡Solicitud de Reserva Recibida!</h1>
                            <p>Finca La Juana Cerro Tusa</p>
                        </div>
                        <div class="content">
                            <p class="welcome-text">
                                Hola <strong>${guestName}</strong>,<br><br>
                                Hemos recibido correctamente tu solicitud de reserva. A continuación encontrarás el resumen de los detalles de tu estadía:
                            </p>
                            <div class="details-box">
                                <div class="details-row">
                                    <span class="details-label">Llegada (Check-in)</span>
                                    <span class="details-value">${checkIn}</span>
                                </div>
                                <div class="details-row">
                                    <span class="details-label">Salida (Check-out)</span>
                                    <span class="details-value">${checkOut}</span>
                                </div>
                                <div class="details-row">
                                    <span class="details-label">Huéspedes</span>
                                    <span class="details-value">
                                        ${adults} Adultos${children > 0 ? `, ${children} Niños` : ''}${infants > 0 ? `, ${infants} Bebés` : ''}${pets > 0 ? `, ${pets} Mascotas` : ''}
                                    </span>
                                </div>
                                <div class="details-row">
                                    <span class="details-label">Contacto del Huésped</span>
                                    <span class="details-value">${guestPhone} / ${guestEmail}</span>
                                </div>
                                <div class="total-row">
                                    <span class="total-label">Total Estadia</span>
                                    <span class="total-value">${totalAmountFormatted} COP</span>
                                </div>
                            </div>
                            <p style="font-size: 14px; color: #717171; line-height: 1.5; text-align: center;">
                                En breve nos pondremos en contacto contigo para formalizar la reserva, el contrato de arrendamiento y coordinar el pago.
                            </p>
                        </div>
                        <div class="footer">
                            Si tienes alguna duda inmediata, puedes contactarnos por WhatsApp al <a href="https://wa.me/573021025621">+57 302 102 5621</a>.
                        </div>
                    </div>
                </body>
                </html>
                `;

                console.log(`[API Reservations] Sending email alert to: ${recipients.join(', ')}`);
                await transporter.sendMail({
                    from: `"Finca La Juana Cerro Tusa" <${smtpFrom}>`,
                    to: recipients.join(', '),
                    subject: `Nueva Reserva - Finca La Juana Cerro Tusa (${guestName})`,
                    html: emailHtml,
                    attachments: attachments
                });
                console.log('[API Reservations] Email notification sent successfully.');
            } else {
                console.warn('[API Reservations] SMTP configuration missing. Skipping email.');
            }
        } catch (mailError) {
            console.error('[API Reservations] Error sending email alert:', mailError);
        }

        // 2. Send WhatsApp Notification via Evolution API (to multiple numbers)
        try {
            const evolutionUrl = process.env.EVOLUTION_API_URL;
            const evolutionApiKey = process.env.EVOLUTION_API_KEY;
            const targetNumbers = ['573004435894', '573196588185'];

            if (evolutionUrl && evolutionApiKey) {
                const messageText = `🏡 *Nueva Reserva - Finca La Juana Cerro Tusa*\n\n` +
                    `👤 *Huésped:* ${guestName}\n` +
                    `📞 *Teléfono:* ${guestPhone}\n` +
                    `✉️ *Email:* ${guestEmail}\n\n` +
                    `📅 *Llegada:* ${checkIn}\n` +
                    `📅 *Salida:* ${checkOut}\n` +
                    `👥 *Huéspedes:* ${adults} Adultos, ${children} Niños, ${infants} Bebés, ${pets} Mascotas\n` +
                    `💰 *Total:* ${totalAmountFormatted} COP\n\n` +
                    `🔔 _Registrando reserva en Hospitable..._`;

                for (const targetWhatsapp of targetNumbers) {
                    console.log(`[API Reservations] Sending WhatsApp alert to ${targetWhatsapp}`);
                    const waResponse = await fetch(evolutionUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': evolutionApiKey
                        },
                        body: JSON.stringify({
                            number: targetWhatsapp,
                            text: messageText
                        })
                    });

                    if (!waResponse.ok) {
                        const waErr = await waResponse.text();
                        console.error(`[API Reservations] WhatsApp API Error for ${targetWhatsapp} (${waResponse.status}): ${waErr}`);
                    } else {
                        console.log(`[API Reservations] WhatsApp alert sent successfully to ${targetWhatsapp}.`);
                    }
                }
            } else {
                console.warn('[API Reservations] Evolution API config missing. Skipping WhatsApp alert.');
            }
        } catch (waError) {
            console.error('[API Reservations] Error sending WhatsApp alert:', waError);
        }

        // 3. Call Hospitable API
        console.log('[API Reservations] Sending booking request to Hospitable...');
        const response = await fetch('https://public.api.hospitable.com/v2/reservations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[API Reservations] Hospitable POST Error (${response.status}): ${errorText}`);
            try {
                return NextResponse.json(JSON.parse(errorText), { status: response.status });
            } catch {
                return NextResponse.json({ error: errorText }, { status: response.status });
            }
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API Reservations] POST failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

