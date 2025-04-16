import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Base API route for all endpoints
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category" });
    }
  });

  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles" });
    }
  });

  app.get("/api/articles/latest", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
      const articles = await storage.getLatestArticles(limit);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching latest articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }

      const article = await storage.getArticleById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Error fetching article" });
    }
  });

  app.get("/api/articles/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      const articles = await storage.getArticlesByCategory(categoryId);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles by category" });
    }
  });

  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }

      const articles = await storage.searchArticles(query);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error searching articles" });
    }
  });

  // Serve PDF files for articles
  app.get("/api/pdf/:filename", (req, res) => {
    // Create a sample PDF dynamically
    const pdfContent = `
    %PDF-1.4
    1 0 obj
    << /Type /Catalog
       /Pages 2 0 R
    >>
    endobj
    2 0 obj
    << /Type /Pages
       /Kids [3 0 R]
       /Count 1
    >>
    endobj
    3 0 obj
    << /Type /Page
       /Parent 2 0 R
       /Resources << /Font << /F1 4 0 R >> >>
       /MediaBox [0 0 612 792]
       /Contents 5 0 R
    >>
    endobj
    4 0 obj
    << /Type /Font
       /Subtype /Type1
       /BaseFont /Helvetica
    >>
    endobj
    5 0 obj
    << /Length 68 >>
    stream
    BT
    /F1 24 Tf
    100 700 Td
    (Academic Article - ${req.params.filename}) Tj
    ET
    endstream
    endobj
    xref
    0 6
    0000000000 65535 f
    0000000010 00000 n
    0000000063 00000 n
    0000000126 00000 n
    0000000256 00000 n
    0000000334 00000 n
    trailer
    << /Size 6
       /Root 1 0 R
    >>
    startxref
    453
    %%EOF
    `;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${req.params.filename}`);
    res.send(Buffer.from(pdfContent));
  });

  const httpServer = createServer(app);

  return httpServer;
}
