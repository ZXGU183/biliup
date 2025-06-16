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
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(changelogHtmlPath, '<!DOCTYPE html><html><head><title>Changelog</title></head><body><p>Changelog content not found.</p></body></html>', 'utf8');
    process.exit(0);
  }

  const markdownContent = fs.readFileSync(changelogMdPath, 'utf8');
  const htmlContent = marked(markdownContent);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const fullHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>更新日志</title>
    <style>
        /* Base styles (Light Mode by default or if .theme-light is present) */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            margin: 0;
            padding: 20px;
            line-height: 1.6;
            background-color: #ffffff;
            color: #24292e;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        }
        img { max-width: 100%; height: auto; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; }
        h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: .3em;}
        h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: .3em;}
        h3 { font-size: 1.25em; }
        h4 { font-size: 1em; }
        p { margin-top: 0; margin-bottom: 16px; }
        ul, ol { margin-top: 0; margin-bottom: 16px; padding-left: 2em; }
        li { margin-bottom: 0.25em; }
        code { padding: .2em .4em; margin: 0; font-size: 85%; background-color: rgba(27,31,35,.05); border-radius: 3px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; }
        pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: #f6f8fa; border-radius: 3px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; }
        pre code { padding: 0; margin: 0; font-size: 100%; background-color: transparent; border-radius: 0; border: 0; }
        hr { background-color: #eaecef; height: .25em; padding: 0; margin: 24px 0; border: 0; }

        /* Explicit light theme */
        body.theme-light {
            background-color: #ffffff; color: #24292e;
        }
        body.theme-light h1, body.theme-light h2, body.theme-light h3, body.theme-light h4, body.theme-light h5, body.theme-light h6 { color: #24292e; border-bottom-color: #eaecef; }
        body.theme-light a { color: #0366d6; }
        body.theme-light code { background-color: rgba(27,31,35,.05); color: #24292e; }
        body.theme-light pre { background-color: #f6f8fa; color: #24292e; }
        body.theme-light pre code { background-color: transparent; color: #24292e; }
        body.theme-light hr { background-color: #eaecef; }

        /* Explicit dark theme */
        body.theme-dark {
            background-color: #0d1117; color: #c9d1d9;
        }
        body.theme-dark h1, body.theme-dark h2, body.theme-dark h3, body.theme-dark h4, body.theme-dark h5, body.theme-dark h6 { color: #c9d1d9; border-bottom-color: #21262d; }
        body.theme-dark a { color: #58a6ff; }
        body.theme-dark code { background-color: rgba(177,186,196,.15); color: #c9d1d9; }
        body.theme-dark pre { background-color: #161b22; color: #c9d1d9; }
        body.theme-dark pre code { background-color: transparent; color: #c9d1d9; }
        body.theme-dark hr { background-color: #21262d; }

        /* Fallback to prefers-color-scheme if no explicit theme class is set by parent via JS */
        @media (prefers-color-scheme: dark) {
            body:not(.theme-light):not(.theme-dark) {
                background-color: #0d1117; color: #c9d1d9;
            }
            body:not(.theme-light):not(.theme-dark) h1,
            body:not(.theme-light):not(.theme-dark) h2,
            body:not(.theme-light):not(.theme-dark) h3,
            body:not(.theme-light):not(.theme-dark) h4,
            body:not(.theme-light):not(.theme-dark) h5,
            body:not(.theme-light):not(.theme-dark) h6 { color: #c9d1d9; border-bottom-color: #21262d; }
            body:not(.theme-light):not(.theme-dark) a { color: #58a6ff; }
            body:not(.theme-light):not(.theme-dark) code { background-color: rgba(177,186,196,.15); color: #c9d1d9; }
            body:not(.theme-light):not(.theme-dark) pre { background-color: #161b22; color: #c9d1d9; }
            body:not(.theme-light):not(.theme-dark) pre code { background-color: transparent; color: #c9d1d9; }
            body:not(.theme-light):not(.theme-dark) hr { background-color: #21262d; }
        }
    </style>
</head>
<body>
    ${htmlContent}
    <script>
      window.setChangelogTheme = function(theme) { // theme will be 'light' or 'dark'
        console.log('[Iframe] setChangelogTheme 函数接收到的主题:', theme);
        document.body.classList.remove('theme-light', 'theme-dark'); // 清除之前明确设置的主题类
        if (theme === 'light') {
          document.body.classList.add('theme-light');
        } else if (theme === 'dark') {
          document.body.classList.add('theme-dark');
        }
        // 记录尝试设置后 body 的 class
        console.log('[Iframe] setChangelogTheme 执行后 body 的 class:', document.body.className);
      };
    </script>
</body>
</html>`;

  fs.writeFileSync(changelogHtmlPath, fullHtml, 'utf8');
  console.log('CHANGELOG.md 已成功转换为 CHANGELOG.html');
} catch (error) {
  console.error('转换 CHANGELOG.md 到 HTML 时发生错误:', error);
  process.exit(1);
}
