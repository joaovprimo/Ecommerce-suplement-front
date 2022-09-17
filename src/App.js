import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"

import AuthContext from "./Context/AuthContext.js"
import LoginPage from "./Components/LoginPage.js";
import SignUpPage from "./Components/SignUpPage.js";
import Home from "./Components/Home.js"


export default function App() {
const [user, setUser] = useState();
const [arrProducts, setArrProducts] = useState([]);
const [selected, setSelected] = useState([]);

  return (
     <AuthContext.Provider value={{ user, setUser, arrProducts, setArrProducts, selected, setSelected}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
           <Route path="/sign-up" element={<SignUpPage />} /> 
           <Route path="/home" element={<Home />} /> 
        </Routes>
      </BrowserRouter>
     </AuthContext.Provider>
  );
}
