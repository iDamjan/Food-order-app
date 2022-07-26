import React from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <Cart></Cart>
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
