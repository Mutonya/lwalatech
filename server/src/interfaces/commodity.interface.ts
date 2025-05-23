export interface Commodity {
    id: number;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CommodityRequest {
    id: number;
    chwId: string;
    chaId: string;
    commodityId: number;
    quantity: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'chw' | 'cha';
    supervisorId?: string; // Only for CHWs
}