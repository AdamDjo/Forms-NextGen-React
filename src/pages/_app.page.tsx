import { type AppType } from "next/dist/shared/lib/utils";

import "$/styles/globals.css";
import React from "react";
import { Toaster } from "$/components/ui/toaster";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <Toaster></Toaster>
    </React.Fragment>
  );
};

export default MyApp;
