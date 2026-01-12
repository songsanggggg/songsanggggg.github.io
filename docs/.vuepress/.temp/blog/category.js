export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"CTF\":{\"path\":\"/category/ctf/\",\"indexes\":[0,1,2]}}}},\"tag\":{\"/\":{\"path\":\"/tag/\",\"map\":{\"CTF\":{\"path\":\"/tag/ctf/\",\"indexes\":[0,1,2]},\"Web\":{\"path\":\"/tag/web/\",\"indexes\":[0,1,2]},\"强网杯\":{\"path\":\"/tag/%E5%BC%BA%E7%BD%91%E6%9D%AF/\",\"indexes\":[2]},\"CISCN\":{\"path\":\"/tag/ciscn/\",\"indexes\":[1]},\"NepCTF\":{\"path\":\"/tag/nepctf/\",\"indexes\":[0]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

