import home from "./pages-data/home";
import news from "./pages-data/news";
import brands from "./pages-data/brands";
import notFound from "./pages-data/notFound";
import newsDetail from "./pages-data/newsDetail";
import salesCatalog from "./pages-data/sales";
import about from "./pages-data/about";
import contacts from "./pages-data/contacts";
import product from "./pages-data/product";
import account from "./pages-data/account";
import mailing from "./pages-data/mailing";
import catalog from "./pages-data/catalog";
import orders from "./pages-data/orders";
import checkout from "./pages-data/checkout";
import search from "./pages-data/search";
import cart from "./pages-data/cart";
import homeUnauthorized from "./pages-data/homeUnauthorized";
import fav from "./pages-data/fav";
const pagesConfig = {
  ...home,
  ...news,
  ...brands,
  ...notFound,
  ...newsDetail,
  ...salesCatalog,
  ...about,
  ...contacts,
  ...product,
  ...account,
  ...mailing,
  ...catalog,
  ...orders,
  ...checkout,
  ...search,
  ...cart,
  ...homeUnauthorized,
  ...fav,
  ...uiKit,
};

export default pagesConfig;
