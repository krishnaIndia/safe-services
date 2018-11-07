import { Router } from "express";
import Subscription from "../controllers/subscription.controller";
import AppConfig from '../config/app';
import Credentials from "../config/cred";

const apiKey = Credentials.mailChimpApiKey;

if (!apiKey) {
  console.error('API KEY not found');
  process.exit(1);
}

const router = Router();

// Authorise request origin
const checkOriginMiddleware = (req, res, next) => {
	const origin = req.headers['origin'];
	if (!origin || !AppConfig.getListId(origin)) {
		return res.status(403).send(`Forbidden`);
	}
	next();
};

const subscription = new Subscription(apiKey);
router.post('/subscribe', checkOriginMiddleware, (req, res) => subscription.subscribe(req, res));

export default router;
