import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

function Layout({ children, isUploading }) {
  return (
    <div>
      <Navbar isUploading={isUploading} />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
