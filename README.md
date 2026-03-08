# Galaxy CSV

A 3D data visualizer that turns any CSV into a navigable galaxy of floating geometric shapes. Built with Three.js — no dependencies, no build step, just one HTML file.

**[Live Demo](https://markus-learning.github.io/galaxy-csv/)**

![Galaxy CSV](screenshot.png)

![Galaxy CSV](https://img.shields.io/badge/three.js-r162-blue) ![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-brightgreen)

## What It Does

Drop a CSV file onto the page and watch it scatter into 3D space. Columns are auto-detected and mapped to axes:

- **X axis** — Year (or first numeric column)
- **Y axis** — Genre / category (bucketed, top 15 + Other)
- **Z axis** — Depth scatter for fly-through

Each category gets a unique color and shape. Click any object to see its details and jump to YouTube.

## Features

- **Auto-fly camera** drifts through the data field
- **Album card** — click any point to see song/artist/album + YouTube link
- **5 color palettes** — Neon, Pastel, Warm, Cool, Mono
- **5 backgrounds** — White, Black, Midnight, Cream, Slate
- **Adjustable bloom, scale, fog, fly speed**
- **Orbit mode** for hands-free rotation
- **Keyboard navigation** — Arrow keys / WASD
- **Drag-and-drop CSV upload** — works with any CSV
- **50K point limit** with automatic sampling for large files
- **Instanced rendering** — performs well even at high point counts

## Controls

| Input | Action |
|-------|--------|
| Click | Inspect point (album card) |
| Drag | Orbit camera |
| Scroll | Zoom |
| Arrow keys / WASD | Fly through scene |
| Customize button | Open settings panel |

## CSV Format

Any CSV works. The app auto-detects columns by name:

| Column | Detected keywords |
|--------|-------------------|
| Name | `name`, `title`, `song`, `track` |
| Artist | `artist`, `band` |
| Album | `album`, `release` |
| Genre | `genre`, `type`, `category`, `style` |
| Year | `year` |
| Duration | `time`, `duration`, `length` |

If columns aren't found, data is spread by row index. The included `music_library.csv` has ~64K tracks with columns: `Song, Artist, Album, Genre, Year, Duration`.

## Run Locally

```bash
git clone https://github.com/MARKUS-LEARNING/galaxy-csv.git
cd galaxy-csv
python3 -m http.server 8000
# open http://localhost:8000
```

Any static file server works — the app is a single `index.html` with vendored Three.js (no external CDN required).

## Stack

- [Three.js](https://threejs.org/) r162 (self-hosted in `vendor/`)
- EffectComposer + UnrealBloomPass for glow
- OrbitControls for camera
- Instanced meshes (8 geometry types) for performance
- Zero build tools — pure HTML/JS

## Security

This application runs **entirely in your browser**. No data you upload is ever sent to a server.
CSV files are processed locally using the JavaScript File API and are never transmitted externally.

However, users should be aware of the following:

- **Do not upload CSV files containing sensitive or personal information.** This includes files
  with names, addresses, health data, financial records, or any PII (Personally Identifiable Information).
- **Do not upload CSV files from untrusted sources.** While this app sanitizes rendered output,
  you should treat unknown CSV files with the same caution as unknown executable files.
- **This app is hosted on GitHub Pages**, a static hosting service. GitHub Pages does not support
  server-side security headers. A Content Security Policy is enforced via a `<meta>` tag.

To report a security vulnerability, see [SECURITY.md](./SECURITY.md).

## Data & Privacy

All visualization happens locally in your browser. This project does not:
- Collect, store, or transmit your data
- Use cookies or local storage
- Include any analytics or tracking scripts
- Connect to any external API (after page load, all network requests are blocked by CSP)

## Disclaimer

The sample data files (`music_library.csv`, `sample_music.csv`) are provided for demonstration
only. See [DATA_SOURCES.md](./DATA_SOURCES.md) for provenance and licensing of these files.
The MIT license in this repository applies to source code only and does not extend to data files
unless explicitly stated in DATA_SOURCES.md.

Users are solely responsible for ensuring they have the right to process and visualize any
CSV data they upload into this tool.

## License

MIT
