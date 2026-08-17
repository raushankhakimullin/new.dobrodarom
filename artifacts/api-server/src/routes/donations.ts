import { Router, type IRouter } from "express";
import { SubmitDonationRequestBody } from "@workspace/api-zod";
import { db, donationRequestsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/donations", async (req, res, next) => {
  try {
    const parsed = SubmitDonationRequestBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "Validation failed",
        details: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const [created] = await db
      .insert(donationRequestsTable)
      .values(parsed.data)
      .returning();

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

export default router;
