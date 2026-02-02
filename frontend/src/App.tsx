import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './page/Home'
import LoginPage from './auth/login';
import Details from './page/details';
import Navbar from './components/navbar';

function App() {
  const [count, setCount] = useState(0)

    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/login" element={<LoginPage></LoginPage>} />
       <Route path="/detail" element={<Details></Details>} />
      </Routes>
      
    </BrowserRouter>
  );
 
  
}

export default App
