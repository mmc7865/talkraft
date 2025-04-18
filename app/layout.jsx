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
        {children}
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
