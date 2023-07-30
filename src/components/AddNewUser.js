import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Image from 'next/image';
import { AppContext } from '@/context/ContextProvider';

const AddNewUser = () => {
  const { allUsers, searchUsers, setAllUsers, setSearchUsers } =
    useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('https://robohash.org/autquiaut.png');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addUser = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/users/add', {
        firstName,
        lastName,
        username,
        email,
        image,
      });
      const newUser = response.data;
      if (allUsers?.users) {
        setAllUsers((prevAllUsers) => ({
          ...prevAllUsers,
          users: [newUser, ...prevAllUsers.users],
        }));
      }

      if (searchUsers?.users) {
        setSearchUsers((prevSearchUsers) => ({
          ...prevSearchUsers,
          users: [newUser, ...prevSearchUsers.users],
          total: searchUsers.total + 1,
        }));
      }
      setFirstName('');
      setLastName('');
      setUsername('');
      setEmail('');
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg"
        onClick={handleClickOpen}
      >
        Add new user
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Image
            className="mx-auto"
            src={image}
            width={100}
            height={100}
            alt={image}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addUser}>Add User</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewUser;
