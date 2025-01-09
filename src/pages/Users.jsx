import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UsersTable from '../components/UsersTable';
import FloatingActionButton from '../components/FloatingActionButton';
import useUsers from '../hooks/useUsers';
import { InviteUserModal } from '../components/Modals/InviteUserModal';


const Users = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false)
        // Use useQuery with the new object syntax
    const { data: users, isLoading, isError, error } = useUsers();
        
    return (
    <>
        <Breadcrumb pageName="Users" />

        <div className="flex flex-col gap-10">

            <UsersTable data={users} />
            <FloatingActionButton onClick={handleOpenModal} />
            <InviteUserModal isOpen={isOpen} onClose={handleCloseModal} />
        </div>
   
    </>
    );
};

export default Users;
    