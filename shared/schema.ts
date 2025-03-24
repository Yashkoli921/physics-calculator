import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  createdAt: text("created_at").notNull(),
});

export const userCalculations = pgTable("user_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  calculationType: text("calculation_type").notNull(),
  inputData: text("input_data").notNull(),
  result: text("result").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  displayName: true,
});

export const insertCalculationSchema = createInsertSchema(userCalculations).pick({
  userId: true,
  calculationType: true,
  inputData: true,
  result: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type UserCalculation = typeof userCalculations.$inferSelect;
