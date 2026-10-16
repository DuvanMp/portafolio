# Portafolio · Duvan Martínez

Sitio personal hecho con **React (Vite)** y una función **Node.js** para el formulario de contacto. Bilingüe (español / inglés) y con modo oscuro automático.

## Estructura

```
api/contact.js      → función Node.js que envía los mensajes del formulario (Vercel)
src/content.js      → TODO el texto del sitio (edítalo aquí)
src/App.jsx         → estructura de la página
src/Trace.jsx       → diagrama de traza de la portada
src/ContactForm.jsx → formulario de contacto
src/styles.css      → estilos
```

## Correr en tu computador

```bash
npm install
npm run dev        # abre http://localhost:5173
```

> El formulario solo envía correos cuando está publicado en Vercel (o con `npx vercel dev`).

## Publicar gratis en Vercel

1. Sube esta carpeta a un repositorio en GitHub.
2. Entra a https://vercel.com, inicia sesión con GitHub y elige **Add New → Project**.
3. Selecciona el repositorio. Vercel detecta Vite solo; dale **Deploy**.
4. Para que funcione el formulario:
   - Crea una cuenta gratis en https://resend.com y genera una **API key**.
   - En Vercel: **Settings → Environment Variables** y agrega:
     - `RESEND_API_KEY` = tu API key
     - `CONTACT_TO_EMAIL` = el correo donde quieres recibir los mensajes (en el plan gratis de Resend, el mismo con el que te registraste)
   - Vuelve a desplegar (**Deployments → Redeploy**).

Tu sitio quedará en `https://tu-proyecto.vercel.app`. Luego puedes conectar un dominio propio (por ejemplo `duvanmartinez.dev`).

## Personalizar

- Textos, experiencia y proyectos: `src/content.js`.
- GitHub y LinkedIn: llena `profile.links` en `src/content.js`; si están vacíos no se muestran.
