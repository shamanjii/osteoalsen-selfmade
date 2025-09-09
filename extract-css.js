const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const cssDir = path.join(__dirname, 'assets', 'css');
const cssFile = path.join(cssDir, 'main-styles.css');
const backupFile = path.join(__dirname, 'index.html.bak');

console.log("Starting CSS extraction...");

// 1. Ensure assets/css exists
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
  console.log("Created directory:", cssDir);
}

// 2. Read index.html
if (!fs.existsSync(indexPath)) {
  console.error("ERROR: index.html not found!");
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// 3. Extract all <style>...</style> content
const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
let cssContent = '';
html = html.replace(styleRegex, (match, cssBlock) => {
  cssContent += cssBlock + '\n\n';
  return ''; // remove from HTML
});

// 4. Write extracted CSS to main-styles.css
fs.writeFileSync(cssFile, cssContent.trim(), 'utf8');
console.log("✅ Extracted styles into:", cssFile);

// 5. Backup the original HTML
fs.copyFileSync(indexPath, backupFile);
console.log("🔹 Backup created:", backupFile);

// 6. Save cleaned HTML back into index.html
fs.writeFileSync(indexPath, html, 'utf8');
console.log("✅ Cleaned index.html updated successfully.");
