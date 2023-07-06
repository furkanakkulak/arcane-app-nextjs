import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';

const UserCard = ({ user }) => {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-7 gap-2 mt-5 shadow-md bg-slate-50 font-light tracking-tighter text-lg rounded-md relative select-none">
      <span className="col-span-1 text-center mx-auto">
        <span className="hidden sm:block sm:absolute top-0.5 left-0.5 italic">
          #{user.id}
        </span>
        <Image
          src={user.image}
          alt="User Image"
          width={100}
          height={100}
        />
      </span>

      <span className="col-span-3 sm:col-span-2 text-center flex justify-center items-center">
        {user.firstName + ' ' + user.lastName}
      </span>
      <span className="hidden sm:col-span-2 text-center sm:flex justify-center items-center">
        {user.email}
      </span>
      <span className="col-span-2 text-center flex justify-center items-center gap-x-2">
        <EditUser user={user} />
        <DeleteUser user={user} />
      </span>
    </div>
  );
};

export default UserCard;
