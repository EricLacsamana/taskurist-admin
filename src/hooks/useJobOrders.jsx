import { useQuery } from '@tanstack/react-query';
import { retrieveJobOrders } from '../api/api';


const useJobOrders = (params) => {
    return useQuery({
        queryKey: ['job-orders', params],
        queryFn: retrieveJobOrders,
        retry: 3,
        refetchOnWindowFocus: true,
    });
};

export default useJobOrders;
