import { Commodity } from '../models/commodity.model';
import { CommodityRequest } from '../models/commodityRequest.model';
import { User } from '../models/user.model';
import sequelize from '../config/database.config';
import { Op } from 'sequelize';

class CommodityService {
    async getAllCommodities(): Promise<Commodity[]> {
        return Commodity.findAll();
    }

    async createCommodity(name: string, description?: string): Promise<Commodity> {
        return Commodity.create({
            name,
            description: description || null
        });
    }

    async createRequest(
        chwId: string,
        commodityId: number,
        quantity: number
    ): Promise<CommodityRequest> {
        // Validate inputs
        console.log('Starting request creation with:', { chwId, commodityId, quantity });

        // 1. Validate CHW exists (case-sensitive exact match)
        const chw = await User.findOne({
            where: {
                id: chwId,
                role: 'chw'
            },
            logging: (sql) => console.log('CHW Query:', sql) // Log the SQL query
        });

        if (!chw) {
            // Debug: List all CHWs in database
            const allCHWs = await User.findAll({
                where: { role: 'chw' },
                attributes: ['id', 'name', 'email'],
                logging: console.log
            });

            console.log('Existing CHWs in database:', allCHWs.map(u => ({
                id: u.id,
                name: u.name,
                email: u.email
            })));

            throw new Error(`Invalid CHW ID: ${chwId}. Valid CHWs: ${allCHWs.map(u => u.id).join(', ')}`);
        }

        // 2. Validate supervisor exists
        if (!chw.supervisorId) {
            throw new Error(`CHW ${chwId} has no supervisor assigned`);
        }

        const supervisor = await User.findByPk(chw.supervisorId);
        if (!supervisor || supervisor.role !== 'cha') {
            throw new Error(`Invalid supervisor (${chw.supervisorId}) for CHW ${chwId}`);
        }

        const commodity = await Commodity.findByPk(commodityId);
        if (!commodity) {
            throw new Error(`Commodity with ID ${commodityId} not found`);
        }

        if (quantity <= 0 || quantity > 100) {
            throw new Error('Quantity must be between 1 and 100');
        }

        // Check daily limit
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingRequest = await CommodityRequest.findOne({
            where: {
                chwId,
                commodityId,
                createdAt: { [Op.gte]: today },
            },
        });

        if (existingRequest) {
            throw new Error('Only one request per commodity per day is allowed');
        }

        // Check monthly limit
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const monthlyRequests = await CommodityRequest.findAll({
            where: {
                chwId,
                commodityId,
                createdAt: { [Op.gte]: startOfMonth },
            },
        });

        const monthlyQuantity = monthlyRequests.reduce(
            (sum, req) => sum + req.quantity, 0
        );

        if (monthlyQuantity + quantity > 200) {
            throw new Error('Monthly limit of 200 units per commodity exceeded');
        }

        // Create the request
        return CommodityRequest.create({
            chwId,
            chaId: chw.supervisorId,
            commodityId,
            quantity,
            status: 'pending',
        });
    }


    async getRequestsByCHA(chaId: string): Promise<CommodityRequest[]> {
        return CommodityRequest.findAll({
            where: { chaId },
            include: [
                { model: User, as: 'chw' },
                { model: Commodity },
            ],
        });
    }

    async updateRequestStatus(
        requestId: number,
        status: 'approved' | 'rejected'
    ): Promise<CommodityRequest> {
        const request = await CommodityRequest.findByPk(requestId);
        if (!request) {
            throw new Error('Request not found');
        }

        request.status = status;
        await request.save();
        return request;
    }

    async getDashboardData(): Promise<{
        totalRequests: number;
        pendingRequests: number;
        approvedRequests: number;
        rejectedRequests: number;
        commodities: { name: string; requested: number }[];
    }> {
        const totalRequests = await CommodityRequest.count();
        const pendingRequests = await CommodityRequest.count({
            where: { status: 'pending' },
        });
        const approvedRequests = await CommodityRequest.count({
            where: { status: 'approved' },
        });
        const rejectedRequests = await CommodityRequest.count({
            where: { status: 'rejected' },
        });

        const commodities = await Commodity.findAll({
            include: [
                {
                    model: CommodityRequest,
                    attributes: [],
                },
            ],
            attributes: [
                'name',
                [sequelize.fn('COUNT', sequelize.col('requests.id')), 'requested'],
            ],
            group: ['Commodity.id'],
        });

        return {
            totalRequests,
            pendingRequests,
            approvedRequests,
            rejectedRequests,
            commodities: commodities.map((c) => ({
                name: c.name,
                requested: parseInt((c as any).dataValues.requested),
            })),
        };
    }
}

export default new CommodityService();