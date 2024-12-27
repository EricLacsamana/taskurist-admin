import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import JobOrdersTable from '../components/JobOrdersTable';
import { JobOrderModal } from '../components/Modals/JobOrderModal';
import FloatingActionButton from '../components/FloatingActionButton';
import { useNavigate, useParams } from 'react-router-dom';
import useJobOrders from '../hooks/useJobOrders';


const JobOrders = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useJobOrders();
    const jobOrders = data?.data;

    const handleOpenModal = () => setIsOpen(true);

    const handleCloseModal = () => {
        navigate('/job-orders');
        setIsOpen(false);
    }

    useEffect(()=> {
        if (id) {
            setIsOpen(true);
        }
    },[id])

    return (
    <>
        <Breadcrumb pageName="Job Orders" />

        <div className="flex flex-col gap-10">
            <JobOrdersTable data={jobOrders} />
            <FloatingActionButton onClick={handleOpenModal} />
            <JobOrderModal jobOrderId={id} isOpen={isOpen} onClose={handleCloseModal} />
        </div>
   
    </>
    );
};

export default JobOrders;
    