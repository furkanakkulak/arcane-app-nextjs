import AddNewUser from '@/components/AddNewUser';
import UserCard from '@/components/UserCard';
import { AppContext } from '@/context/ContextProvider';
import {
  faAlignRight,
  faChevronLeft,
  faChevronRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Users = () => {
  const {
    allUsers,
    fetchAllUsers,
    searchUsers,
    searchUser,
    setSearchUsers,
    setAllUsers,
  } = useContext(AppContext);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    if (router.query.page && router.query.pageSize) {
      if (router.query.page <= 0) {
        router.push({
          pathname: '/users',
          query: {
            page: 1,
            pageSize: 7,
          },
        });
      }
      const limit = router.query.pageSize;
      const skip = (router.query.page - 1) * router.query.pageSize;
      setCurrentPage(Number(router.query.page));
      setPageSize(Number(router.query.pageSize));
      setSearchQuery(null);
      setSearchUsers(null);
      fetchAllUsers(limit, skip);
    }
    if (router.query.search) {
      setSearchQuery(router.query.search);
      searchUser(router.query.search);
    }
  }, [router.query]);

  useEffect(() => {
    if (router.asPath === '/users') {
      router.push({
        pathname: '/users',
        query: {
          page: 1,
          pageSize: 7,
        },
      });
    }
  }, [router.asPath === '/users']);

  const handlePageUpChange = () => {
    if (allUsers?.users.length > 0) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      router.push({
        pathname: '/users',
        query: {
          page: nextPage,
          pageSize: pageSize,
        },
      });
    }
  };

  const handlePageDownChange = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      router.push({
        pathname: '/users',
        query: {
          page: previousPage,
          pageSize: pageSize,
        },
      });
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
    router.push({
      pathname: '/users',
      query: {
        page: 1,
        pageSize: size,
      },
    });
  };

  const handleSearchQueryChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    if (newSearchQuery) {
      setAllUsers(null);
      router.push({
        pathname: '/users',
        query: {
          search: newSearchQuery,
        },
      });
    } else {
      if (currentPage <= 0) {
        router.push({
          pathname: '/users',
          query: {
            page: 1,
            pageSize: 7,
          },
        });
      } else {
        router.push({
          pathname: '/users',
          query: {
            page: (currentPage - 1) * currentPage,
            pageSize: pageSize,
          },
        });
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery != null) {
      searchUser(searchQuery);
      setAllUsers(null);
      router.push({
        pathname: '/users',
        query: {
          search: searchQuery,
        },
      });
    } else {
      setSearchUsers(null);
      router.push({
        pathname: '/users',
        query: {
          page: 1,
          pageSize: pageSize,
        },
      });
    }
  };

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="page-title">All Users</h1>
        <div className="flex items-center space-x-2">
          <div className="hidden lg:flex items-center border-[1px] rounded-lg h-full">
            <div className="bg-indigo-700 h-full p-2 flex justify-center items-center rounded-tl-lg rounded-bl-lg text-white">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              type="text"
              value={searchQuery || ''}
              onChange={handleSearchQueryChange}
              placeholder="Search any user"
              className="rounded-tr-lg rounded-br-lg px-1.5 py-0.5 bg-indigo-100 h-full italic placeholder:text-black placeholder:italic placeholder:text-sm text-sm"
            />
          </div>
          <AddNewUser />
        </div>
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-7 gap-2 mt-5 bg-indigo-50 text-indigo-500 font-bold text-sm sm:text-lg py-2.5 rounded-md select-none">
        <span className="col-span-1 text-center">#</span>
        <span className="col-span-3 sm:col-span-2 text-center">
          name surname
        </span>
        <span className="hidden sm:col-span-2 sm:block text-center">email</span>
        <span className="col-span-2 text-center">actions</span>
      </div>
      {!router.query.search &&
        currentPage > 0 &&
        allUsers?.users &&
        Object.keys(allUsers.users).map((userId) => (
          <UserCard
            key={userId}
            user={allUsers.users[userId]}
          />
        ))}
      {searchQuery &&
        searchUsers?.users &&
        Object.keys(searchUsers.users).map((userId) => (
          <UserCard
            key={userId}
            user={searchUsers.users[userId]}
          />
        ))}
      {currentPage > 0 && (
        <div className="flex items-center justify-center md:justify-end space-x-4 mt-5 w-full bg-slate-50 py-2 px-2 rounded-lg text-sm md:text-base">
          {!searchQuery && (
            <>
              <div>
                <span className="mr-2">Row Count:</span>
                <select
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  value={pageSize}
                  className="bg-slate-50"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="7">7</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
              </div>
              <span>
                {pageSize * currentPage - pageSize + 1} -{' '}
                {currentPage * pageSize} out of {allUsers?.total} results
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePageDownChange}
                  disabled={currentPage === 1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  onClick={handlePageUpChange}
                  disabled={
                    allUsers?.limit + allUsers?.skip === allUsers?.total
                  }
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </>
          )}
          {searchQuery && searchUsers?.total && (
            <span className="">
              {searchQuery && searchUsers?.total ? searchUsers.total : '0'}{' '}
              results
            </span>
          )}
        </div>
      )}
    </main>
  );
};

export default Users;
