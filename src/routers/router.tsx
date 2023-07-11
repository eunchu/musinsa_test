import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@/components/pages/Main";
import Header from "@/components/organisms/Header";
import ScrollToTop from "./scrollToTop";

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route index element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;
