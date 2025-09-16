# 🎨 FaviGen - Simple Favicon Generator

Dead simple favicon generator. No npm, no build process, just works.

## Quick Start

### Web Interface (easiest)
```bash
# Open in browser
open web/index.html
```

### CLI Usage

```bash
# From template
./generate.sh --template hexagon --color1 "#667eea" --letter "F"

# From existing SVG
./generate.sh my-logo.svg ./output

# Help
./generate.sh --help
```

## Features

- 🎯 Three shapes: Hexagon, Circle, Square
- 🎨 Gradient support
- 📝 Add letter or emoji
- 📦 Generates all sizes (16, 32, 180, 192, 512)
- 🔧 Creates favicon.ico
- 📱 PWA manifest.json
- 🚀 Zero dependencies (just needs ImageMagick)

## Installation

```bash
# Clone or download
git clone [this-repo]

# Install ImageMagick (if needed)
brew install imagemagick

# Make script executable
chmod +x generate.sh
```

## File Structure

```
favigen/
├── generate.sh       # Main CLI script
├── templates/        # SVG shape templates
├── web/             # Browser interface
│   ├── index.html
│   └── app.js
└── examples/        # Example outputs
```

## CLI Options

- `--template` - Shape (hexagon, circle, square)
- `--color1` - Primary gradient color
- `--color2` - Secondary gradient color
- `--letter` - Letter/emoji for center
- `--output` - Output directory

## Output Files

- `favicon.svg` - Modern browsers
- `favicon.ico` - Legacy support
- `favicon-16.png` - Small favicon
- `favicon-32.png` - Standard favicon
- `apple-touch-icon.png` - iOS
- `icon-192.png` - Android/PWA
- `icon-512.png` - PWA splash
- `manifest.json` - PWA manifest
- `favicon-html.txt` - HTML snippet

## HTML Usage

Add to your `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
```

## Examples

```bash
# Purple hexagon with "A"
./generate.sh --template hexagon --color1 "#8b5cf6" --letter "A"

# Blue circle with emoji
./generate.sh --template circle --color1 "#3b82f6" --letter "🚀"

# From existing logo
./generate.sh company-logo.svg ./static/favicons
```

## Tips

- Use high contrast colors for better visibility
- Single letters work best
- Emojis are supported but may not render consistently
- SVG template placeholders: `{{COLOR1}}`, `{{COLOR2}}`, `{{LETTER}}`, `{{STROKE}}`, `{{TEXT_COLOR}}`

## Philosophy

80/20 rule - covers 95% of favicon needs without complexity.

## License

MIT - Do whatever

---

Made with ✨ by Pablo