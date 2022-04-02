import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContext } from "../../helpers/ContextHelper";
import { Footer } from "../partial/Footer";
import { Header } from "../partial/Header";
import { Toast } from "../shared/Toast";
import { Countries } from "./Countries";
import { Users } from "./Users";

export function Main() {
  const [message, setMessage] = React.useState<string>("");
  const toastContext = React.useMemo(() => {
    return {
      message: message,
      setMessage: (newMessage: any) => {
        setMessage(newMessage);
      },
    };
  }, [message]);

  return (
    <div>
      <ToastContext.Provider value={toastContext}>
        <Header />
        <div className="body py-5">
          <div className="container my-5">
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/country-list" element={<Countries />} />
            </Routes>
          </div>
          <Toast />
        </div>
        <Footer />
      </ToastContext.Provider>
    </div>
  );
}
