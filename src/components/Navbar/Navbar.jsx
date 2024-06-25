import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import logo from '../../assets/images/logo.svg';

export default function Navbar() {
  const { getCartItems, cart, wishlist } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(null);
  const { userLogin, setUserLogin, userName, setUserName } = useContext(UserContext);

  function logOut() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    localStorage.removeItem('userName');
    setUserName(null);
    navigate('/login');
    setOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const fetchCartCount = async () => {
        const response = await getCartItems();
        setCartCount(response?.data?.numOfCartItems);
      };

      fetchCartCount();
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [getCartItems, cart, wishlist]);

  const toggleMenu = () => {
    setOpen(!open);
   
  };
  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth < 1024 ? open : false); 
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);
  return (
    <nav className={`bg-gray-100 fixed top-0 left-0 right-0 z-50 ${scrolled ? 'py-0' : 'py-2'} px-4 transition-all duration-500`}>
      <div className={`container w-full flex relative  ${open ? 'justify-around ' : 'justify-between py-4'}  items-center mx-auto `}>
        <Link to="/" className={`lg:hidden ${open ? 'hidden' : ''} `}>
          <img src={logo} width={120} alt="fresh cart logo" />
        </Link>
        <button onClick={toggleMenu} type="button" className={`${open ? 'absolute top-5 right-0' : ''} inline-flex p-2 order-3  text-gray-900 rounded-lg lg:hidden`} aria-controls="navbar-default" aria-expanded={open}>
          <i className={`${open ? 'fa-solid fa-x text-2xl' : 'fas fa-bars text-3xl'}`}></i>
        </button>
        <div className={` lg:flex  lg:items-center lg:w-full ${open ? 'block w-full' : 'hidden'}`}>
          <div className={` gap-x-[110px] flex ${open ? '' : 'justify-between'} ${userLogin !== null ? " w-full" :'w-full justify-between me-3'}  lg:flex-row lg:items-center lg:space-x-8  mt-0 lg:text-sm lg:font-medium`}>
            <Link to="/" className="hidden lg:block">
              <img src={logo} width={120} alt="fresh cart logo" />
            </Link>
            <ul className={`${open ? 'border-e border-solid border-black w-1/4 ' : ''}  flex  flex-col lg:flex-row lg:space-x-8 lg:mr-auto mt-4 lg:mt-0`}>
              {userLogin !== null ? (
                <>
                  <li>
                    <NavLink to="/" className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-[16px] rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    } onClick={() => setOpen(false)}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart" className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-[16px] ${open ? 'hidden' : ''} rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    }onClick={() => setOpen(false)}>
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products" className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-[16px] rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    }onClick={() => setOpen(false)}>
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/categories" className={({ isActive }) =>
                      `block py-2  pr-4 pl-3 text-[16px] rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    }onClick={() => setOpen(false)}>
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/brands" className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-[16px] rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    }onClick={() => setOpen(false)}>
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/wishlist" className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-[16px] ${open ? 'hidden' : ''} rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    }onClick={() => setOpen(false)}>
                      Wish List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/allorders" className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-[16px] rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    }onClick={() => setOpen(false)}>
                      Orders
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-[16px] rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    }onClick={() => setOpen(false)}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 text-[16px] rounded lg:bg-transparent lg:p-0 ${isActive ? 'font-semibold text-green-500 hover:text-green-500' : 'text-gray-700'}`
                    }onClick={() => setOpen(false)}>
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {userLogin !== null ? (
              <>
            <div className={`flex flex-col lg:flex-row ${open ? 'justify-around items-center ' : 'gap-x-8 '}  mt-4 lg:mt-0`}>
              <div className="relative flex items-center">
                <Link to="/cart" className="relative text-gray-900" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-cart-shopping text-2xl align-middle"></i>
                  {cartCount > 0 && (
                    <span className="absolute bottom-3 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-400 rounded-full">
                      {cart?.numOfCartItems}
                    </span>
                  )}
                </Link>
              </div>
              <div className="relative flex items-center">
                <Link to="/wishlist" className="relative text-gray-900" onClick={() => setOpen(false)}>
                  <i className="fa-solid fa-heart text-2xl align-middle"></i>
                  {wishlist?.length >= 0 && (
                    <span className="absolute bottom-3 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-400 rounded-full">
                      {wishlist?.length}
                    </span>
                  )}
                </Link>
              </div>
              <div className={`flex items-center space-x-2 lg:space-x-4 ${open ? 'order-4' : ''}`}>
                <i className="fab fa-facebook text-blue-700 text-lg"></i>
                <i className="fab fa-twitter text-blue-400 text-lg"></i>
                <i className="fab fa-instagram text-red-500 text-lg"></i>
                <i className="fab fa-tiktok text-lg"></i>
                <i className="fab fa-youtube text-red-600 text-lg"></i>
              </div>
              <button onClick={logOut} className={`ml-auto text-red-500 hover:text-red-700 ${open ? 'w-full ' : ''}`}>
                <i className="fa-solid fa-right-from-bracket text-lg"></i>
              </button>
            </div>
            </>
            ) : null }
          </div>
        </div>
      </div>
    </nav>
  );
}
