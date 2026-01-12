import comp from "/home/songsanggggg/Desktop/BlogScript/docs/.vuepress/.temp/pages/posts/SafeBank.html.vue"
const data = JSON.parse("{\"path\":\"/posts/SafeBank.html\",\"title\":\"safe_bank\",\"lang\":\"en-US\",\"frontmatter\":{\"date\":\"2026-01-12T00:00:00.000Z\",\"category\":[\"CTF\"],\"tag\":[\"CTF\",\"Web\",\"NepCTF\"]},\"headers\":[],\"git\":{},\"filePathRelative\":\"posts/SafeBank.md\",\"excerpt\":\"\\n<p>​\\t本题是在Nepctf中遇到了一道题，是接触CTF不久的一次比赛，是我第一次接触jsonpickle反序列化，其中clear的思路来自Pid,属于非预期解，但是是真不好想啊😭。</p>\\n<p>​\\t题目中描述如下：</p>\\n<div class=\\\"language-text line-numbers-mode\\\" data-highlighter=\\\"prismjs\\\" data-ext=\\\"text\\\"><pre><code><span class=\\\"line\\\">Python Flask作为Web框架</span>\\n<span class=\\\"line\\\">JSON用于数据交换</span>\\n<span class=\\\"line\\\">使用jsonpickle的高级会话管理</span>\\n<span class=\\\"line\\\">Base64编码用于Token传输</span>\\n<span class=\\\"line\\\"></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\"}")
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
