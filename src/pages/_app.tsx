import { CarsProvider } from "@/context/CarsContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CarsProvider>
      <Component {...pageProps} />
    </CarsProvider>
  );
}
