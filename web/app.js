// FaviGen - Modern web interface

// State
let currentTemplate = 'basic/hexagon';
let currentPreset = null;

// Presets data (matches presets.json)
const presets = {
    "tech-startup": {
        "name": "Tech Startup",
        "template": "glassmorphic/glass-rounded",
        "color1": "#6366f1",
        "color2": "#8b5cf6",
        "letter": "T",
        "description": "Modern glassmorphic design for tech companies"
    },
    "creative-agency": {
        "name": "Creative Agency",
        "template": "gradients/radial-burst",
        "color1": "#ec4899",
        "color2": "#f59e0b",
        "letter": "C",
        "description": "Vibrant radial gradient for creative brands"
    },
    "minimal-dark": {
        "name": "Minimal Dark",
        "template": "geometric/split-diagonal",
        "color1": "#1f2937",
        "color2": "#374151",
        "letter": "M",
        "description": "Clean minimal design with dark tones"
    },
    "developer-tools": {
        "name": "Developer Tools",
        "template": "icons/code",
        "color1": "#10b981",
        "color2": "#059669",
        "letter": "",
        "description": "Code icon for developer tools and IDEs"
    },
    "fast-performance": {
        "name": "Fast & Performance",
        "template": "icons/lightning",
        "color1": "#f59e0b",
        "color2": "#eab308",
        "letter": "",
        "description": "Lightning bolt for speed and performance"
    },
    "modern-saas": {
        "name": "Modern SaaS",
        "template": "glassmorphic/glass-circle",
        "color1": "#3b82f6",
        "color2": "#06b6d4",
        "letter": "S",
        "description": "Professional glassmorphic circle for SaaS products"
    },
    "premium-product": {
        "name": "Premium Product",
        "template": "neumorphic/soft-circle",
        "color1": "#7c3aed",
        "color2": "#a855f7",
        "letter": "P",
        "description": "Soft neumorphic design for premium feel"
    },
    "geometric-modern": {
        "name": "Geometric Modern",
        "template": "geometric/diamond-layers",
        "color1": "#ef4444",
        "color2": "#f97316",
        "letter": "G",
        "description": "Bold geometric layers for modern brands"
    },
    "space-tech": {
        "name": "Space & Tech",
        "template": "icons/rocket",
        "color1": "#6366f1",
        "color2": "#3b82f6",
        "letter": "",
        "description": "Rocket icon for space tech and startups"
    },
    "elegant-waves": {
        "name": "Elegant Waves",
        "template": "patterns/waves",
        "color1": "#0ea5e9",
        "color2": "#06b6d4",
        "letter": "W",
        "description": "Smooth wave pattern for elegant designs"
    },
    "dotted-texture": {
        "name": "Dotted Texture",
        "template": "patterns/dots",
        "color1": "#8b5cf6",
        "color2": "#a855f7",
        "letter": "D",
        "description": "Textured dot pattern for visual interest"
    },
    "grid-system": {
        "name": "Grid System",
        "template": "patterns/grid",
        "color1": "#14b8a6",
        "color2": "#06b6d4",
        "letter": "G",
        "description": "Grid pattern for systematic designs"
    },
    "star-quality": {
        "name": "Star Quality",
        "template": "icons/star",
        "color1": "#fbbf24",
        "color2": "#f59e0b",
        "letter": "",
        "description": "Star icon for quality and achievement"
    },
    "settings-config": {
        "name": "Settings & Config",
        "template": "icons/gear",
        "color1": "#64748b",
        "color2": "#475569",
        "letter": "",
        "description": "Gear icon for settings and configuration"
    },
    "triple-gradient": {
        "name": "Triple Gradient",
        "template": "gradients/multi-stop",
        "color1": "#ec4899",
        "color2": "#8b5cf6",
        "letter": "T",
        "description": "Multi-stop gradient for rich color blending"
    }
};

// Template categories and templates
const templateCategories = {
    "basic": {
        "name": "Basic Shapes",
        "templates": ["hexagon", "circle", "square"]
    },
    "glassmorphic": {
        "name": "Glassmorphic",
        "templates": ["glass-circle", "glass-rounded", "glass-hexagon"]
    },
    "geometric": {
        "name": "Geometric",
        "templates": ["triangle-burst", "diamond-layers", "concentric-circles", "split-diagonal"]
    },
    "gradients": {
        "name": "Gradients",
        "templates": ["radial-burst", "conic-spin", "multi-stop"]
    },
    "neumorphic": {
        "name": "Neumorphic",
        "templates": ["soft-circle", "soft-square"]
    },
    "patterns": {
        "name": "Patterns",
        "templates": ["dots", "grid", "waves"]
    },
    "icons": {
        "name": "Icons",
        "templates": ["code", "lightning", "rocket", "star", "gear"]
    }
};

