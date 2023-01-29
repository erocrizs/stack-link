import "@/styles/global.scss";
import type { AppProps } from "next/app";

import Header from "@/components/Header/Header"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header/>
      <Component {...pageProps} />
    </div>
  );
}
