
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './page/Home'
import LoginPage from './auth/login';
import Details from './page/details';
import ProtectedRoute from "./page/protected";


function App() {
  

    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/login" element={<LoginPage></LoginPage>} />
       <Route path="/details" element={<ProtectedRoute><Details /></ProtectedRoute>} />
      </Routes>
      
    </BrowserRouter>
  );
 
  
}

export default App
