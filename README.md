# 🎨 FaviGen - Modern Favicon Generator

Modern, modular favicon generator with 20+ professional templates and preset designs. No npm, no build process, just works.

## ✨ What's New

- **20+ Modern Templates** across 7 categories
- **15 Professional Presets** ready to use
- **Glassmorphic & Neumorphic** designs
- **Advanced Gradients** (radial, conic, multi-stop)
- **Icon Templates** (code, rocket, lightning, star, gear)
- **Pattern Backgrounds** (dots, waves, grid)
- **Completely Redesigned Web UI** with live preview

## 🚀 Quick Start

### Web Interface (easiest)
```bash
# Open in browser
open web/index.html
```

Browse presets, explore templates by category, or customize your own design with live preview!

### CLI Usage

```bash
# Use a preset
./generate.sh --preset tech-startup

# Use a modern template
./generate.sh --template glassmorphic/glass-circle --color1 "#6366f1" --letter "S"

# List all templates
./generate.sh --list-templates

# List all presets
./generate.sh --list-presets

# From existing SVG
./generate.sh my-logo.svg ./output
```

## 📦 Template Categories

### Basic Shapes
Classic geometric shapes with modern gradients
- `basic/hexagon` - Hexagonal shape
- `basic/circle` - Circular shape
- `basic/square` - Rounded square

### Glassmorphic ✨
Modern glass-effect designs with transparency and blur
- `glassmorphic/glass-circle` - Glass circle
- `glassmorphic/glass-rounded` - Glass rounded square
- `glassmorphic/glass-hexagon` - Glass hexagon

### Geometric 🔷
Complex geometric patterns and layers
- `geometric/triangle-burst` - Triangular burst pattern
- `geometric/diamond-layers` - Layered diamond
- `geometric/concentric-circles` - Concentric circles
- `geometric/split-diagonal` - Diagonal color split

### Gradients 🌈
Advanced gradient techniques
- `gradients/radial-burst` - Radial gradient burst
- `gradients/conic-spin` - Conic/angular gradient
- `gradients/multi-stop` - Multi-stop gradient blend

### Neumorphic 🎨
Soft 3D shadow effects
- `neumorphic/soft-circle` - Soft embossed circle
- `neumorphic/soft-square` - Soft embossed square

### Patterns 🎯
Textured backgrounds
- `patterns/dots` - Dotted texture
- `patterns/grid` - Grid pattern
- `patterns/waves` - Wave pattern

### Icons 🚀
Symbol-based designs (no text needed)
- `icons/code` - Code brackets (perfect for dev tools)
- `icons/lightning` - Lightning bolt (speed/performance)
- `icons/rocket` - Rocket (startups/space tech)
- `icons/star` - Star (quality/achievement)
- `icons/gear` - Gear (settings/configuration)

## 🎨 Professional Presets

Choose from 15 professionally designed presets:

- **tech-startup** - Modern glassmorphic for tech companies
- **creative-agency** - Vibrant radial gradient for creative brands
- **minimal-dark** - Clean minimal with dark tones
- **developer-tools** - Code icon for dev tools and IDEs
- **fast-performance** - Lightning bolt for speed
- **modern-saas** - Professional glassmorphic circle
- **premium-product** - Soft neumorphic for premium feel
- **geometric-modern** - Bold geometric layers
- **space-tech** - Rocket icon for space/tech startups
- **elegant-waves** - Smooth wave pattern
- **dotted-texture** - Textured dot pattern
- **grid-system** - Grid pattern for systematic designs
- **star-quality** - Star for quality and achievement
- **settings-config** - Gear for settings pages
- **triple-gradient** - Rich multi-stop gradient

## 🛠 Installation

```bash
# Clone or download
git clone [this-repo]

# Install ImageMagick (for PNG generation)
brew install imagemagick  # macOS
apt install imagemagick   # Ubuntu/Debian

# Make script executable
chmod +x generate.sh
```

## 📋 CLI Options

```
  --template        Template path (e.g., glassmorphic/glass-circle)
  --preset          Use a predefined preset (e.g., tech-startup)
  --color1          Primary gradient color (hex)
  --color2          Secondary gradient color (hex)
  --letter          Letter/emoji for center
  --stroke          Stroke/border color (hex)
  --text-color      Text color (hex)
  --output          Output directory
  --list-templates  Show all available templates
  --list-presets    Show all available presets
  --help            Show this help
```

## 📁 Output Files

Every generation creates:

- `favicon.svg` - Modern browsers
- `favicon.ico` - Legacy support (16+32px combined)
- `favicon-16.png` - Small favicon
- `favicon-32.png` - Standard favicon
- `apple-touch-icon.png` - iOS (180×180)
- `icon-192.png` - Android/PWA
- `icon-512.png` - PWA splash screen
- `manifest.json` - PWA manifest
- `favicon-html.txt` - Ready-to-use HTML snippet

## 🌐 HTML Usage

Add to your `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
```

## 💡 Examples

```bash
# Tech startup with glassmorphic design
./generate.sh --preset tech-startup

# Custom glassmorphic circle
./generate.sh --template glassmorphic/glass-circle \
  --color1 "#3b82f6" --color2 "#06b6d4" --letter "S"

# Code icon for developer tools
./generate.sh --template icons/code \
  --color1 "#10b981" --color2 "#059669"

# Geometric pattern with custom colors
./generate.sh --template geometric/diamond-layers \
  --color1 "#ef4444" --color2 "#f97316" --letter "G"

# Dotted pattern with emoji
./generate.sh --template patterns/dots \
  --color1 "#8b5cf6" --letter "🚀"

# From existing logo
./generate.sh company-logo.svg ./static/favicons
```

## 🎯 Tips

- **High contrast** - Use contrasting colors for better visibility at small sizes
- **Single letters** - Work best for text-based designs
- **Icons for clarity** - Use icon templates when no letter is needed
- **Emoji support** - Emojis work but may not render consistently across browsers
- **Glassmorphic** - Best with lighter, vibrant colors
- **Neumorphic** - Works well with mid-tone colors

## 📂 File Structure

```
favigen/
├── generate.sh              # Main CLI script
├── presets.json            # Professional preset definitions
├── templates/              # Organized by category
│   ├── basic/             # Classic shapes
│   ├── glassmorphic/      # Glass effects
│   ├── geometric/         # Geometric patterns
│   ├── gradients/         # Advanced gradients
│   ├── neumorphic/        # Soft 3D effects
│   ├── patterns/          # Textured backgrounds
│   └── icons/             # Symbol-based designs
├── web/                   # Modern browser interface
│   ├── index.html         # Redesigned UI
│   └── app.js            # Full-featured app
└── examples/             # Example outputs
```

## 🎨 Customization

Create your own templates using placeholders:
- `{{COLOR1}}` - Primary gradient color
- `{{COLOR2}}` - Secondary gradient color
- `{{STROKE}}` - Border/stroke color
- `{{TEXT_COLOR}}` - Text color
- `{{LETTER}}` - Letter/emoji content

Add your template to `templates/` and it will be automatically available!

## 🌟 Philosophy

Modern design doesn't have to be complex. FaviGen provides professional-quality favicons with:
- Zero build process
- No JavaScript dependencies (web UI is vanilla JS)
- Modular template system
- Instant results

## 📄 License

MIT - Do whatever you want

---

Made with ✨ by Pablo | Enhanced with 💎 modern design templates
