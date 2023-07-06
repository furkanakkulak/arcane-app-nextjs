import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Image from 'next/image';
import { AppContext } from '@/context/ContextProvider';

const EditUser = ({ user }) => {
  const { allUsers, searchUsers, setAllUsers, setSearchUsers } =
    useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (open) {
      setIsLoading(true);

      const fetchUser = async (userId) => {
        try {
          const response = await axios.get(
            `https://dummyjson.com/users/${userId}`
          );
          const data = response.data;
          setSelectedUser(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setUsername(data.username);
          setEmail(data.email);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(error);
        }
      };

      fetchUser(user.id);
    }
  }, [open, user.id, setFirstName, setLastName, setUsername, setEmail]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateInformation = async () => {
    try {
      const response = await axios.put(
        `https://dummyjson.com/users/${user.id}`,
        {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
        }
      );
      const data = response.data;
      handleClose();

      // Update the context state variables
      if (allUsers?.users) {
        const updatedAllUsers = { ...allUsers };
        updatedAllUsers.users = updatedAllUsers.users.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
            };
          }
          return u;
        });
        setAllUsers(updatedAllUsers);
      }

      if (searchUsers?.users) {
        const updatedSearchUsers = { ...searchUsers };
        updatedSearchUsers.users = updatedSearchUsers.users.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              firstName: firstName,
              lastName: lastName,
              username: username,
              email: email,
            };
          }
          return u;
        });
        setSearchUsers(updatedSearchUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="flex justify-center items-center bg-indigo-600 text-white rounded-lg h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] hover:bg-indigo-500"
        onClick={handleClickOpen}
      >
        <FontAwesomeIcon
          icon={faPen}
          fontSize={20}
        />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
      >
        {selectedUser && (
          <>
            <DialogTitle>
              {selectedUser.username} bilgilerini düzenle
            </DialogTitle>
            <DialogContent className="w-full">
              <Image
                className="mx-auto"
                src={selectedUser.image}
                width={100}
                height={100}
                alt={selectedUser.username}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <TextField
                  label="First Name"
                  variant="standard"
                  className="w-full col-span-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Last Name"
                  variant="standard"
                  className="w-full col-span-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  label="Username"
                  variant="standard"
                  className="w-full col-span-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Email address"
                  variant="standard"
                  className="w-full col-span-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={updateInformation}>Save</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default EditUser;
