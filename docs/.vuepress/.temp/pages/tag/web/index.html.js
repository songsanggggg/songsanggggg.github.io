import comp from "/home/songsanggggg/Desktop/BlogScript/docs/.vuepress/.temp/pages/tag/web/index.html.vue"
const data = JSON.parse("{\"path\":\"/tag/web/\",\"title\":\"Tag Web\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Tag Web\",\"sidebar\":false,\"blog\":{\"type\":\"category\",\"name\":\"Web\",\"key\":\"tag\"},\"layout\":\"Tag\"},\"headers\":[],\"git\":{},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
