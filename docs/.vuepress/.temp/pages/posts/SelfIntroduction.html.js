import comp from "/home/songsanggggg/Desktop/BlogScript/docs/.vuepress/.temp/pages/posts/SelfIntroduction.html.vue"
const data = JSON.parse("{\"path\":\"/posts/SelfIntroduction.html\",\"title\":\"关于我 | songsanggggg\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"基本信息\",\"slug\":\"基本信息\",\"link\":\"#基本信息\",\"children\":[]},{\"level\":2,\"title\":\"联系方式\",\"slug\":\"联系方式\",\"link\":\"#联系方式\",\"children\":[]},{\"level\":2,\"title\":\"博客初衷\",\"slug\":\"博客初衷\",\"link\":\"#博客初衷\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"posts/SelfIntroduction.md\",\"excerpt\":\"\\n<p>Hi 👋 欢迎来到我的个人博客，这里会记录我的CTF学习之路、Web安全探索心得，还有一些技术踩坑与复盘，希望能和同好们一起交流进步～</p>\\n<h2>基本信息</h2>\\n<ul>\\n<li><strong>身份</strong>：哈尔滨工业大学 未来技术学院 大二在读</li>\\n<li><strong>CTF定位</strong>：纯纯初学者，主攻<strong>Web方向</strong></li>\\n</ul>\\n<h2>联系方式</h2>\\n<p>正在严肃尝试摆脱社恐!</p>\\n<ul>\\n<li>📧 邮箱：bxgh6.xivkv71ra8@gmail.com</li>\\n<li>📡 Telegram：<a href=\\\"https://t.me/songsanggggg\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://t.me/songsanggggg</a></li>\\n<li>💻 Github：<a href=\\\"https://github.com/songsanggggg\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://github.com/songsanggggg</a></li>\\n</ul>\"}")
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
