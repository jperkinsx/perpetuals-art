import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for Perpetuals
  
  // Get current epoch info
  app.get("/api/epoch/current", async (req, res) => {
    try {
      const epoch = await storage.getCurrentEpoch();
      res.json(epoch);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch epoch" });
    }
  });

  // Get auction status
  app.get("/api/auction/status", async (req, res) => {
    try {
      const auction = await storage.getAuctionStatus();
      res.json(auction);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch auction status" });
    }
  });

  // Get vault metrics
  app.get("/api/vault/metrics", async (req, res) => {
    try {
      const metrics = await storage.getVaultMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vault metrics" });
    }
  });

  // Get sentinel data
  app.get("/api/sentinel/data", async (req, res) => {
    try {
      const data = await storage.getSentinelData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sentinel data" });
    }
  });

  // Get collection
  app.get("/api/collection", async (req, res) => {
    try {
      const collection = await storage.getCollection();
      res.json(collection);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch collection" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
