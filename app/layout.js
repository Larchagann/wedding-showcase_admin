import "../styles/globals.css";
import { Inter } from "next/font/google";
import bg from "../images/background.jpg";
import Context from "@/context/context";
import Banner from "@/Components/banner";
import dynamic from "next/dynamic";
import Footer from "@/Components/layout/footer";

require("dotenv").config();

const inter = Inter({ subsets: ["latin"] });

const Navigation = dynamic(() => import("@/Components/layout/navigation"), {
  ssr: false,
});

export const metadata = {
  title: "Mariage de Yann & Lucie",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <link
          href="https://fonts.googleapis.com/css?family=Allura"
          rel="stylesheet"
        />
        <Context>
          <Navigation />
          <main>
            <img className="background" src={bg.src} alt="background" />
            <div className="page">
              <div className="page-content">
                <Banner />
                <div className="page-container">{children}</div>
              </div>
              <Footer />
            </div>
          </main>
        </Context>
      </body>
    </html>
  );
}
