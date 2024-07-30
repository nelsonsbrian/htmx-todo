import * as React from "react";

export const createStatus = (message: string) => {
  return (
    <p hx-swap-oob="true" id="status">
      {message}
    </p>
  );
};
