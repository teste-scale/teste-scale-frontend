import { Route, Routes } from "react-router-dom";
import { Footer } from "../partial/Footer";
import { Header } from "../partial/Header";
import { Countries } from "./Countries";
import { Users } from "./Users";

export function Main() {
  return (
    <div>
      <Header />
      <div className="body py-5">
        <div className="container my-5 py-5">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/country-list" element={<Countries />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}
