import React from "react";
import ReactDOMServer from "react-dom/server";

export const renderHTML = (...content: (React.JSX.Element | string)[]) => {
  return content.map((c) => ReactDOMServer.renderToString(c)).join("");
};
