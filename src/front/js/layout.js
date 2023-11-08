import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Store } from "./pages/store";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import GymMap from "./pages/gymMap";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Register } from "./pages/register";
import { Exercises } from "./pages/exercises";
import { BodypartExercises } from "./pages/bodypartExercises";
import ExerciseDetail from "./pages/exerciseDetail";
import ProductDetail from "./pages/productDetail";
import ShoppingCart  from "./pages/shoppingCart/shoppingCart"
import { Login } from "./pages/login";
import AdminPanel from "./pages/adminPanel";
import { AdminLogin } from "./pages/adminLogin";
import PageViewerPDF from "./pages/pageViewerPDF";
import Checkout from "./pages/checkout";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Exercises />} path="/exercises" />
            <Route element={<BodypartExercises />} path="/bodypart/:bodypart" />
            <Route element={<ExerciseDetail />} path="/exercisedetail/:id"/>
            <Route element={<ProductDetail />} path="/product-detail/:id"/>
            <Route element={<ShoppingCart />} path="/shopping-cart"/>
            <Route element={<Store />} path="/store" />
            <Route element={<GymMap />} path="/gyms-map" />
            <Route element={<Register/>} path="/register"/>
                        <Route element={<Login/>} path="/login"/>
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Register/>} path="/register"/>
            <Route element={<Login/>} path="/login"/>
            <Route element={<AdminLogin />} path="/admin-login" />
            <Route element={<AdminPanel />} path="/dashboard" />
            <Route element={<PageViewerPDF />} path="/pdfviewer" />
            <Route element={<Checkout />} path="/checkout" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
