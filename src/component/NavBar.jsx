import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";


const NavBar = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [signIn, setSignin] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  
  // Replace 'token' with the name of the cookie holding the token

  const signOut = () => {
    Cookies.remove("token")
    props.setSignin(false);
    window.location.href = '/';
    window.sessionStorage.clear()
  };

  const loginNav = props.signIn ? (
    <div>
      <button
        onClick={toggleDropdown}
        className="text-black bg-[#b0c0cd] hover:bg-[#91a9bd] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        My Account{" "}
      </button>
      {/* Dropdown menu */}
      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute m-1`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {/* <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li> */}
          <li>
            <Link
              onClick={signOut}
              className="block px-4 py-2 hover-bg-gray-100 dark:hover-bg-gray-600 dark:hover-text-white"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="flex-1 flex justify-end items-center align-center">
      <Link 
      to="/login"
      className="text-black font-medium mr-2" >
        Sign in
      </Link>
      <Link to="/registration">
      <button 
        type="button"
        className="shadow-sm shadow-[#91a9bd] text-black bg-[#b0c0cd] hover:bg-[#91a9bd] font-medium rounded-lg text-sm px-10 py-2.5"
      >
        Sign Up
      </button>
      </Link>
    </div>
  );

  return (
    <div className="antialiased ">
      <header className="lg:px-16 px-6 bg-transparent flex flex-wrap items-center lg:py-0 py-2">
        <div className="flex-1 flex justify-between items-center">
          <Link to="/" className="text-black text-2xl py-6 font-bold">
            Tourizm Jorden
          </Link>
        </div>

        {loginNav}
      </header>
    </div>
  );
};

export default NavBar;

// <div className="antialiased bg-gray-900">
// <header className="lg:px-16  px-6 bg-[#522C6D] flex flex-wrap items-center lg:py-0 py-2">
//   <div className="flex-1  flex justify-between items-center">
//     <img src={logo} alt={"logo"} width="60px" height="60px"></img>
//   </div>
// <div className="flex-1 flex justify-end items-center align-center">
//   <a className="text-white font-medium mr-2" href="#">
//     Sign in
//   </a>
//   <button
//     type="button"
//     className="shadow-sm shadow-yellow-400 text-white bg-[#FCD12C] hover:bg-yellow-500 font-medium rounded-lg text-sm px-10 py-2.5"
//   >
//     Sign Up
//   </button>
// </div>
// </header>

{
  /* <label for="menu-toggle" className="cursor-pointer lg:hidden block relative">
<svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg>
</label>
<input type="checkbox" className="hidden" id="menu-toggle" />
<div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
    <nav>
      <ul className="lg:flex items-center justify-between text-base text-white pt-4 lg:pt-0">
        <li>
          <a href="#" className="lg:p-4 py-3 px-0 block border-b-4 border-transparent hover:hover-indent-400  hover:border-yellow-300"  >settings</a>
        </li>
        <li>
          <a href="#" className="lg:p-4 py-3 px-0 block border-b-4 border-transparent hover:border-yellow-300"  >Sign Out</a>
        </li>
      </ul>
    </nav>

    

      </div> */
}
