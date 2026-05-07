import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { ProductDetail } from "./components/ProductDetail";
import { Checkout } from "./components/Checkout";
import { About } from "./components/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "checkout", Component: Checkout },
    ],
  },
]);