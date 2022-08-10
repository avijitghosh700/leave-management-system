import "../styles/style.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
