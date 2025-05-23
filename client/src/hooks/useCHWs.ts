import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

interface CHW {
    id: string;
    name: string;
}

export const useCHWs = () => {
    return useQuery<CHW[]>({
        queryKey: ['chws'],
        queryFn: async () => {
            const response = await api.get('/users/chws');
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes cache
    });
};