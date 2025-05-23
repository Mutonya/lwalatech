export interface Commodity {
    id: number;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CommodityRequest {
    id: number;
    chwId: string;
    chaId: string;
    commodityId: number;
    quantity: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt?: string;
    updatedAt?: string;
    commodity?: Commodity;
    chw?: {
        id: string;
        name: string;
    };
}

export interface DashboardData {
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    commodities: { name: string; requested: number }[];
}
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'chw' | 'cha';
    supervisorId?: string;
}

