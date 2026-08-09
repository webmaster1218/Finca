import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";
import { isLocale, defaultLocale, type Locale } from "../../lib/i18n/locales";
import { getDictionary } from "../../lib/i18n/getDictionary";
import { LanguageProvider } from "../../context/LanguageContext";
import ChatWidgetLoader from "../../components/ChatWidgetLoader";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

type Params = { locale: string };

export async function generateStaticParams(): Promise<{ locale: Locale }[]> {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : defaultLocale;
  const baseUrl = "https://lajuanacerrotusa.com";
  const title =
    lang === "es"
      ? "La Juana | Alquiler de Finca de Lujo en Venecia Antioquia, Cerro Tusa"
      : "La Juana | Luxury Ranch Rental in Venecia Antioquia, Cerro Tusa";
  const description =
    lang === "es"
      ? "Descubre La Juana, una finca de lujo en Venecia, Antioquia. El hospedaje perfecto cerca a Medellín para familias con vistas increíbles al Cerro Tusa. Reserva tu alquiler de finca completa hoy."
      : "Discover La Juana, a luxury ranch in Venecia, Antioquia. The perfect stay near Medellín for families with incredible views of Cerro Tusa. Book your full ranch rental today.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    verification: {
      google: "QIvhXhniE0DgvFshZOoaCTGiPm0w1ARVACde6fcsZis",
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/${defaultLocale}`,
      },
    },
    openGraph: {
      locale: lang === "es" ? "es_ES" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
           'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KD4PBWJF');`}
        </Script>
      </head>
      <body className="antialiased font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KD4PBWJF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <LanguageProvider language={locale} dictionary={dictionary}>
          {children}
          <ChatWidgetLoader />
        </LanguageProvider>
      </body>
    </html>
  );
}