// SVG Template generators
const svgGenerators = {
    'basic/hexagon': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="url(#grad)" stroke="${stroke}" stroke-width="2"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'basic/circle': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <circle cx="50" cy="50" r="40" fill="url(#grad)" stroke="${stroke}" stroke-width="2"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'basic/square': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect x="15" y="15" width="70" height="70" rx="8" fill="url(#grad)" stroke="${stroke}" stroke-width="2"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'glassmorphic/glass-circle': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:0.4" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:0.2" /></linearGradient></defs>
  <circle cx="50" cy="50" r="40" fill="url(#grad)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="32" font-weight="600" text-anchor="middle" fill="${textColor}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${letter}</text></svg>`,

    'glassmorphic/glass-rounded': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:0.3" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:0.2" /></linearGradient></defs>
  <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#grad)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <rect x="15" y="15" width="70" height="35" rx="15" fill="rgba(255,255,255,0.1)"/>
  <text x="50" y="62" font-family="Arial, sans-serif" font-size="34" font-weight="600" text-anchor="middle" fill="${textColor}" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4))">${letter}</text></svg>`,

    'glassmorphic/glass-hexagon': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:0.35" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:0.25" /></linearGradient></defs>
  <polygon points="50,8 88,28 88,72 50,92 12,72 12,28" fill="url(#grad)" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
  <polygon points="50,18 78,33 78,67 50,82 22,67 22,33" fill="rgba(255,255,255,0.08)"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="32" font-weight="600" text-anchor="middle" fill="${textColor}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35))">${letter}</text></svg>`,

    'geometric/triangle-burst': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="${stroke}"/>
  <polygon points="50,20 80,80 20,80" fill="${c1}"/>
  <polygon points="50,80 80,20 20,20" fill="${c2}"/>
  <circle cx="50" cy="50" r="25" fill="url(#grad)"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'geometric/diamond-layers': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="${stroke}"/>
  <polygon points="50,5 95,50 50,95 5,50" fill="${c1}"/>
  <polygon points="50,15 85,50 50,85 15,50" fill="${c2}"/>
  <polygon points="50,25 75,50 50,75 25,50" fill="url(#grad)"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="26" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'geometric/concentric-circles': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="grad">
  <stop offset="0%" style="stop-color:${c2};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c1};stop-opacity:1" /></radialGradient></defs>
  <rect width="100" height="100" fill="${stroke}"/>
  <circle cx="50" cy="50" r="45" fill="${c1}"/>
  <circle cx="50" cy="50" r="35" fill="${c2}"/>
  <circle cx="50" cy="50" r="25" fill="url(#grad)"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'geometric/split-diagonal': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="0,0 100,0 0,100" fill="${c1}"/>
  <polygon points="100,0 100,100 0,100" fill="${c2}"/>
  <circle cx="50" cy="50" r="30" fill="${stroke}" opacity="0.9"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="30" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'gradients/radial-burst': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="grad">
  <stop offset="0%" style="stop-color:${c2};stop-opacity:1" />
  <stop offset="50%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></radialGradient></defs>
  <rect width="100" height="100" fill="url(#grad)"/>
  <text x="50" y="62" font-family="Arial, sans-serif" font-size="42" font-weight="bold" text-anchor="middle" fill="${textColor}" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.5))">${letter}</text></svg>`,

    'gradients/conic-spin': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="grad">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></radialGradient></defs>
  <rect width="100" height="100" fill="url(#grad)"/>
  <path d="M 50,50 L 50,0 A 50,50 0 0,1 100,50 Z" fill="${c1}"/>
  <path d="M 50,50 L 100,50 A 50,50 0 0,1 50,100 Z" fill="${c2}"/>
  <circle cx="50" cy="50" r="30" fill="${stroke}"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'gradients/multi-stop': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="33%" style="stop-color:${c2};stop-opacity:1" />
  <stop offset="66%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <circle cx="50" cy="50" r="48" fill="url(#grad)"/>
  <text x="50" y="62" font-family="Arial, sans-serif" font-size="40" font-weight="700" text-anchor="middle" fill="${textColor}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4))">${letter}</text></svg>`,

    'neumorphic/soft-circle': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="url(#grad)"/>
  <circle cx="50" cy="50" r="35" fill="url(#grad)" style="filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3)) drop-shadow(-3px -3px 3px rgba(255,255,255,0.7))"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="30" font-weight="600" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'neumorphic/soft-square': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="url(#grad)"/>
  <rect x="20" y="20" width="60" height="60" rx="12" fill="url(#grad)" style="filter: drop-shadow(4px 4px 4px rgba(0,0,0,0.25)) drop-shadow(-3px -3px 3px rgba(255,255,255,0.8))"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="32" font-weight="600" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'patterns/dots': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient>
  <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
  <circle cx="5" cy="5" r="1.5" fill="${stroke}" opacity="0.3"/></pattern></defs>
  <rect width="100" height="100" fill="url(#grad)"/>
  <rect width="100" height="100" fill="url(#dots)"/>
  <text x="50" y="62" font-family="Arial, sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="${textColor}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4))">${letter}</text></svg>`,

    'patterns/grid': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient>
  <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${stroke}" stroke-width="0.5" opacity="0.3"/></pattern></defs>
  <rect width="100" height="100" fill="url(#grad)"/>
  <rect width="100" height="100" fill="url(#grid)"/>
  <text x="50" y="62" font-family="Arial, sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="${textColor}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5))">${letter}</text></svg>`,

    'patterns/waves': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="${c1}"/>
  <path d="M0,30 Q25,20 50,30 T100,30 L100,100 L0,100 Z" fill="${c2}" opacity="0.5"/>
  <path d="M0,50 Q25,40 50,50 T100,50 L100,100 L0,100 Z" fill="${c2}" opacity="0.3"/>
  <circle cx="50" cy="30" r="20" fill="url(#grad)"/>
  <text x="50" y="38" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="${textColor}">${letter}</text></svg>`,

    'icons/code': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="url(#grad)"/>
  <path d="M 30,35 L 20,50 L 30,65" stroke="${textColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 70,35 L 80,50 L 70,65" stroke="${textColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 55,30 L 45,70" stroke="${textColor}" stroke-width="4" stroke-linecap="round"/></svg>`,

    'icons/lightning': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="${stroke}"/>
  <polygon points="55,10 35,50 50,50 45,90 75,40 60,40" fill="url(#grad)" stroke="${textColor}" stroke-width="2"/></svg>`,

    'icons/rocket': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="${stroke}"/>
  <ellipse cx="50" cy="30" rx="15" ry="20" fill="url(#grad)"/>
  <rect x="40" y="30" width="20" height="40" fill="url(#grad)"/>
  <polygon points="35,55 25,75 40,70" fill="${c1}"/>
  <polygon points="65,55 75,75 60,70" fill="${c1}"/>
  <circle cx="50" cy="45" r="5" fill="${textColor}"/>
  <polygon points="45,70 50,85 55,70" fill="${c2}"/></svg>`,

    'icons/star': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="${stroke}"/>
  <polygon points="50,15 61,45 92,45 67,63 78,93 50,75 22,93 33,63 8,45 39,45" fill="url(#grad)" stroke="${textColor}" stroke-width="2"/></svg>`,

    'icons/gear': (c1, c2, letter, stroke, textColor) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
  <stop offset="100%" style="stop-color:${c2};stop-opacity:1" /></linearGradient></defs>
  <rect width="100" height="100" fill="${stroke}"/>
  <circle cx="50" cy="50" r="35" fill="url(#grad)"/>
  <circle cx="50" cy="50" r="15" fill="${stroke}"/>
  <rect x="45" y="10" width="10" height="15" fill="${c1}"/>
  <rect x="45" y="75" width="10" height="15" fill="${c1}"/>
  <rect x="10" y="45" width="15" height="10" fill="${c1}"/>
  <rect x="75" y="45" width="15" height="10" fill="${c1}"/></svg>`
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initPresets();
    initTemplates();
    initControls();
    updatePreview();
    updateCommand();
});

