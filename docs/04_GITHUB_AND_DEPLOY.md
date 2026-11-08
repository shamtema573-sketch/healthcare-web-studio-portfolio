# Source repository and deployment

**Public source:** https://github.com/shamtema573-sketch/healthcare-web-studio-portfolio  
**Live portfolio:** https://healthcare-web-studio-portfolio-20261108.cocoapause1.chatgpt.site/

## Hosting

The static demo is hosted on OpenAI Sites. The same reviewed source is published in the GitHub repository above. GitHub Pages is not used because the portfolio is intended to attract commercial client inquiries and GitHub restricts use of Pages as free hosting for an online business.

No paid hosting, domain, or plugin was purchased. A static Vite build can be adapted to another host after checking its current terms and account access.

## Build and local run

Requires Node.js and npm.

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

The build emits five HTML entry points in dist/ and uses relative asset paths so nested demo routes work on static hosting. Run npm run qa with the production preview available at http://127.0.0.1:4173.

## Content boundary

Clinic names, staff, prices, locations, and appointments are sample content. Forms and booking demonstrations are local only. No external API, patient information, payment, CRM, or live appointment integration is included.

