import React from "react";
import Header from "./header";
import Footer from "./footer";
import ScrollToTopButton from "./scroll-to-top";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
