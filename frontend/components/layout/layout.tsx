"use client";
import useLayout from "@/hooks/useLayout";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { headerText } = useLayout();

  return (
    <>
      <Header text={headerText} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
