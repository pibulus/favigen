#!/bin/bash
# FaviGen - Modern favicon generator
# Usage: ./generate.sh [svg-file] [output-dir]
# Or: ./generate.sh --template basic/hexagon --color1 "#ff0000" --letter "A"
# Or: ./generate.sh --preset tech-startup

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
RESET='\033[0m'

# Default values
TEMPLATE="basic/hexagon"
COLOR1="#7c3aed"
COLOR2="#ec4899"
STROKE="#1a1a1a"
TEXT_COLOR="#ffffff"
LETTER="F"
OUTPUT_DIR="./output"
SVG_FILE=""
PRESET=""

# Function to list available templates
list_templates() {
    echo -e "${BLUE}Available Templates:${RESET}"
    echo ""
    for category in templates/*/; do
        if [[ -d "$category" ]]; then
            cat_name=$(basename "$category")
            echo -e "${YELLOW}${cat_name}:${RESET}"
            for template in "$category"*.svg; do
                if [[ -f "$template" ]]; then
                    template_name=$(basename "$template" .svg)
                    echo "  - ${cat_name}/${template_name}"
                fi
            done
            echo ""
        fi
    done
}

# Function to list available presets
list_presets() {
    echo -e "${BLUE}Available Presets:${RESET}"
    echo ""
    if [[ -f "presets.json" ]] && command -v jq &> /dev/null; then
        jq -r '.presets | to_entries[] | "  \(.key) - \(.value.name): \(.value.description)"' presets.json
    else
        echo "  tech-startup - Tech Startup: Modern glassmorphic design"
        echo "  creative-agency - Creative Agency: Vibrant radial gradient"
        echo "  minimal-dark - Minimal Dark: Clean minimal design"
        echo "  developer-tools - Developer Tools: Code icon"
        echo "  fast-performance - Fast & Performance: Lightning bolt icon"
        echo "  modern-saas - Modern SaaS: Professional glassmorphic circle"
        echo "  (and more...)"
    fi
    echo ""
}

# Function to load preset
load_preset() {
    local preset_name="$1"
    if [[ ! -f "presets.json" ]]; then
        echo -e "${RED}✗ presets.json not found${RESET}"
        return 1
    fi

    if command -v jq &> /dev/null; then
        TEMPLATE=$(jq -r ".presets.\"$preset_name\".template // empty" presets.json)
        COLOR1=$(jq -r ".presets.\"$preset_name\".color1 // empty" presets.json)
        COLOR2=$(jq -r ".presets.\"$preset_name\".color2 // empty" presets.json)
        LETTER=$(jq -r ".presets.\"$preset_name\".letter // empty" presets.json)

        if [[ -z "$TEMPLATE" ]]; then
            echo -e "${RED}✗ Preset not found: $preset_name${RESET}"
            return 1
        fi
        echo -e "${GREEN}✓${RESET} Loaded preset: $preset_name"
    else
        echo -e "${YELLOW}⚠${RESET} jq not installed, using manual preset parsing"
        # Fallback for common presets without jq
        case "$preset_name" in
            tech-startup)
                TEMPLATE="glassmorphic/glass-rounded"
                COLOR1="#6366f1"
                COLOR2="#8b5cf6"
                LETTER="T"
                ;;
            creative-agency)
                TEMPLATE="gradients/radial-burst"
                COLOR1="#ec4899"
                COLOR2="#f59e0b"
                LETTER="C"
                ;;
            *)
                echo -e "${RED}✗ Preset not found (install jq for full preset support)${RESET}"
                return 1
                ;;
        esac
    fi
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --template)
            TEMPLATE="$2"
            shift 2
            ;;
        --preset)
            PRESET="$2"
            shift 2
            ;;
        --color1)
            COLOR1="$2"
            shift 2
            ;;
        --color2)
            COLOR2="$2"
            shift 2
            ;;
        --letter)
            LETTER="$2"
            shift 2
            ;;
        --stroke)
            STROKE="$2"
            shift 2
            ;;
        --text-color)
            TEXT_COLOR="$2"
            shift 2
            ;;
        --output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        --list-templates)
            list_templates
            exit 0
            ;;
        --list-presets)
            list_presets
            exit 0
            ;;
        --help)
            echo "FaviGen - Modern Favicon Generator"
            echo ""
            echo "Usage:"
            echo "  From SVG file:    ./generate.sh input.svg [output-dir]"
            echo "  From template:    ./generate.sh --template category/name --letter X"
            echo "  From preset:      ./generate.sh --preset tech-startup"
            echo ""
            echo "Options:"
            echo "  --template        Template path (e.g., basic/hexagon, glassmorphic/glass-circle)"
            echo "  --preset          Use a predefined preset (e.g., tech-startup, creative-agency)"
            echo "  --color1          Primary gradient color (hex)"
            echo "  --color2          Secondary gradient color (hex)"
            echo "  --letter          Letter/emoji for center"
            echo "  --stroke          Stroke/border color (hex)"
            echo "  --text-color      Text color (hex)"
            echo "  --output          Output directory"
            echo "  --list-templates  Show all available templates"
            echo "  --list-presets    Show all available presets"
            echo "  --help            Show this help"
            echo ""
            echo "Template Categories:"
            echo "  basic/          - Simple shapes (hexagon, circle, square)"
            echo "  glassmorphic/   - Modern glass effect designs"
            echo "  geometric/      - Complex geometric patterns"
            echo "  gradients/      - Advanced gradient styles"
            echo "  neumorphic/     - Soft 3D effects"
            echo "  patterns/       - Textured backgrounds (dots, waves, grid)"
            echo "  icons/          - Symbol-based designs (code, rocket, star, etc.)"
            exit 0
            ;;
        *)
            if [[ -f "$1" ]]; then
                SVG_FILE="$1"
            else
                OUTPUT_DIR="${2:-./output}"
            fi
            shift
            ;;
    esac
done

# Load preset if specified
if [[ -n "$PRESET" ]]; then
    load_preset "$PRESET"
fi

# Check ImageMagick
if ! command -v magick &> /dev/null; then
    echo -e "${RED}✗ ImageMagick not installed${RESET}"
    echo "Install with: brew install imagemagick"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo -e "${YELLOW}╔════════════════════════════════════╗${RESET}"
echo -e "${YELLOW}║  FaviGen - Modern Favicon Generator  ║${RESET}"
echo -e "${YELLOW}╚════════════════════════════════════╝${RESET}"
echo ""

# Generate from template or use provided SVG
if [[ -z "$SVG_FILE" ]]; then
    # Use template
    TEMPLATE_FILE="./templates/${TEMPLATE}.svg"
    if [[ ! -f "$TEMPLATE_FILE" ]]; then
        echo -e "${RED}✗ Template not found: $TEMPLATE${RESET}"
        echo -e "${YELLOW}→${RESET} Run './generate.sh --list-templates' to see available templates"
        exit 1
    fi

    # Generate SVG from template
    SVG_FILE="$OUTPUT_DIR/favicon.svg"
    sed -e "s|{{COLOR1}}|$COLOR1|g" \
        -e "s|{{COLOR2}}|$COLOR2|g" \
        -e "s|{{STROKE}}|$STROKE|g" \
        -e "s|{{TEXT_COLOR}}|$TEXT_COLOR|g" \
        -e "s|{{LETTER}}|$LETTER|g" \
        "$TEMPLATE_FILE" > "$SVG_FILE"

    echo -e "${GREEN}✓${RESET} Template: ${BLUE}$TEMPLATE${RESET}"
    if [[ -n "$PRESET" ]]; then
        echo -e "${GREEN}✓${RESET} Preset: ${BLUE}$PRESET${RESET}"
    fi
    echo -e "${GREEN}✓${RESET} Colors: ${COLOR1} → ${COLOR2}"
    [[ -n "$LETTER" ]] && echo -e "${GREEN}✓${RESET} Letter: ${LETTER}"
else
    # Copy provided SVG
    cp "$SVG_FILE" "$OUTPUT_DIR/favicon.svg"
    SVG_FILE="$OUTPUT_DIR/favicon.svg"
    echo -e "${GREEN}✓${RESET} Using provided SVG: $(basename "$SVG_FILE")"
fi
echo ""

# Generate favicon sizes
echo -e "${GREEN}→${RESET} Generating favicon sizes..."
magick "$SVG_FILE" -resize 16x16 "$OUTPUT_DIR/favicon-16.png"
magick "$SVG_FILE" -resize 32x32 "$OUTPUT_DIR/favicon-32.png"
magick "$SVG_FILE" -resize 180x180 "$OUTPUT_DIR/apple-touch-icon.png"
magick "$SVG_FILE" -resize 192x192 "$OUTPUT_DIR/icon-192.png"
magick "$SVG_FILE" -resize 512x512 "$OUTPUT_DIR/icon-512.png"

# Create ICO
echo -e "${GREEN}→${RESET} Creating favicon.ico..."
magick "$OUTPUT_DIR/favicon-16.png" "$OUTPUT_DIR/favicon-32.png" "$OUTPUT_DIR/favicon.ico"

# Generate manifest.json
echo -e "${GREEN}→${RESET} Creating manifest.json..."
cat > "$OUTPUT_DIR/manifest.json" << EOF
{
  "name": "App",
  "short_name": "App",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "$COLOR1",
  "background_color": "#ffffff",
  "display": "standalone"
}
EOF

# Generate HTML snippet
cat > "$OUTPUT_DIR/favicon-html.txt" << EOF
<!-- Favicons - Generated by FaviGen -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
EOF

echo ""
echo -e "${GREEN}╔════════════════════════════════════╗${RESET}"
echo -e "${GREEN}║           ✓ Success!                  ║${RESET}"
echo -e "${GREEN}╚════════════════════════════════════╝${RESET}"
echo ""
echo -e "${BLUE}Output Directory:${RESET} ${OUTPUT_DIR}/"
echo ""
echo -e "${BLUE}Files Created:${RESET}"
ls -1 "$OUTPUT_DIR" | sed 's/^/  ✓ /'
echo ""
echo -e "${YELLOW}→${RESET} HTML snippet saved to: ${OUTPUT_DIR}/favicon-html.txt"
echo -e "${YELLOW}→${RESET} Copy the snippet to your HTML <head> section"