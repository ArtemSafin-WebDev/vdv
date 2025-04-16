import home from "./pages-data/home";
import news from "./pages-data/news";
import brands from "./pages-data/brands";
import notFound from "./pages-data/notFound";
import newsDetail from "./pages-data/newsDetail";

const pagesConfig = {
  ...home,
  ...news,
  ...brands,
  ...notFound,
  ...newsDetail,
};

export default pagesConfig;
