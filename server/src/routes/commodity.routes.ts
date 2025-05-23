import { Router, Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import commodityController from '../controllers/commodity.controller';

const router = Router();

// Commodity routes
router.get('/commodities',
    (req: Request, res: Response, next: NextFunction) =>
        commodityController.getAllCommodities(req, res).catch(next)
);

router.post(
    '/commodities',
    [body('name').notEmpty(), body('description').optional()],
    (req: Request, res: Response, next: NextFunction) =>
        commodityController.createCommodity(req, res).catch(next)
);

// Request routes
router.post(
    '/requests',
    [
        body('chwId').notEmpty(),
        body('commodityId').isInt(),
        body('quantity').isInt({ min: 1, max: 100 }),
    ],
    (req: Request, res: Response, next: NextFunction) =>
        commodityController.createRequest(req, res).catch(next)
);

router.get(
    '/requests/cha/:chaId',
    [param('chaId').notEmpty()],
    (req: Request, res: Response, next: NextFunction) =>
        commodityController.getRequestsByCHA(req, res).catch(next)
);

router.put(
    '/requests/:requestId/status',
    [
        param('requestId').isInt(),
        body('status').isIn(['approved', 'rejected']),
    ],
    (req: Request, res: Response, next: NextFunction) =>
        commodityController.updateRequestStatus(req, res).catch(next)
);

// Dashboard route
router.get('/dashboard',
    (req: Request, res: Response, next: NextFunction) =>
        commodityController.getDashboardData(req, res).catch(next)
);
router.get('/users/chws', commodityController.getCHWs);
export default router;