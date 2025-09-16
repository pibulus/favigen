// FaviGen - Simple web interface

let currentShape = 'hexagon';

// Shape templates
const shapes = {
    hexagon: (color1, color2, letter) => `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
                </linearGradient>
            </defs>
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30"
                     fill="url(#grad)"
                     stroke="#00000020"
                     stroke-width="2"/>
            <text x="50" y="58" font-family="Arial, sans-serif" font-size="32"
                  font-weight="bold" text-anchor="middle" fill="white">${letter}</text>
        </svg>
    `,
    circle: (color1, color2, letter) => `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40"
                    fill="url(#grad)"
                    stroke="#00000020"
                    stroke-width="2"/>
            <text x="50" y="58" font-family="Arial, sans-serif" font-size="32"
                  font-weight="bold" text-anchor="middle" fill="white">${letter}</text>
        </svg>
    `,
    square: (color1, color2, letter) => `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect x="15" y="15" width="70" height="70" rx="8"
                  fill="url(#grad)"
                  stroke="#00000020"
                  stroke-width="2"/>
            <text x="50" y="58" font-family="Arial, sans-serif" font-size="32"
                  font-weight="bold" text-anchor="middle" fill="white">${letter}</text>
        </svg>
    `
};

// Update preview
function updatePreview() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const letter = document.getElementById('letter').value || 'F';

    const svg = shapes[currentShape](color1, color2, letter);
    document.getElementById('preview-svg').innerHTML = svg;
}

// Shape selector
document.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentShape = this.dataset.shape;
        updatePreview();
    });
});

// Input listeners
document.getElementById('color1').addEventListener('input', updatePreview);
document.getElementById('color2').addEventListener('input', updatePreview);
document.getElementById('letter').addEventListener('input', updatePreview);

// Download SVG
function downloadSVG() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const letter = document.getElementById('letter').value || 'F';

    const svg = shapes[currentShape](color1, color2, letter);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `favicon-${currentShape}.svg`;
    a.click();

    URL.revokeObjectURL(url);
}

// Generate command
function generateCommand() {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const letter = document.getElementById('letter').value || 'F';

    const command = `./generate.sh --template ${currentShape} --color1 "${color1}" --color2 "${color2}" --letter "${letter}"`;

    // Copy to clipboard
    navigator.clipboard.writeText(command).then(() => {
        // Change button text temporarily
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Initialize
updatePreview();