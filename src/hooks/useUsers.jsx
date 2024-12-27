import { useQuery } from "@tanstack/react-query";
import { retrieveUsers } from "../api/api";

const useUsers = (params) => { 
    return  useQuery({
        queryKey: ['users', params],
        queryFn: retrieveUsers,  
        retry: 3,
        refetchOnWindowFocus: true,
    })
};

export default useUsers;
