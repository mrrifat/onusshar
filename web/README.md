# Onusshar Web

**Type Bengali online - no installation needed!**

A modern, fast web-based Bengali phonetic keyboard built with React, TypeScript, and Vite.

## 🌐 Live Demo

Visit: [https://onusshar.github.io/onusshar](https://onusshar.github.io/onusshar) *(after deployment)*

## ✨ Features

- 🚀 **Instant Typing** - Real-time phonetic conversion as you type
- 📖 **Smart Suggestions** - 1550+ word dictionary with autocomplete
- 💡 **User-Friendly** - Clean, intuitive interface that works on any device
- 📱 **Mobile-Ready** - Fully responsive design for phones and tablets
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎯 **No Installation** - Works directly in your browser
- 💾 **Copy & Paste** - One-click copy to use anywhere

## 🚀 Quick Start

### For Users

Just visit the website and start typing! No setup needed.

1. Type Roman letters in the left box
2. See Bengali output in the right box
3. Click suggestions to autocomplete words
4. Copy the Bengali text to use anywhere

### For Developers

#### Prerequisites

- Node.js 18+ and npm
- Git

#### Installation

```bash
# Clone the repository
git clone https://github.com/onusshar/onusshar.git
cd onusshar

# Install root dependencies
npm install

# Build core and dictionary
cd core && npm install && npm run build && cd ..
cd dictionary && npm install && npm run build && cd ..

# Install web app dependencies
cd web
npm install
```

#### Development

```bash
# Start development server
npm run dev

# Visit http://localhost:3000
```

The dev server includes:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking

#### Building for Production

```bash
# Build the web app
npm run build

# Preview the build
npm run preview
```

Output will be in `dist/` directory.

## 🏗️ Architecture

```
web/
├── src/
│   ├── components/          # React components
│   │   ├── Editor.tsx       # Main typing interface
│   │   ├── SuggestionBar.tsx  # Word suggestions
│   │   ├── Header.tsx       # Site header
│   │   └── Footer.tsx       # Site footer
│   ├── styles/              # CSS files
│   │   ├── index.css        # Global styles
│   │   └── App.css          # App layout
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **@onusshar/core** - Phonetic transliteration engine
- **@onusshar/dictionary** - Bengali word dictionary (1550+ words)
- **CSS3** - Styling with CSS custom properties

## 📦 Dependencies

### Production
- `@onusshar/core` - Phonetic conversion engine
- `@onusshar/dictionary` - Bengali word dictionary with suggestions
- `react` - UI library
- `react-dom` - React renderer

### Development
- `vite` - Build tool
- `typescript` - Type checking
- `@vitejs/plugin-react` - React support for Vite
- `eslint` - Code linting

## 🚀 Deployment

### GitHub Pages

The web app is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

Deployment workflow:
1. Builds core and dictionary packages
2. Builds web app
3. Deploys to GitHub Pages

See [`.github/workflows/deploy-web.yml`](../.github/workflows/deploy-web.yml) for details.

### Manual Deployment

To deploy manually:

```bash
# Build for production
npm run build

# The dist/ folder can be deployed to any static hosting:
# - GitHub Pages
# - Vercel
# - Netlify
# - Cloudflare Pages
# - AWS S3 + CloudFront
# etc.
```

## 🎨 Customization

### Styling

All styles use CSS custom properties defined in `src/styles/index.css`. To customize colors:

```css
:root {
  --primary: #2563eb;        /* Primary color */
  --text-primary: #0f172a;   /* Text color */
  --bg-primary: #ffffff;     /* Background color */
  /* ... more variables */
}
```

### Dictionary

The dictionary is imported from `@onusshar/dictionary`. To add more words, edit files in `../dictionary/src/data/`.

### Phonetic Mappings

Phonetic rules are defined in `@onusshar/core`. To modify mappings, edit `../core/src/config/default-mappings.ts`.

## 🐛 Troubleshooting

### Build Errors

**Problem:** `Cannot find module '@onusshar/core'`

**Solution:** Build the core and dictionary packages first:
```bash
cd ../core && npm run build && cd ../web
cd ../dictionary && npm run build && cd ../web
```

**Problem:** TypeScript errors during build

**Solution:** Check that all packages are using compatible TypeScript versions:
```bash
npm list typescript
```

### Development Issues

**Problem:** Changes not appearing in browser

**Solution:** Clear Vite cache and restart:
```bash
rm -rf node_modules/.vite
npm run dev
```

**Problem:** Hot reload not working

**Solution:** Check that files are saved and no TypeScript errors exist.

## 📈 Performance

- ⚡ **Build time:** ~5 seconds
- 📦 **Bundle size:** ~150 KB (gzipped)
- 🚀 **First load:** < 1 second
- 💨 **Time to Interactive:** < 500ms

Optimizations:
- Code splitting with Vite
- Tree shaking to remove unused code
- Minification and compression
- Optimized dictionary loading

## 🤝 Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally: `npm run dev`
5. Build: `npm run build`
6. Submit a pull request

Areas for improvement:
- Additional UI themes
- Keyboard shortcuts
- Export to different formats
- Offline support (PWA)
- More typing statistics

## 📄 License

MIT License - same as parent project.

See [LICENSE](../LICENSE) for details.

## 🔗 Links

- **Main Project:** [github.com/onusshar/onusshar](https://github.com/onusshar/onusshar)
- **Desktop Apps:** See main README for Windows/macOS/Linux installers
- **Documentation:** [Main README](../README.md)
- **Report Issues:** [GitHub Issues](https://github.com/onusshar/onusshar/issues)

---

**Made with ❤️ for the Bengali-speaking community**
