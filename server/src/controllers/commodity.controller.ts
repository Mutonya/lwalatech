import { Request, Response } from 'express';
import commodityService from '../services/commodity.service';
import { validationResult } from 'express-validator';
import {User} from "../models/user.model";

function isError(error: unknown): error is Error {
    return error instanceof Error;
}

class CommodityController {
    async getAllCommodities(req: Request, res: Response): Promise<void> {
        try {
            const commodities = await commodityService.getAllCommodities();
            res.json(commodities);
        } catch (error: unknown) {
            if (isError(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async createCommodity(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { name, description } = req.body;
            const commodity = await commodityService.createCommodity(name, description);
            res.status(201).json(commodity);
        } catch (error: unknown) {
            if (isError(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async createRequest(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { chwId, commodityId, quantity } = req.body;
            const request = await commodityService.createRequest(
                chwId,
                commodityId,
                quantity
            );
            res.status(201).json(request);
        } catch (error: unknown) {
            if (isError(error)) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async getRequestsByCHA(req: Request, res: Response): Promise<void> {
        try {
            const { chaId } = req.params;
            const requests = await commodityService.getRequestsByCHA(chaId);
            res.json(requests);
        } catch (error: unknown) {
            if (isError(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async updateRequestStatus(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        try {
            const { requestId } = req.params;
            const { status } = req.body;
            const request = await commodityService.updateRequestStatus(
                parseInt(requestId),
                status
            );
            res.json(request);
        } catch (error: unknown) {
            if (isError(error)) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async getDashboardData(req: Request, res: Response): Promise<void> {
        try {
            const data = await commodityService.getDashboardData();
            res.json(data);
        } catch (error: unknown) {
            if (isError(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
    async getCHWs(req: Request, res: Response) {
        try {
            const chws = await User.findAll({
                where: { role: 'chw' },
                attributes: ['id', 'name']
            });
            res.json(chws);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch CHWs' });
        }
    }
}

export default new CommodityController();