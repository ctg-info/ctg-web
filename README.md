# CTG-Informática Website

Official one-page website for the CTG-Informática research group (Escuela Colombiana de Ingeniería Julio Garavito).

## Live Site

- GitHub Pages: <https://ctg-info.github.io/ctg-web/>

## Tech Stack

- Static HTML (`index.html`)
- Bootstrap 5 (CDN)
- Custom CSS (`assets/css/custom.css`)
- Vanilla JavaScript (`assets/js/main.js`)

## Current Features

- Single-page sections: Home, About, Research, Projects, Publications, Team, Contact
- Rotating hero background images
- Publications search/filter
- Active navbar section highlighting on scroll
- Responsive team grid with circular portraits
- Dark mode toggle with:
  - local preference persistence
  - system preference fallback (`prefers-color-scheme`)
  - resilient runtime handling for restricted storage/CDN edge cases

## Repository Structure

- `index.html` - Main page content and section layout
- `assets/css/custom.css` - Theme variables, layout, responsive styles, dark mode
- `assets/js/main.js` - Navbar behavior, publication filtering, hero rotation, theme toggle logic
- `assets/img/` - Hero and team images

## Local Preview

From the repository root:

```bash
python3 -m http.server 8080
```

Then open: <http://localhost:8080>

## Deployment (GitHub Pages)

Repository: `ctg-info/ctg-web`

1. Go to `Settings` -> `Pages`
2. Source: `Deploy from a branch`
3. Branch: `main`
4. Folder: `/ (root)`
5. Save

## Update Workflow

1. Edit content in `index.html`
2. Adjust styling in `assets/css/custom.css`
3. Update interactions in `assets/js/main.js`
4. Commit and push to `main`
5. Wait for GitHub Pages to publish changes

## Notes

- Some team photos originally came from external sources; local assets are preferred for reliability.
- This project is static-only. There is no backend service.
