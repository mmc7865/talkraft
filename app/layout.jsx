import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function RootLayout({ children }) {
  gsap.registerPlugin(ScrollTrigger)
  return (
    <html lang="en">
      <body >
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar/>
          <div className="pt-18">  
        {children}
          </div>
          <div className="h-20"></div>
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
