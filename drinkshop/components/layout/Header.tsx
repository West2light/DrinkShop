"use client";

import TopNavbar from "./TopNavbar";
import MainNavbar from "./MainNavbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopNavbar />
      <MainNavbar />
    </header>
  );
};

export default Header;
