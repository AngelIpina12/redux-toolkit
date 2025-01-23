import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';

function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUsers, setIsCreatingUsers] = useState(false);
  const [creatingUsersError, setCreatingUsersError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => setLoadingUsersError(err))
      .finally(() => setIsLoadingUsers(false));
  }, [dispatch]);

  const handleUserAdd = () => {
    setIsCreatingUsers(true);
    dispatch(addUser())
      .unwrap()
      .catch((err) => setCreatingUsersError(err))
      .finally(() => setIsCreatingUsers(false));
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />;
  };

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  };

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return <div>
    <div className="flex flex-row justify-between m-3">
      <h1 className='m-2 text-xl'>Users</h1>
      {
        isCreatingUsers ? 'Creating user...' :
        <Button onClick={handleUserAdd}>+ Add User</Button>
      }
      {creatingUsersError && 'Error creating user...'}
    </div>
    {renderedUsers}
  </div>;
}

export default UsersList;
