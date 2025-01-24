import React from 'react'
import { removeUser } from '../store'
import { useThunk } from '../hooks/useThunk'
import Button from './Button';
import { GoTrash } from 'react-icons/go';
import { ExpandablePanel } from './ExpandablePanel';

export const UsersListItem = ({ user }) => {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);
    const handleClick = () => {
        doRemoveUser(user);
    }
    const header = <>
        <Button className='mr-3' loading={isLoading} onClick={handleClick}>
            <GoTrash />
        </Button>
        {error && <div className="text-red-500">{error.message}</div>}
        {user.name}
    </>
    return (
        <ExpandablePanel header={header}>
            CONTENT
        </ExpandablePanel>
    )
}
