import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/style.scss";

import AuthContextProvider from "../context/AuthContext";

import theme from './theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
