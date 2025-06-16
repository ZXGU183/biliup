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

  // 自定义HTML模板
  const fullHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>更新日志</title>
    <style>
        /* Base styles (Light Mode) */
        body { /* Default to light theme styling */
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            margin: 0; /* Reset margin */
            padding: 20px; /* Add padding to body */
            line-height: 1.6;
            background-color: #ffffff; /* White background */
            color: #24292e; /* GitHub-like text color */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out; /* Smooth transitions */
        }
        img { max-width: 100%; height: auto; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }

        h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
            /* color is inherited or set by theme-specific rules */
        }
        h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: .3em;}
        h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: .3em;}
        h3 { font-size: 1.25em; }
        h4 { font-size: 1em; }

        p { margin-top: 0; margin-bottom: 16px; }
        ul, ol { margin-top: 0; margin-bottom: 16px; padding-left: 2em; }
        li { margin-bottom: 0.25em; }

        code {
            padding: .2em .4em;
            margin: 0;
            font-size: 85%;
            background-color: rgba(27,31,35,.05);
            border-radius: 3px;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
        }
        pre {
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #f6f8fa;
            border-radius: 3px;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
        }
        pre code { padding: 0; margin: 0; font-size: 100%; background-color: transparent; border-radius: 0; border: 0; }

        /* Dark Mode Styles */
        @media (prefers-color-scheme: dark) {
            body { background-color: #0d1117; color: #c9d1d9; }
            h1, h2, h3, h4, h5, h6 { color: #c9d1d9; border-bottom-color: #21262d; }
            a { color: #58a6ff; }
            code { background-color: rgba(177,186,196,.15); color: #c9d1d9; }
            pre { background-color: #161b22; color: #c9d1d9; }
            pre code { background-color: transparent; color: #c9d1d9; }
            hr { background-color: #21262d; height: .25em; padding: 0; margin: 24px 0; border: 0; }
        }
    </style>
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