# DaDablock Documentation

This repository contains the DaDablock AI Vision Kit VitePress documentation
site. Each version has its own Markdown and media under `content/<version>/`.
The dev/build scripts copy the selected version into the generated `docs/docs/`
and `docs/_static/` working directories. Edit files in `content/`, since changes
to these working directories are overwritten on the next dev/build.

Available versions: `latest` and `advanced-kit`. Standard Kit and Ultimate Kit
commands are reserved for future content and are excluded from `build:all`.

## Local development

Install dependencies and start the local documentation server:

```bash
npm ci
npm run dev:latest
# Or start the Advanced Kit documentation:
npm run dev:advanced-kit
```

Build the production site and stage the artifacts:

```bash
npm run build:latest
npm run build:advanced-kit
# Build and stage both available versions:
npm run build:all
```

The staged production files are generated in:

```text
projects/DaDablock-AI-Vision-Kit/en/latest/
projects/DaDablock-AI-Vision-Kit/en/advanced-kit/
```

The Advanced Kit opens directly to **1. Kit Introduction** and includes four
main chapters and 18 creative project tutorials. The version root and
`docs/index.html` also redirect to the first chapter. The sidebar follows the
Markdown hierarchy; the project
gallery links to each tutorial. Both versions provide a version selector.

To preview the staged versions together, run `python -m http.server 4173` from
the repository root and open
`http://localhost:4173/projects/DaDablock-AI-Vision-Kit/en/advanced-kit/`.
Use this preview to switch between versions; each VitePress dev server serves
only its selected version. Version builds share a working directory, so run
them sequentially and stop a dev server before building another version.

The supplied Advanced Kit content does not include assembly PDF files; lesson
pages use the existing Google Drive download link for PDF guides. The source
also references an absent `chapter_3/section_15/media/image6.png`; that image is
omitted with a source comment, and the complete program download is retained.

## GitHub Pages deployment

The build artifacts under `projects/` are committed to the repository. Open
**Settings > Pages**, select **Deploy from a branch**, and choose **main** and
**/(root)**. Do not bind a custom domain.

The GitHub Pages direct URL is:

```text
https://Hiwonder-docs.github.io/DaDablock-AI-Vision-Kit-vite/projects/DaDablock-AI-Vision-Kit/en/latest/
```

The public-facing URL (via the baota Nginx reverse proxy) is:

```text
https://wiki.hiwonder.com/projects/DaDablock-AI-Vision-Kit/en/latest/docs/index.html
https://wiki.hiwonder.com/projects/DaDablock-AI-Vision-Kit/en/advanced-kit/docs/index.html
```
