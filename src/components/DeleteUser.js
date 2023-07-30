import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AppContext } from '@/context/ContextProvider';

const DeleteUser = ({ user }) => {
  const { allUsers, setAllUsers, setSearchUsers, searchUsers } =
    useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`https://dummyjson.com/users/${user.id}`);

      // Remove the user from the context state variables
      if (allUsers?.users) {
        const updatedAllUsers = { ...allUsers };
        updatedAllUsers.users = updatedAllUsers.users.filter(
          (u) => u.id !== user.id
        );
        setAllUsers(updatedAllUsers);
      }

      if (searchUsers?.users) {
        const updatedSearchUsers = { ...searchUsers };
        updatedSearchUsers.users = updatedSearchUsers.users.filter(
          (u) => u.id !== user.id
        );
        updatedSearchUsers.total = updatedSearchUsers.total - 1;
        setSearchUsers(updatedSearchUsers);
      }
    } catch (error) {
      try {
        if (allUsers?.users) {
          const updatedAllUsers = { ...allUsers };
          updatedAllUsers.users = updatedAllUsers.users.filter(
            (u) => u.id !== user.id
          );
          setAllUsers(updatedAllUsers);
        }
        if (searchUsers?.users) {
          const updatedSearchUsers = { ...searchUsers };
          updatedSearchUsers.users = updatedSearchUsers.users.filter(
            (u) => u.id !== user.id
          );
          updatedSearchUsers.total = updatedSearchUsers.total - 1;
          if (updatedSearchUsers.total <= 0) {
            updatedSearchUsers.total = 0;
          }
          setSearchUsers(updatedSearchUsers);
        }
      } catch (error) {
        console.error(error);
      }
      console.error(error);
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <button
        className="flex justify-center items-center bg-red-600 text-white rounded-lg h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] hover:bg-red-500"
        onClick={handleClickOpen}
      >
        <FontAwesomeIcon
          icon={faTrash}
          fontSize={20}
        />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={deleteUser}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
