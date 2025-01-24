import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import { useThunk } from '../hooks/useThunk';


function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doCreateUsers, isLoadingCreate, loadingCreateError] = useThunk(addUser)
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => { doFetchUsers() }, [doFetchUsers]);

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>
  } else {
    content = data.map((user) => {
      return (
        <div key={user.id} className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            {user.name}
          </div>
        </div>
      );
    });
  };

  return <div>
      <div className="flex flex-row justify-between item-center m-3">
        <h1 className='m-2 text-xl'>Users</h1>
        {
          isLoadingCreate ? 'Creating user...' :
            <Button loading={isLoadingCreate} onClick={doCreateUsers}>+ Add User</Button>
        }
        {loadingCreateError && 'Error creating user...'}
      </div>
      {content}
    </div>;
  }

  export default UsersList;
