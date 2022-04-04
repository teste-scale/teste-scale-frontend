import React from "react";

export interface IToastContext {
  message: string;
  setMessage: Function;
}

export const ToastContext = React.createContext<IToastContext>({
  message: "",
  setMessage: () => {},
});
