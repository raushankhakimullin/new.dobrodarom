import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import donationsRouter from "./donations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(donationsRouter);

export default router;