// Tab management
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// Initialize presets
function initPresets() {
    const grid = document.getElementById('presetGrid');
    Object.entries(presets).forEach(([key, preset]) => {
        const card = document.createElement('div');
        card.className = 'preset-card';
        card.onclick = () => loadPreset(key);

        const preview = document.createElement('div');
        preview.className = 'preset-preview';
        const svg = svgGenerators[preset.template](preset.color1, preset.color2, preset.letter, '#1a1a1a', '#ffffff');
        preview.innerHTML = svg;

        const name = document.createElement('div');
        name.className = 'preset-name';
        name.textContent = preset.name;

        const desc = document.createElement('div');
        desc.className = 'preset-desc';
        desc.textContent = preset.description;

        card.appendChild(preview);
        card.appendChild(name);
        card.appendChild(desc);
        grid.appendChild(card);
    });
}

// Initialize template categories
function initTemplates() {
    const container = document.getElementById('templateCategories');
    Object.entries(templateCategories).forEach(([catKey, category]) => {
        const catDiv = document.createElement('div');
        catDiv.className = 'category';

        const header = document.createElement('div');
        header.className = 'category-header';
        const title = document.createElement('div');
        title.className = 'category-title';
        title.textContent = category.name;
        header.appendChild(title);

        const templates = document.createElement('div');
        templates.className = 'category-templates';

        category.templates.forEach(template => {
            const btn = document.createElement('div');
            btn.className = 'template-btn';
            const templatePath = `${catKey}/${template}`;
            btn.onclick = () => selectTemplate(templatePath);

            const svg = svgGenerators[templatePath]('#7c3aed', '#ec4899', 'T', '#1a1a1a', '#ffffff');
            btn.innerHTML = svg;
            templates.appendChild(btn);
        });

        catDiv.appendChild(header);
        catDiv.appendChild(templates);
        container.appendChild(catDiv);
    });
}

