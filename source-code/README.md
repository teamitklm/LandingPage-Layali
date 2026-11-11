# Layali landing page

React and Vite implementation of the Layali desktop (71:395) and mobile (112:2) frames supplied in Figma. Other brands in the file are excluded.

## Run

```sh
npm install
npm run dev
```

Build for hosting with `npm run build`; deploy the `dist` directory.

The detailed artwork uses separate desktop and mobile compositions with proportional scaling between viewport sizes. The breakpoint is 768px. Design CSS is generated as ordinary CSS; Tailwind is not required. All image/vector assets are local in `public/assets`.

Apple Garamond was not supplied. Headings use EB Garamond through Google Fonts, with a serif fallback; exact typography requires the original licensed font. Montserrat and Poppins also load through Google Fonts.

Navigation, collection enquiries, social links, and the mobile menu are interactive. Purchase, partnership, and seminar calls to action open WhatsApp enquiries. There is no checkout, registration backend, or account system. Policy and utility links show a contact prompt because destination pages were not supplied. Verify social destinations and contact details before publishing: the desktop and mobile source designs contain different contact numbers and handles.

Validation: production build passes; desktop (1440px) and mobile (412px) render without browser errors or broken image assets. Mobile navigation was tested. These are art-directed fixed compositions, rather than a fully fluid layout; edit `src/app.css` for responsive refinements and `src/main.jsx` for destinations.

## Upload to GitHub

Extract the ZIP and upload its contents into the repository. Include the src and public folders, index.html, package.json, package-lock.json, README.md, and .gitignore. Do not upload the ZIP itself, node_modules, or dist. Run npm install and npm run dev locally; run npm run build for deployment.

Images are optimized as high-quality WebP to reduce repository size. Original PNG assets remain in the original full project.
