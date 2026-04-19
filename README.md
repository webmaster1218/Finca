# Finca Juana Cerro Tusa - Página Web

Este proyecto es una aplicación web moderna construida con **Next.js 16** diseñada para la **Finca Juana**, ubicada cerca del majestuoso **Cerro Tusa** en Antioquia, Colombia. La plataforma ofrece una experiencia visual premium para los visitantes y un sistema de gestión para los administradores.

## 🚀 Tecnologías Principales

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Calendario:** [FullCalendar](https://fullcalendar.io/)
- **Gestión de Fechas:** `date-fns`

## ✨ Características Principales

### Para Visitantes (Landing Page)
- **Hero Section:** Introducción visual impactante con galerías integradas.
- **Cerro Tusa Feature:** Sección dedicada a resaltar la cercanía con el hito natural.
- **Experiencias y Tours:** Catálogo de actividades ecológicas y experiencias locales.
- **Habitaciones:** Detalle de las opciones de alojamiento.
- **Galería Interactiva:** Visualización de alta calidad de las instalaciones.
- **Reseñas:** Sección de testimonios de clientes.
- **Ubicación:** Mapa integrado y detalles de llegada.
- **Botón Flotante de WhatsApp:** Acceso directo para atención al cliente personalizada.
- **Sistema de Reserva:** Interfaz intuitiva para consultar disponibilidad (BookingCard).

### Para Administradores (Dashboard)
- **Panel de Admin:** `/admin` - Un área protegida para la gestión de la finca.
- **Calendario Maestro:** `/admin/calendario` - Visualización y gestión completa de reservas mediante FullCalendar.
- **Integración Hospitable:** Sincronización con la plataforma Hospitable para la gestión de propiedades.
- **Gestión de Estado:** Manejo de disponibilidad en tiempo real.

## 📂 Estructura del Proyecto

```text
src/
├── app/                  # Rutas y páginas (App Router)
│   ├── admin/            # Dashboard de administración
│   ├── api/              # Endpoints del backend (Auth, Calendar)
│   ├── galeria/          # Página secundaria de galería
│   ├── politicas/        # Términos y condiciones
│   └── globals.css       # Estilos globales y Tailwind
├── components/           # Componentes modulares de React
│   ├── AdminCalendar.tsx # Lógica compleja del calendario admin
│   ├── BookingCard.tsx   # Tarjeta de reserva para el usuario
│   ├── Hero.tsx          # Sección principal
│   └── ...               # Otros componentes de UI
├── context/              # Proveedores de estado global
├── lib/                  # Utilidades y funciones auxiliares
└── middleware.ts         # Protección de rutas y lógica intermedia
```

## 🛠️ Configuración e Instalación

### Requisitos Previos
- Node.js (Versión recomendada: 20 o superior)
- npm o yarn

### Pasos
1. **Clonar el repositorio:**
   ```bash
   git clone [url-del-repositorio]
   cd "FINCA JUANA CERRO TUSA/1. Pagina web"
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz con el siguiente formato:
   ```env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=tu_password_seguro
   HOSPITABLE_TOKEN_1=...
   HOSPITABLE_TOKEN_2=...
   HOSPITABLE_TOKEN_3=...
   HOSPITABLE_TOKEN_4=...
   HOSPITABLE_TOKEN_5=...
   ```

4. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

5. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🔐 Seguridad
El área administrativa está protegida por un sistema de autenticación simplificado basado en el middleware de Next.js y variables de entorno. Para cambiar las credenciales de acceso, modifique el archivo `.env`.

---
*Desarrollado para Finca Juana Cerro Tusa.*
