import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <Header />
      {children}
      <Footer />
    </SmoothScrollProvider>
  );
}
