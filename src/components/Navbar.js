import { AppContext } from '@/context/ContextProvider';
import {
  faBars,
  faHouse,
  faSearch,
  faShop,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const Navbar = () => {
  const router = useRouter();

  const [showProfile, setShowProfile] = useState(false);

  const { toggleSidebar, showSidebar, logout, user } = useContext(AppContext);

  const toggleProfile = () => {
    setShowProfile((prevState) => !prevState);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <nav>
      <div className="border-b-[0.5px] h-20 w-full flex items-center fixed lg:relative bg-white z-20 top-0">
        <div className="py-5 px-5 flex items-center justify-between w-full">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="flex lg:hidden"
            >
              <FontAwesomeIcon
                icon={faBars}
                fontSize={23}
              />
            </button>
            <div className="hidden lg:flex items-center border-[1px] rounded-lg">
              <div className="bg-slate-100 h-[40px] w-[40px] flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <input
                type="text"
                placeholder="Search.."
                className="rounded-tr-lg rounded-br-lg px-1 py-0.5 h-[40px]"
              />
            </div>
          </div>
          <Link
            href={'/'}
            className="logo"
          >
            ARCANE
          </Link>
          <div className="flex items-center md:order-2 relative">
            <button
              onClick={toggleProfile}
              type="button"
              className="flex text-sm border-[0.5px] shadow-2xl rounded-full md:mr-0"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              {user?.image && (
                <Image
                  className="w-8 h-8 rounded-full"
                  src={user.image}
                  alt={user.username}
                  width={100}
                  height={100}
                />
              )}
            </button>
            <div
              className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl absolute top-[20px] right-[-15px] ${
                showProfile ? '' : 'hidden'
              }`}
              id="user-dropdown"
              onBlur={closeProfile}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 ">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="block text-sm  text-gray-500 truncate ">
                  {user?.email}
                </span>
              </div>
              <ul
                className="py-2"
                aria-labelledby="user-menu-button"
              >
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <p
                    href="#"
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Sign out
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`navbar ${showSidebar ? 'block' : 'hidden'}`}>
        <ul className="navbar-links">
          <li className="navbar-link">
            <Link
              className={`item ${router.pathname == '/' ? 'active' : ''}`}
              href={'/'}
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faHouse} />
              Dashboard
            </Link>
          </li>
          <li className="navbar-link">
            <Link
              className={`item ${router.pathname == '/users' ? 'active' : ''}`}
              href={'/users'}
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faUsers} />
              Users
            </Link>
          </li>
          <li className="navbar-link">
            <Link
              className={`item ${
                router.pathname == '/products' ? 'active' : ''
              }`}
              href={'#'}
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faShop} />
              Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
