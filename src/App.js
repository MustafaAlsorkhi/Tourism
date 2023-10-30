import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Home from './pages/Home';
import NavBar from './component/NavBar';
import { Footer } from './component/Footer'
;
import BlogDetails from './component/Details';

function App() {
  const [signIn, setSignin] = useState(false);
 if(window.sessionStorage.length==1 && signIn==false){

  setSignin(true)
 }
  return (
    <div className="App bg-gray-200">
    <BrowserRouter>
    <NavBar 
    signIn={signIn}
    setSignin={setSignin}
    />
      <Routes>
      <Route path="/" element={<Home/>}> </Route>
        <Route path="/login" element={<SignIn setSignin={setSignin}/>}></Route>
          <Route path="/registration" element={<SignUp/>}></Route>
          <Route path="/details/:blogId" element={<BlogDetails/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
      
    </div>

  );
}

export default App;
