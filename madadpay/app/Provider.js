"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import ProtectedWrapper from "@/components/ProtectedWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/toaster";
import { usePathname } from "next/navigation";

export default function Providers({ children }) {
  const pathname = usePathname();
  const publicRoutes = ["/login", "/signup", "/terms", "/privacy"];
  const isPublic = publicRoutes.includes(pathname);

  return (
    <Provider store={store}>
      <ToasterProvider />
      {isPublic ? (
        children
      ) : (
        <ProtectedWrapper>
          <Navbar />
          <div className="h-16" />
          {children}
          <Footer />
        </ProtectedWrapper>
      )}
    </Provider>
  );
}
