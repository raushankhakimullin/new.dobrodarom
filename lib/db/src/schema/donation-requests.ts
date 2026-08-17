import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const donationRequestsTable = pgTable("donation_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  // Amount in rubles (whole units)
  amount: integer("amount").notNull(),
  // "one_time" | "monthly"
  frequency: text("frequency").notNull().default("one_time"),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDonationRequestSchema = createInsertSchema(
  donationRequestsTable,
).omit({ id: true, createdAt: true });

export type InsertDonationRequest = z.infer<typeof insertDonationRequestSchema>;
export type DonationRequest = typeof donationRequestsTable.$inferSelect;
