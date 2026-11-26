# Michi Store

E-commerce desarrollado con React, Vite, React Router y Firebase (Cloud Firestore + Authentication).

## Configuración local

1. Instalá las dependencias:
   ```sh
   npm install
   ```
2. Copiá `.env.example` a `.env` y completá las credenciales de tu proyecto Firebase:
   ```sh
   VITE_apiKey=
   VITE_authDomain=
   VITE_projectId=
   VITE_storageBucket=
   VITE_messagingSenderId=
   VITE_appId=
   ```
3. Iniciá el servidor de desarrollo:
   ```sh
   npm run dev
   ```

## Despliegue en Vercel

1. Importá el repositorio en Vercel.
2. Configurá las variables de entorno `VITE_*` de Firebase en **Project Settings > Environment Variables**.
3. Agregá el dominio generado por Vercel en **Firebase Console > Authentication > Settings > Authorized domains**.
