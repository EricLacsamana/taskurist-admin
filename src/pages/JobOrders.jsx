import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import JobOrdersTable from '../components/JobOrdersTable';
import { JobOrderModal } from '../components/Modals/JobOrderModal';
import FloatingActionButton from '../components/FloatingActionButton';
import { useQuery } from '@tanstack/react-query';
import { retrieveJobOrders } from '../api/api';


const JobOrders = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false)

    // Use useQuery with the new object syntax
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['job-orders'],  // Query key should be an array (unique identifier)
        queryFn: retrieveJobOrders,  // Fetch function (previously the second argument)
        // Additional configuration options
        retry: 3,  // Optional: retry failed requests up to 3 times
        refetchOnWindowFocus: true,  // Optional: Automatically refetch when window regains focus
    });
    const jobOrders = data?.data;

    console.log('tesss', jobOrders);
    // console.log('dataaaa job', data);
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (isError) {
    //     return <div>Error: {error.message}</div>;
    // }

        
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
    