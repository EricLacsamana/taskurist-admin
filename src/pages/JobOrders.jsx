import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import JobOrdersTable from '../components/JobOrdersTable';
import { JobOrderModal } from '../components/Modals/JobOrderModal';
import FloatingActionButton from '../components/FloatingActionButton';


const JobOrders = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false)
    return (
    <>
        <Breadcrumb pageName="Job Orders" />

        <div className="flex flex-col gap-10">

            <JobOrdersTable />
            <FloatingActionButton onClick={handleOpenModal} />
            <JobOrderModal isOpen={isOpen} onClose={handleCloseModal} />
        </div>
   
    </>
    );
};

export default JobOrders;
    