// Initialize controls
function initControls() {
    ['color1', 'color2', 'letter', 'stroke', 'textColor'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                currentPreset = null;
                updatePreview();
                updateCommand();
            });
        }
    });
}

// Load preset
function loadPreset(presetKey) {
    currentPreset = presetKey;
    const preset = presets[presetKey];
    currentTemplate = preset.template;

    document.getElementById('color1').value = preset.color1;
    document.getElementById('color2').value = preset.color2;
    document.getElementById('letter').value = preset.letter;

    document.querySelectorAll('.preset-card').forEach(card => card.classList.remove('active'));
    event.target.closest('.preset-card').classList.add('active');

    updatePreview();
    updateCommand();
}

// Select template
function selectTemplate(templatePath) {
    currentTemplate = templatePath;
    currentPreset = null;

    document.querySelectorAll('.template-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    updatePreview();
    updateCommand();
}

// Update preview
function updatePreview() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const letter = document.getElementById('letter').value;
    const stroke = document.getElementById('stroke').value;
    const textColor = document.getElementById('textColor').value;

    const svg = svgGenerators[currentTemplate](color1, color2, letter, stroke, textColor);

    document.getElementById('preview').innerHTML = svg;
    document.getElementById('preview-16').innerHTML = svg;
    document.getElementById('preview-32').innerHTML = svg;
    document.getElementById('preview-64').innerHTML = svg;
}

// Update command
function updateCommand() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const letter = document.getElementById('letter').value;

    let cmd = currentPreset
        ? `./generate.sh --preset ${currentPreset}`
        : `./generate.sh --template ${currentTemplate} --color1 "${color1}" --color2 "${color2}" --letter "${letter}"`;

    document.getElementById('commandBox').textContent = cmd;
}

// Download SVG
function downloadSVG() {
    const svg = document.getElementById('preview').innerHTML;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favicon.svg';
    a.click();
    URL.revokeObjectURL(url);
}

// Copy command
function copyCommand() {
    const cmd = document.getElementById('commandBox').textContent;
    navigator.clipboard.writeText(cmd).then(() => {
        alert('Command copied to clipboard!');
    });
}

// Random letter
function randomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const emoji = ['🚀', '⚡', '🎨', '💎', '🔥', '⭐', '💡', '🎯', '🌟', '✨'];
    const all = letters.split('').concat(emoji);
    const random = all[Math.floor(Math.random() * all.length)];
    document.getElementById('letter').value = random;
    updatePreview();
    updateCommand();
}
