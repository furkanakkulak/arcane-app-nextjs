import { AppContext } from '@/context/ContextProvider';
import { faHouse, faShop, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

const Sidebar = () => {
  const router = useRouter();
  const { user } = useContext(AppContext);

  if (router.pathname === '/login') {
    return null;
  } else {
    return (
      <div className="sidebar">
        <Link
          href={'/'}
          className="logo"
        >
          ARCANE
        </Link>

        {user?.image && (
          <>
            <Image
              className="profile-img"
              src={user.image}
              width={100}
              height={100}
              alt={user.username}
            />
            <h2 className="text-center mt-0.5 italic">{user.username}</h2>
            <h3 className="text-center px-1.5 py-1.5 bg-indigo-100 font-bold w-3/4 mx-auto rounded-lg">
              {user.firstName + ' ' + user.lastName}
            </h3>
          </>
        )}
        <ul className="sidebar-links">
          <li className="sidebar-link">
            <Link
              className={`item ${router.pathname == '/' ? 'active' : ''}`}
              href={'/'}
            >
              <FontAwesomeIcon
                icon={faHouse}
                fontSize={18}
              />
              Dashboard
            </Link>
          </li>
          <li className="sidebar-link">
            <Link
              className={`item ${router.pathname == '/users' ? 'active' : ''}`}
              href={'/users'}
            >
              <FontAwesomeIcon
                icon={faUsers}
                fontSize={18}
              />
              Users
            </Link>
          </li>
          <li className="sidebar-link">
            <Link
              className={`item ${
                router.pathname == '/products' ? 'active' : ''
              }`}
              href={'#'}
            >
              <FontAwesomeIcon
                icon={faShop}
                fontSize={18}
              />
              Products
            </Link>
          </li>
        </ul>
      </div>
    );
  }
};
export default Sidebar;
