import comp from "/home/songsanggggg/Desktop/BlogScript/docs/.vuepress/.temp/pages/posts/Celerace.html.vue"
const data = JSON.parse("{\"path\":\"/posts/Celerace.html\",\"title\":\"CeleRace\",\"lang\":\"en-US\",\"frontmatter\":{\"date\":\"2026-01-12T00:00:00.000Z\",\"category\":[\"CTF\"],\"tag\":[\"CTF\",\"Web\",\"强网杯\"]},\"headers\":[{\"level\":2,\"title\":\"Dockerfile\",\"slug\":\"dockerfile\",\"link\":\"#dockerfile\",\"children\":[]},{\"level\":2,\"title\":\"supervisord\",\"slug\":\"supervisord\",\"link\":\"#supervisord\",\"children\":[]},{\"level\":2,\"title\":\"软件功能及源码阅读\",\"slug\":\"软件功能及源码阅读\",\"link\":\"#软件功能及源码阅读\",\"children\":[{\"level\":3,\"title\":\"软件功能\",\"slug\":\"软件功能\",\"link\":\"#软件功能\",\"children\":[]},{\"level\":3,\"title\":\"源码分析\",\"slug\":\"源码分析\",\"link\":\"#源码分析\",\"children\":[]}]},{\"level\":2,\"title\":\"参考博客\",\"slug\":\"参考博客\",\"link\":\"#参考博客\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/Celerace.md\",\"excerpt\":\"\\n<p>该题目来自强网杯初赛，本页书写参考了很多大佬的笔记(在文章末尾有提到)，很早之前就已经写好了，现在用来作为博客的第一篇文章。</p>\\n<h2>Dockerfile</h2>\\n<p>从 Dockerfile 我们可以看到如下语句：</p>\\n<div class=\\\"language-docker line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"docker\\\"><pre><code><span class=\\\"line\\\">chown root:worker /readflag</span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div></div></div>\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
