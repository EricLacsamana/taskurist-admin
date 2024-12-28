import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import JobOrdersTable from '../components/JobOrdersTable';
import { JobOrderModal } from '../components/Modals/JobOrderModal';
import FloatingActionButton from '../components/FloatingActionButton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useJobOrders from '../hooks/useJobOrders';
import useProfile from '../hooks/useProfile';
import ConfirmationModal from '../components/Modals/ConfirmationModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobOrder } from '../api/api';
import { useDispatch } from 'react-redux';
import { addToast } from '../store/toastSlice';


const JobOrders = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { id } = useParams();
    const location = useLocation();
    const { data: user = {}} = useProfile();
    const { data: jobOrders = [] } = useJobOrders();

    const [isJobOrderModalOpen, setIsJobOrderModalOpen] = useState(false);

    const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);

    const { mutate } = useMutation({
        mutationFn: deleteJobOrder,
        onSuccess: () => {
            queryClient.invalidateQueries(['job-orders']);
            dispatch(addToast({ message:  'Job Order deleted', type: 'success' }));
        },
        onError: (error) => {
            dispatch(addToast({ message:  error.reponse?.data?.message, type: 'danger' }));
        },
    });
    const handleOpenModal = () => setIsJobOrderModalOpen(true);

    const handleCloseDeleteConfirmationModal = ()=> setIsDeleteConfirmationModalOpen(false);
  
    const handleCloseJobOrderModal = () => {
        navigate('/job-orders');
        setIsJobOrderModalOpen(false);
    }

    const handleDeleteJobOrder = () => {
        mutate(id);
        navigate('/job-orders');
    }


    useEffect(() => {
        // Check if the current path ends with '/delete'
        if (location.pathname.endsWith('/delete')) {
            setIsDeleteConfirmationModalOpen(true);
            setIsJobOrderModalOpen(false);  // Close Job Order Modal
        } else if (id) {
            // Open the Job Order Modal if there's an id but no '/delete'
            setIsJobOrderModalOpen(true);
            setIsDeleteConfirmationModalOpen(false);  // Close Delete Confirmation Modal
        } else {
            // Reset both modals if the path is not recognized
            setIsJobOrderModalOpen(false);
            setIsDeleteConfirmationModalOpen(false);
        }
    }, [location.pathname, id]);


    return (
    <>
        <Breadcrumb pageName="Job Orders" />

        <div className="flex flex-col gap-10">
            <JobOrdersTable data={jobOrders} />
            {user?.role === 'admin' && <FloatingActionButton onClick={handleOpenModal} />}
            <JobOrderModal jobOrderId={id} isOpen={isJobOrderModalOpen} onClose={handleCloseJobOrderModal} />
            <ConfirmationModal 
                isOpen={isDeleteConfirmationModalOpen}
                onClose={handleCloseDeleteConfirmationModal}
                message="Are you sure you want to delete this job order? This action cannot be undone."
                onConfirm={handleDeleteJobOrder}
                />
        </div>
   
    </>
    );
};

export default JobOrders;
    