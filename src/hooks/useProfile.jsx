import { useQuery } from "@tanstack/react-query";
import { retrieveUserProfile } from "../api/api";

const useProfile = (params) => { 
    return useQuery({
        queryKey: ['me', params],
        queryFn: retrieveUserProfile,  
        retry: 3,
        refetchOnWindowFocus: true,
    })
};

export default useProfile;
