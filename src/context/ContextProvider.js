import { useRouter } from 'next/router';
import { useEffect, createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [allUsers, setAllUsers] = useState({});
  const [searchUsers, setSearchUsers] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setUser(decodeJWT(storedToken));
    } else if (!storedToken) {
      router.push('/login');
    }
  }, []);

  const decodeJWT = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.log('JWT decode hatası:', error);
      logout();
    }
  };

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(decodeJWT(userData.token));
    setToken(userData.token);
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  const fetchAllUsers = async (limit, skip) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=firstName,lastName,email,image`
      );
      const data = response.data;
      setAllUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  const searchUser = async (searchKey) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/users/search?q=${searchKey}`
      );
      const data = response.data;
      setSearchUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        login,
        logout,
        showSidebar,
        toggleSidebar,
        fetchAllUsers,
        allUsers,
        searchUsers,
        searchUser,
        setSearchUsers,
        setAllUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
