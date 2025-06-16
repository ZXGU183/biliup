const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const projectRoot = path.resolve(__dirname, '..');
const changelogMdPath = path.join(projectRoot, 'CHANGELOG.md');
const publicDir = path.join(projectRoot, 'public');
const changelogHtmlPath = path.join(publicDir, 'CHANGELOG.html');

try {
  if (!fs.existsSync(changelogMdPath)) {
    console.warn(`WARN: CHANGELOG.md not found at ${changelogMdPath}. Skipping conversion.`);
    // Create an empty CHANGELOG.html so the build doesn't fail if the page expects it
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(changelogHtmlPath, '<!DOCTYPE html><html><head><title>Changelog</title></head><body><p>Changelog content not found.</p></body></html>', 'utf8');
    process.exit(0); // Exit successfully
  }

  const markdownContent = fs.readFileSync(changelogMdPath, 'utf8');
  const htmlContent = marked(markdownContent);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 你可以根据需要自定义HTML模板
  const fullHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>更新日志</title>
    <style>body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; margin: 20px; line-height: 1.6; } img { max-width: 100%; }</style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

  fs.writeFileSync(changelogHtmlPath, fullHtml, 'utf8');
  console.log('CHANGELOG.md 已成功转换为 CHANGELOG.html');
} catch (error) {
  console.error('转换 CHANGELOG.md 到 HTML 时发生错误:', error);
  process.exit(1);
}