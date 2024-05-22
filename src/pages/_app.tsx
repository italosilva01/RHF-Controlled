//import { Roboto } from "next/font/google";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CarsProvider } from "@/context/CarsContext";
import "@/styles/globals.css";
import { Content } from "@components/Content";

// const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isResultRoute = router.pathname === "/result";

  useEffect(() => {
    if (isResultRoute) {
      document.documentElement.style.setProperty("--main-bg-color", "#dcf5f2");
    }
  }, [isResultRoute]);
  return (
    <CarsProvider>
      <main
      // className={`${roboto.className}`}
      >
        <Content>
          <Component {...pageProps} />
        </Content>
      </main>
    </CarsProvider>
  );
}
