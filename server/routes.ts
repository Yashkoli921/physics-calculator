import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertCalculationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Get user calculations
  app.get("/api/calculations", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }
    
    try {
      const userId = req.user!.id;
      const calculations = await storage.getUserCalculations(userId);
      res.json(calculations);
    } catch (err) {
      console.error("Error fetching calculations:", err);
      res.status(500).json({ message: "Error fetching calculations" });
    }
  });

  // Save calculation
  app.post("/api/calculations", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const userId = req.user!.id;
      const validatedData = insertCalculationSchema.parse({
        ...req.body,
        userId,
      });
      
      const calculation = await storage.saveCalculation({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });
      
      res.status(201).json(calculation);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid calculation data", 
          errors: err.errors 
        });
      }
      
      console.error("Error saving calculation:", err);
      res.status(500).json({ message: "Error saving calculation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
