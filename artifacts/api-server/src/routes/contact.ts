import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { db, contactSubmissionsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact", async (req, res, next) => {
  try {
    const parsed = SubmitContactBody.safeParse(req.body);
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
      .insert(contactSubmissionsTable)
      .values(parsed.data)
      .returning();

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

export default router;
