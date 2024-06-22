import { Roboto } from "next/font/google";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { Content } from "@components/Content";
import emotionStyled from "@emotion/styled";
import { Provider } from "react-redux";
import store from "@/store";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isResultRoute = router.pathname === "/result";

  return (
    <Provider store={store}>
      <MainStyled
        className={`${roboto.className}`}
        isResultPage={isResultRoute}
      >
        <Content>
          <Component {...pageProps} />
        </Content>
      </MainStyled>
    </Provider>
  );
}

const MainStyled = emotionStyled.main<{ isResultPage?: boolean }>`
height: 100vh;
  background-color:${(props) => (props.isResultPage ? "#dcf5f2" : "#f9f6fc")}
`;
