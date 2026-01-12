import comp from "/home/songsanggggg/Desktop/BlogScript/docs/.vuepress/.temp/pages/posts/article10.html.vue"
const data = JSON.parse("{\"path\":\"/posts/article10.html\",\"title\":\"Article 10\",\"lang\":\"en-US\",\"frontmatter\":{\"date\":\"2022-01-10T00:00:00.000Z\",\"category\":[\"Category A\",\"Category B\"],\"tag\":[\"tag C\",\"tag D\"]},\"headers\":[{\"level\":2,\"title\":\"Heading 2\",\"slug\":\"heading-2\",\"link\":\"#heading-2\",\"children\":[{\"level\":3,\"title\":\"Heading 3\",\"slug\":\"heading-3\",\"link\":\"#heading-3\",\"children\":[]}]}],\"git\":{\"updatedTime\":1768205962000,\"contributors\":[{\"name\":\"songsanggggg\",\"username\":\"songsanggggg\",\"email\":\"bxgh6_xivkv71ra8@163.com\",\"commits\":1,\"url\":\"https://github.com/songsanggggg\"}],\"changelog\":[{\"hash\":\"21659533382c8ec47dc954fcad9ca0bba6a85932\",\"time\":1768205962000,\"email\":\"bxgh6_xivkv71ra8@163.com\",\"author\":\"songsanggggg\",\"message\":\"init commit\"}]},\"filePathRelative\":\"posts/article10.md\",\"excerpt\":\"\\n<h2>Heading 2</h2>\\n<p>Here is the content.</p>\\n<h3>Heading 3</h3>\\n<p>Here is the content.</p>\\n\"}")
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
