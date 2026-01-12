import comp from "/home/songsanggggg/Desktop/BlogScript/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"https://avatars.githubusercontent.com/u/95994511\",\"actions\":[{\"text\":\"Article\",\"link\":\"/article/\",\"type\":\"primary\"},{\"text\":\"Introduction\",\"link\":\"/posts/SelfIntroduction\",\"type\":\"secondary\"}],\"features\":[{\"title\":\"email\",\"details\":\"bxgh6.xivkv71ra8@gmail.com\"},{\"title\":\"QQ\",\"details\":3145787907},{\"title\":\"Telegram\",\"details\":\"https://t.me/songsanggggg\"},{\"title\":\"Github\",\"details\":\"https://github.com/songsanggggg\"}],\"footer\":\"MIT Licensed | Copyright © 2018-present VuePress Community\"},\"headers\":[],\"git\":{\"updatedTime\":1768205962000,\"contributors\":[{\"name\":\"songsanggggg\",\"username\":\"songsanggggg\",\"email\":\"bxgh6_xivkv71ra8@163.com\",\"commits\":1,\"url\":\"https://github.com/songsanggggg\"}],\"changelog\":[{\"hash\":\"21659533382c8ec47dc954fcad9ca0bba6a85932\",\"time\":1768205962000,\"email\":\"bxgh6_xivkv71ra8@163.com\",\"author\":\"songsanggggg\",\"message\":\"init commit\"}]},\"filePathRelative\":\"README.md\"}")
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
