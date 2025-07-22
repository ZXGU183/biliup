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
        /* Force base styles for the body inside the iframe to resist layui.css */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
            margin: 0 !important;
            padding: 30px !important; /* Add overall padding to the body */
            line-height: 1.6 !important;
            background-color: #ffffff !important; /* Default light mode background */
            color: #24292e !important; /* Default light mode text color */
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out !important;
        }

        /* Add a container for the markdown content for better control */
        .markdown-body {
            max-width: 800px; /* Limit width for readability */
            margin: 0 auto;   /* Center the content */
            /* Attempt to reset inherited styles that might affect layout */
            /* Ensure .markdown-body itself doesn't get unwanted inherited text styles if possible */
            font-size: initial !important; /* Try to reset font-size to browser default before applying specific styles */
        }
        .markdown-body > *:first-child { margin-top: 0 !important; }
        .markdown-body > *:last-child { margin-bottom: 0 !important; }


        img { max-width: 100%; height: auto; box-sizing: content-box; background-color: #fff; }
        a { color: #0366d6; text-decoration: none; }
        a:hover { text-decoration: underline; }
        /* Apply to h1-h6 inside .markdown-body specifically */
        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3,
        .markdown-body h4,
        .markdown-body h5,
        .markdown-body h6 {
            margin-top: 24px !important;
            margin-bottom: 16px !important;
            font-weight: 600 !important;
            line-height: 1.25 !important; /* Ensure line-height for headers */
        }
        .markdown-body h1 { font-size: 2em !important; padding-bottom: .3em !important; border-bottom: 1px solid #eaecef !important; }
        .markdown-body h2 { font-size: 1.5em !important; padding-bottom: .3em !important; border-bottom: 1px solid #eaecef !important; margin-bottom: 16px !important; }
        .markdown-body h3 { font-size: 1.25em !important; margin-bottom: 16px !important; }
        .markdown-body h4 { font-size: 1em !important; margin-bottom: 16px !important; } /* This is the one you saw issues with */
        .markdown-body h5 { font-size: .875em !important; margin-bottom: 16px !important; }
        .markdown-body h6 { font-size: .85em !important; color: #6a737d !important; margin-bottom: 16px !important; }

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
        .markdown-body ul ul, .markdown-body ul ol, .markdown-body ol ol, .markdown-body ol ul { margin-top: 0.5em !important; margin-bottom: 0.5em !important; padding-left: 2em !important; } /* Ensure nested lists also have padding */
        .markdown-body li > p { margin-top: 8px !important; margin-bottom: 8px !important; line-height: 1.6 !important;}
        .markdown-body li + li { margin-top: .25em !important; }

        /* blockquote styling should be inside .markdown-body context */
        .markdown-body blockquote {
            padding: 0 1em !important;
            color: #6a737d !important;
            border-left: .25em solid #dfe2e5 !important;
            margin-left: 0; /* Resetting default browser margin for blockquote */
            margin-right: 0;
        }
        .markdown-body blockquote { /* Ensure specificity for !important if needed */
            padding: 0 1em !important;
            border-left-width: .25em !important;
        }
        /* code and tt styling should be inside .markdown-body context */
        .markdown-body code, .markdown-body tt {
            padding: .2em .4em !important;
            margin: 0 !important;
            font-size: 85% !important; /* Use percentage for better scaling with parent */
            background-color: rgba(27,31,35,.05) !important;
            border-radius: 3px !important;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace !important;
            line-height: normal !important; /* Reset line-height for inline code to avoid excessive height */
        }
        .markdown-body pre {
            word-wrap: normal;
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            background-color: #f6f8fa;
            border-radius: 6px;
        }
        .markdown-body pre code { padding: 0 !important; margin: 0 !important; font-size: 100% !important; background-color: transparent !important; border-radius: 0 !important; border: 0 !important; white-space: pre-wrap !important; word-break: break-all !important; line-height: 1.45 !important; }

        .markdown-body hr {
            height: .25em;
            padding: 0;
            margin: 24px 0;
            background-color: #e1e4e8;
            border: 0;
        }

        .markdown-body table { display: block !important; width: 100% !important; overflow: auto !important; border-spacing: 0 !important; border-collapse: collapse !important; margin-bottom: 16px !important; }
        .markdown-body table th { font-weight: 600 !important; }
        .markdown-body table th, .markdown-body table td { padding: 6px 13px !important; border: 1px solid #dfe2e5 !important; }
        .markdown-body table tr { background-color: #fff !important; border-top: 1px solid #c6cbd1 !important; }
        .markdown-body table tr:nth-child(2n) { background-color: #f6f8fa !important; }

        /* Explicit light theme */
        body.theme-light {
            background-color: #ffffff; color: #24292e;
        }
        body.theme-light .markdown-body {
            color: #24292e;
        }
        body.theme-light .markdown-body h1, body.theme-light .markdown-body h2, body.theme-light .markdown-body h3, body.theme-light .markdown-body h4, body.theme-light .markdown-body h5, body.theme-light .markdown-body h6 { color: #24292e !important; }
        body.theme-light .markdown-body h1, body.theme-light .markdown-body h2 { border-bottom-color: #eaecef !important; }
        body.theme-light .markdown-body h6 { color: #6a737d !important; }
        body.theme-light .markdown-body a { color: #0366d6 !important; }
        body.theme-light .markdown-body code, body.theme-light .markdown-body tt { background-color: rgba(27,31,35,.05) !important; color: #24292e !important; }
        body.theme-light .markdown-body pre { background-color: #f6f8fa !important; color: #24292e !important; }
        body.theme-light .markdown-body pre code { background-color: transparent !important; color: #24292e !important; }
        body.theme-light .markdown-body hr { background-color: #e1e4e8 !important; }
        body.theme-light .markdown-body blockquote { color: #6a737d !important; border-left-color: #dfe2e5 !important; }
        body.theme-light .markdown-body table th, body.theme-light .markdown-body table td { border-color: #dfe2e5 !important; }
        body.theme-light .markdown-body table tr { background-color: #fff !important; border-top-color: #c6cbd1 !important; }
        body.theme-light .markdown-body table tr:nth-child(2n) { background-color: #f6f8fa !important; }

        /* Explicit dark theme */
        body.theme-dark {
            background-color: #0d1117 !important; color: #c9d1d9 !important;
        }
        body.theme-dark .markdown-body {
            color: #c9d1d9 !important;
        }
        body.theme-dark .markdown-body h1, body.theme-dark .markdown-body h2, body.theme-dark .markdown-body h3, body.theme-dark .markdown-body h4, body.theme-dark .markdown-body h5, body.theme-dark .markdown-body h6 { color: #c9d1d9 !important; }
        body.theme-dark .markdown-body h1, body.theme-dark .markdown-body h2 { border-bottom-color: #30363d !important; }
        body.theme-dark .markdown-body h6 { color: #8b949e !important; }
        body.theme-dark .markdown-body a { color: #58a6ff !important; }
        body.theme-dark .markdown-body code, body.theme-dark .markdown-body tt { background-color: rgba(177,186,196,.15) !important; color: #c9d1d9 !important; }
        body.theme-dark .markdown-body pre { background-color: #161b22 !important; color: #c9d1d9 !important; }
        body.theme-dark .markdown-body pre code { background-color: transparent !important; color: #c9d1d9 !important; }
        body.theme-dark .markdown-body hr { background-color: #30363d !important; }
        body.theme-dark .markdown-body blockquote { color: #8b949e !important; border-left-color: #30363d !important; }
        body.theme-dark .markdown-body table th, body.theme-dark .markdown-body table td { border-color: #30363d !important; }
        body.theme-dark .markdown-body table tr { background-color: #0d1117 !important; border-top-color: #21262d !important; }
        body.theme-dark .markdown-body table tr:nth-child(2n) { background-color: #161b22 !important; }

        /* Fallback to prefers-color-scheme if no explicit theme class is set by parent via JS */
        @media (prefers-color-scheme: dark) {
            body:not(.theme-light):not(.theme-dark) {
                background-color: #0d1117 !important; color: #c9d1d9 !important;
            }
            body:not(.theme-light):not(.theme-dark) .markdown-body {
                color: #c9d1d9 !important;
            }
            body:not(.theme-light):not(.theme-dark) h1,
            body:not(.theme-light):not(.theme-dark) h2,
            body:not(.theme-light):not(.theme-dark) h3,
            body:not(.theme-light):not(.theme-dark) h4,
            body:not(.theme-light):not(.theme-dark) h5 { color: #c9d1d9 !important; }
            body:not(.theme-light):not(.theme-dark) h6 { color: #8b949e !important; } /* Specific color for h6 in dark mode */
            body:not(.theme-light):not(.theme-dark) .markdown-body h1, body:not(.theme-light):not(.theme-dark) .markdown-body h2 { border-bottom-color: #30363d !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body a { color: #58a6ff !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body code, body:not(.theme-light):not(.theme-dark) .markdown-body tt { background-color: rgba(177,186,196,.15) !important; color: #c9d1d9 !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body pre { background-color: #161b22 !important; color: #c9d1d9 !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body pre code { background-color: transparent !important; color: #c9d1d9 !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body hr { background-color: #30363d !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body blockquote { color: #8b949e !important; border-left-color: #30363d !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body table th, body:not(.theme-light):not(.theme-dark) .markdown-body table td { border-color: #30363d !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body table tr { background-color: #0d1117 !important; border-top-color: #21262d !important; }
            body:not(.theme-light):not(.theme-dark) .markdown-body table tr:nth-child(2n) { background-color: #161b22 !important; }
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

      // Modify GitHub links to open in a new tab
      document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('.markdown-body a');
        links.forEach(function(link) {
          if (link.hostname === 'github.com') {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            console.log('[Iframe] Modified GitHub link:', link.href);
          }
        });
        console.log('[Iframe] Finished processing links for target="_blank".');
      });
    </script>
</body>
</html>`;

  fs.writeFileSync(changelogHtmlPath, fullHtml, 'utf8');
  console.log('CHANGELOG.md 已成功转换为 CHANGELOG.html');
} catch (error) {
  console.error('转换 CHANGELOG.md 到 HTML 时发生错误:', error);
  process.exit(1);
}
