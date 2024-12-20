import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UsersTable from '../components/UsersTable';
import FloatingActionButton from '../components/FloatingActionButton';


const Users = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false)
    return (
    <>
        <Breadcrumb pageName="Users" />

        <div className="flex flex-col gap-10">

            <UsersTable />
            <FloatingActionButton onClick={handleOpenModal} />
        </div>
   
    </>
    );
};

export default Users;
    