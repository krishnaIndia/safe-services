import { Express } from "express";
import SubscriptionRoutes from './subscription.routes';

const router = (app: Express) => {
	app.use('/api/', SubscriptionRoutes);
	app.use('/api/1.0', SubscriptionRoutes);
};

export default router;
