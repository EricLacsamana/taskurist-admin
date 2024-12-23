import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UsersTable from '../components/UsersTable';
import FloatingActionButton from '../components/FloatingActionButton';
import { useQuery } from '@tanstack/react-query';
import { retrieveUsers } from '../api/api';


const Users = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false)
        // Use useQuery with the new object syntax
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users'],  // Query key should be an array (unique identifier)
        queryFn: retrieveUsers,  // Fetch function (previously the second argument)
        // Additional configuration options
        retry: 3,  // Optional: retry failed requests up to 3 times
        refetchOnWindowFocus: true,  // Optional: Automatically refetch when window regains focus
    });
    const users = data?.data;

    console.log('users', users);
        
    return (
    <>
        <Breadcrumb pageName="Users" />

        <div className="flex flex-col gap-10">

            <UsersTable data={users} />
            <FloatingActionButton onClick={handleOpenModal} />
        </div>
   
    </>
    );
};

export default Users;
    