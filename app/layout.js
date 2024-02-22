import "../styles/globals.css";
import { Inter } from "next/font/google";
import bg from "../images/background.jpg";
import Context from "@/context/context";
import dynamic from "next/dynamic";
import Footer from "@/Components/layout/footer";
import HeaderBanner from "@/Components/layout/headerBanner";

require("dotenv").config();

const inter = Inter({ subsets: ["latin"] });

const LoginRootCard = dynamic(() => import("@/Components/loginRootCard"), {
  ssr: false,
});

export const metadata = {
  title: "Wedding Showcase - Gestion",
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
            <img className="background" src={bg.src} alt="background" />
        <Context>
          <LoginRootCard>
          <HeaderBanner />
          <main>
            <div className="page">
              <div className="page-content">
                <div className="page-container">{children}</div>
              </div>
              <Footer />
            </div>
          </main>
          </LoginRootCard>
        </Context>
      </body>
    </html>
  );
}
