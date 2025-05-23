// api/api.ts
import axios from 'axios';
import type {
    Commodity,
    CommodityRequest,
    DashboardData
} from '../interfaces/commodity';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getCommodities = async (): Promise<Commodity[]> => {
    const response = await api.get('/commodities');
    return response.data;
};

export const createCommodity = async (
    data: { name: string; description?: string }
): Promise<Commodity> => {
    const response = await api.post('/commodities', data);
    return response.data;
};


export const createRequest = async (
    params: {
        chwId: string;
        commodityId: number;
        quantity: number;
    }
): Promise<CommodityRequest> => {
    const response = await api.post('/requests', params);
    return response.data;
};

export const getRequestsByCHA = async (
    chaId: string
): Promise<CommodityRequest[]> => {
    const response = await api.get(`/requests/cha/${chaId}`);
    return response.data;
};

export const updateRequestStatus = async (
    params: {
        requestId: number;
        status: 'approved' | 'rejected';
    }
): Promise<CommodityRequest> => {
    const response = await api.put(`/requests/${params.requestId}/status`, {
        status: params.status
    });
    return response.data;
};

export const getDashboardData = async (): Promise<DashboardData> => {
    const response = await api.get('/dashboard');
    return response.data;
};

export default api;