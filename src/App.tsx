import React from "react";
import "./App.css";
import Calendar from "pages/Calendar";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Calendar />
    </RecoilRoot>
  );
}

export default App;
