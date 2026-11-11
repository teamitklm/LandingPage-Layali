# Layali Website

An Indonesian-language landing page for Layali’s modest fashion collections, partnership opportunities, and free seminars. The package includes a ready-to-publish static website and the complete editable React/Vite source project.

## Design reference

Based on the [Layali design in Figma](https://www.figma.com/design/qxtxokmFowVKcoGkR9hY46/Landing-Page-UI-Kit-Fix?node-id=71-395): desktop frame `71:395` (1440px) and mobile frame `112:2` (412px).

## Features

- Dedicated desktop and mobile compositions.
- Expanded mobile navigation with a catalogue submenu.
- Functional desktop catalogue dropdown with collection navigation, keyboard controls, Escape closing, and click-outside closing.
- Catalogue featuring Jejak Cinta, Kaulah Yang Utama, and Mukena Hajar Safa Marwa.
- Partnership, consultation, and seminar enquiries through WhatsApp.
- Testimonial carousel with touch scrolling, mouse dragging, previous/next controls, position buttons, and arrow-key navigation.
- Outlined quotation ornaments on testimonial cards.
- Decorative ornaments beside the desktop social and seminar artwork.
- Optimized local WebP images and SVG assets.

## Package structure

```text
repository-root/
├── index.html               # Built website entry page
├── assets/                  # Built JavaScript, CSS, and website imagery
├── .nojekyll                # Empty GitHub Pages marker file
├── README.md
└── source-code/             # Complete editable React/Vite project
    ├── index.html           # Development entry page; not the published entry
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js       # Relative base path for repository hosting
    ├── .gitignore
    ├── public/
    │   ├── .nojekyll
    │   └── assets/
    └── src/
        ├── main.jsx
        ├── LayaliDesktop.jsx
        ├── LayaliMobile.jsx
        ├── DesktopCatalog.jsx
        ├── Testimonials.jsx
        ├── testimonials.json
        ├── design.css
        └── app.css
```

The root website and `source-code/` are two versions of the same project: one is already built for publishing, and the other is editable. Their image folders are intentionally duplicated so each version is self-contained.

## Publish on GitHub Pages

No local build or dependency installation is required for the ready-to-publish website.

1. Extract `layali-complete-github-pages.zip`.
2. Create a GitHub repository.
3. Upload the extracted contents into the repository root. The root must contain `index.html` and `assets/` directly, rather than inside an extra folder.
4. Commit the files.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Select the branch containing the uploaded files, normally **main**, and choose **/(root)**.
8. Save and wait for the Pages deployment to finish.
9. Open the published URL shown in Pages settings.

The `source-code/` folder is included for future editing. It is not required to display the published site. The built files use relative asset paths, so the repository name can change without requiring a rebuild.

### Hidden files

If your upload interface hides dotfiles, create them with GitHub’s **Add file → Create new file** option.

**`.nojekyll`**, at the repository root, is an empty marker file. Its presence tells GitHub Pages to publish the files without Jekyll processing. It has no text content and is optional for the current package’s ordinary filenames.

**`source-code/.gitignore`** contains:

```gitignore
node_modules/
dist/
.env
.env.local
.DS_Store
```

This prevents generated dependency folders, development builds, and local configuration files from being tracked through Git. It does not affect how the published page displays. A `.gitignore` does not remove files that are already committed.

Do not upload `node_modules/`. The dependency definitions in `package.json` and `package-lock.json` are enough to reinstall it later.

## Preview the published files locally

Serve the extracted package root with any static web server. For example, if Python is installed:

```sh
python -m http.server 8080
```

Open `http://localhost:8080`. On Windows, `py -m http.server 8080` is another option. Stop the server with `Ctrl+C`.
