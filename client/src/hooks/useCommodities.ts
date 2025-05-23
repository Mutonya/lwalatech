
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getCommodities,
    createCommodity,
    createRequest,
    getRequestsByCHA,
    updateRequestStatus,
    getDashboardData,
} from '../api/api';
import type {
    Commodity,
    CommodityRequest,
    DashboardData
} from '../interfaces/commodity';

export const QueryKeys = {
    commodities: ['commodities'] as const,
    requests: (chaId: string) => ['requests', chaId] as const,
    dashboard: ['dashboard'] as const,
};

export const useCommodities = () => {
    return useQuery<Commodity[]>({
        queryKey: QueryKeys.commodities,
        queryFn: getCommodities,
    });
};

export const useCreateCommodity = () => {
    const queryClient = useQueryClient();
    return useMutation<Commodity, Error, { name: string; description?: string }>({
        mutationFn: createCommodity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QueryKeys.commodities });
        },
    });
};

export const useCreateRequest = () => {
    const queryClient = useQueryClient();
    return useMutation<CommodityRequest, Error, {
        chwId: string;
        commodityId: number;
        quantity: number
    }>({
        mutationFn: createRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requests'] });
            queryClient.invalidateQueries({ queryKey: QueryKeys.dashboard });
        },
    });
};

export const useRequestsByCHA = (chaId: string) => {
    return useQuery<CommodityRequest[]>({
        queryKey: QueryKeys.requests(chaId),
        queryFn: () => getRequestsByCHA(chaId),
        enabled: !!chaId,
    });
};

export const useUpdateRequestStatus = () => {
    const queryClient = useQueryClient();
    return useMutation<CommodityRequest, Error, {
        requestId: number;
        status: 'approved' | 'rejected';
    }>({
        mutationFn: updateRequestStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['requests'] });
            queryClient.invalidateQueries({ queryKey: QueryKeys.dashboard });
        },
    });
};

export const useDashboardData = () => {
    return useQuery<DashboardData>({
        queryKey: QueryKeys.dashboard,
        queryFn: getDashboardData,
    });
};