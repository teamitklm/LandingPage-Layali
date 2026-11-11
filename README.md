# Layali Website — GitHub Pages ready

## Publish

1. Extract this ZIP.
2. Upload its contents to the root of your new GitHub repository. Upload index.html and assets directly, not a surrounding folder or the ZIP itself.
3. In Settings > Pages, choose Deploy from a branch, then main and /(root), and save.
4. Wait for deployment to finish, then open the Pages URL.

The website is already built. No npm installation or build command is needed to publish this package. Relative asset paths support a new repository name.

## Files

- index.html: ready-to-publish entry page.
- assets/: website JavaScript, CSS, and images. Keep this beside index.html.
- .nojekyll: disables Jekyll processing; include it if your uploader allows hidden files.
- source-code/: complete editable React/Vite project, including its own public assets and setup instructions. This folder is not needed to display the published website.

## Edit later

Open a terminal in source-code, run npm install and npm run dev. After editing, run npm run build and replace the published root index.html and assets with the new contents of source-code/dist.

Do not upload node_modules. The site uses external Google Fonts; all website images are bundled locally.
