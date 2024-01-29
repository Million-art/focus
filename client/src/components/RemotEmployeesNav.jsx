import React, { useState } from 'react';

const RemotEmployeesNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 h-[80px] flex flex-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold lg:text-[20px]"><a href='/'>FOCUS</a></div>
        
      
        
         <ul className={`lg:flex space-x-4 ${isMenuOpen ? 'hidden lg:flex' : 'hidden'}`}>
          <li>
            <a href="/remot" className="text-white hover:text-gray-300">Home</a>
          </li>
          
          <li>
            <a href="/remotreport" className="text-white hover:text-gray-300">Send Report</a>
          </li>
         </ul>
        
        {/* Colored List under Hamburger Icon */}
        <ul className={`lg:hidden mt-32 ${isMenuOpen ? 'block bg-gray-800' : 'hidden'}`}>
          <li>
            <a href="/" className="text-white block py-2 px-4 hover:bg-gray-600">Home</a>
          </li>
          
          <li>
            <a href="/report" className="text-white block py-2 px-4 hover:bg-gray-600">Send Report</a>
          </li>
          <li>
            <a href="/r_profile" className="text-white block py-2 px-4 hover:bg-gray-600">profile</a>
          </li>
         </ul>
      </div>
        {/* Hamburger Menu Icon */}
        <div className="lg:hidden z-100 ">
          <button onClick={handleToggleMenu} className="text-white focus:outline-none ">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
    </nav>
  );
}

export default RemotEmployeesNav;
