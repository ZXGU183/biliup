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

  // 移除 CHANGELOG.md 中可能存在的 <div class="markdown-body"> 和手动 <p> 标签
  // 这一步很重要，确保 Markdown 源文件是纯净的
  let markdownContent = fs.readFileSync(changelogMdPath, 'utf8');
  // 简单替换，更复杂的清理可能需要更强的HTML解析器，但对于已知结构通常足够
  markdownContent = markdownContent.replace(/<div class="markdown-body">/g, '').replace(/<\/div>/g, '');
  // 移除包裹链接的 <p> 标签，例如 <p><a href="...">...</a></p>
  // 注意：这个正则比较简单，可能不够鲁棒，如果CHANGELOG.md结构复杂，需要更精确的清理
  markdownContent = markdownContent.replace(/<p>(<a\s+href="[^"]*">[^<]*<\/a>)<\/p>/gi, '$1\n');


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
        /* GitHub inspired Markdown styles */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            margin: 0;
            line-height: 1.6;
            background-color: #ffffff;
            color: #24292e;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
            padding: 30px; /* Add overall padding to the body */
        }

        /* Add a container for the markdown content for better control */
        .markdown-body {
            max-width: 800px; /* Limit width for readability */
            margin: 0 auto;   /* Center the content */
            /* Attempt to reset inherited styles that might affect layout */
        }
        .markdown-body > *:first-child { margin-top: 0 !important; }
        .markdown-body > *:last-child { margin-bottom: 0 !important; }


        img { max-width: 100%; height: auto; box-sizing: content-box; background-color: #fff; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }

        h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25 !important; /* Ensure line-height for headers */
        }
        .markdown-body h1 { font-size: 2em !important; padding-bottom: .3em !important; border-bottom: 1px solid #eaecef !important; }
        .markdown-body h2 { font-size: 1.5em !important; padding-bottom: .3em !important; border-bottom: 1px solid #eaecef !important; margin-bottom: 16px !important; }
        .markdown-body h3 { font-size: 1.25em !important; margin-bottom: 16px !important; }
        .markdown-body h4 { font-size: 1em !important; margin-bottom: 16px !important; }
        .markdown-body h5 { font-size: .875em !important; margin-bottom: 16px !important; }
        .markdown-body h6 { font-size: .85em !important; color: #6a737d; margin-bottom: 16px !important; }

        .markdown-body p,
        .markdown-body blockquote,
        .markdown-body ul,
        .markdown-body ol,
        .markdown-body dl,
        .markdown-body table,
        .markdown-body pre {
            margin-top: 0 !important;
            margin-bottom: 16px !important; /* Ensure paragraphs and other block elements have bottom margin */
            line-height: 1.6 !important; /* Ensure line-height for these elements */
        }

        .markdown-body ul, .markdown-body ol { padding-left: 2em !important; }
        .markdown-body ul li, .markdown-body ol li { margin-bottom: 0.5em !important; line-height: 1.6 !important; }
        .markdown-body ul ul, .markdown-body ul ol, .markdown-body ol ol, .markdown-body ol ul { margin-top: 0.5em !important; margin-bottom: 0.5em !important; }
        .markdown-body li > p { margin-top: 8px !important; margin-bottom: 8px !important; line-height: 1.6 !important;}
        .markdown-body li + li { margin-top: .25em !important; }

        blockquote {
            padding: 0 1em;
            color: #6a737d;
            border-left: .25em solid #dfe2e5;
            margin-left: 0; /* Resetting default browser margin for blockquote */
            margin-right: 0;
        }
        .markdown-body blockquote { /* Ensure specificity for !important if needed */
            padding: 0 1em !important;
            border-left-width: .25em !important;
        }

        code, tt {
            padding: .2em .4em;
            margin: 0;
            font-size: 85%;
            background-color: rgba(27,31,35,.05);
            border-radius: 3px;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
        }
        .markdown-body code, .markdown-body tt {
            line-height: 1.6; /* Potentially reset line-height for inline code */
        }

        pre {
            word-wrap: normal;
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #f6f8fa;
            border-radius: 6px;
        }
        .markdown-body pre {
            line-height: 1.45 !important; /* Ensure line-height for pre blocks */
        }
        pre code { padding: 0; margin: 0; font-size: 100%; background-color: transparent; border-radius: 0; border: 0; white-space: pre-wrap; word-break: break-all; }

        hr {
            height: .25em;
            padding: 0;
            margin: 24px 0;
            background-color: #e1e4e8;
            border: 0;
        }
        .markdown-body hr {
            margin: 24px 0 !important;
        }

        table { display: block; width: 100%; overflow: auto; border-spacing: 0; border-collapse: collapse; }
        table th { font-weight: 600; }
        table th, table td { padding: 6px 13px; border: 1px solid #dfe2e5; }
        table tr { background-color: #fff; border-top: 1px solid #c6cbd1; }
        table tr:nth-child(2n) { background-color: #f6f8fa; }

        /* Explicit light theme */
        body.theme-light {
            background-color: #ffffff; color: #24292e;
        }
        body.theme-light .markdown-body {
            color: #24292e;
        }
        body.theme-light .markdown-body h1, body.theme-light .markdown-body h2, body.theme-light .markdown-body h3, body.theme-light .markdown-body h4, body.theme-light .markdown-body h5, body.theme-light .markdown-body h6 { color: #24292e !important; }
        body.theme-light h1, body.theme-light h2 { border-bottom-color: #eaecef; }
        body.theme-light h6 { color: #6a737d; }
        body.theme-light a { color: #0366d6; }
        body.theme-light code { background-color: rgba(27,31,35,.05); color: #24292e; }
        body.theme-light pre { background-color: #f6f8fa; color: #24292e; }
        body.theme-light pre code { background-color: transparent; color: #24292e; }
        body.theme-light hr { background-color: #e1e4e8; }
        body.theme-light blockquote { color: #6a737d; border-left-color: #dfe2e5; }
        body.theme-light table th, body.theme-light table td { border-color: #dfe2e5; }
        body.theme-light table tr { background-color: #fff; border-top-color: #c6cbd1; }
        body.theme-light table tr:nth-child(2n) { background-color: #f6f8fa; }

        /* Explicit dark theme */
        body.theme-dark {
            background-color: #0d1117; color: #c9d1d9;
        }
        body.theme-dark .markdown-body {
            color: #c9d1d9;
        }
        body.theme-dark .markdown-body h1, body.theme-dark .markdown-body h2, body.theme-dark .markdown-body h3, body.theme-dark .markdown-body h4, body.theme-dark .markdown-body h5, body.theme-dark .markdown-body h6 { color: #c9d1d9 !important; }
        body.theme-dark h1, body.theme-dark h2 { border-bottom-color: #30363d; }
        body.theme-dark h6 { color: #8b949e; }
        body.theme-dark a { color: #58a6ff; }
        body.theme-dark code { background-color: rgba(177,186,196,.15); color: #c9d1d9; }
        body.theme-dark pre { background-color: #161b22; color: #c9d1d9; }
        body.theme-dark pre code { background-color: transparent; color: #c9d1d9; }
        body.theme-dark hr { background-color: #30363d; }
        body.theme-dark blockquote { color: #8b949e; border-left-color: #30363d; }
        body.theme-dark table th, body.theme-dark table td { border-color: #30363d; }
        body.theme-dark table tr { background-color: #0d1117; border-top-color: #21262d; }
        body.theme-dark table tr:nth-child(2n) { background-color: #161b22; }

        /* Fallback to prefers-color-scheme if no explicit theme class is set by parent via JS */
        @media (prefers-color-scheme: dark) {
            body:not(.theme-light):not(.theme-dark) {
                background-color: #0d1117; color: #c9d1d9;
            }
            body:not(.theme-light):not(.theme-dark) .markdown-body {
                color: #c9d1d9;
            }
            body:not(.theme-light):not(.theme-dark) h1,
            body:not(.theme-light):not(.theme-dark) h2,
            body:not(.theme-light):not(.theme-dark) h3,
            body:not(.theme-light):not(.theme-dark) h4,
            body:not(.theme-light):not(.theme-dark) h5 { color: #c9d1d9 !important; }
            body:not(.theme-light):not(.theme-dark) h6 { color: #c9d1d9 !important; } /* Ensure h6 color is also important if needed */
            body:not(.theme-light):not(.theme-dark) h1, body:not(.theme-light):not(.theme-dark) h2 { border-bottom-color: #30363d; }
            body:not(.theme-light):not(.theme-dark) h6 { color: #8b949e; }
            body:not(.theme-light):not(.theme-dark) a { color: #58a6ff; }
            body:not(.theme-light):not(.theme-dark) code { background-color: rgba(177,186,196,.15); color: #c9d1d9; }
            body:not(.theme-light):not(.theme-dark) pre { background-color: #161b22; color: #c9d1d9; }
            body:not(.theme-light):not(.theme-dark) pre code { background-color: transparent; color: #c9d1d9; }
            body:not(.theme-light):not(.theme-dark) hr { background-color: #30363d; }
            body:not(.theme-light):not(.theme-dark) blockquote { color: #8b949e; border-left-color: #30363d; }
            body:not(.theme-light):not(.theme-dark) table th, body:not(.theme-light):not(.theme-dark) table td { border-color: #30363d; }
            body:not(.theme-light):not(.theme-dark) table tr { background-color: #0d1117; border-top-color: #21262d; }
            body:not(.theme-light):not(.theme-dark) table tr:nth-child(2n) { background-color: #161b22; }
        }
    </style>
</head>
<body>
    <div class="markdown-body">${htmlContent}</div>
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
