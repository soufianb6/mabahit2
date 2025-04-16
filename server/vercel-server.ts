import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { storage } from "./storage";
import path from "path";

// Create Express app for Vercel deployment
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to log API requests
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    const start = Date.now();
    const path = req.path;
    
    let capturedJsonResponse: Record<string, any> | undefined = undefined;
    const originalResJson = res.json;
    
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    });
  }
  
  next();
});

// Initialize routes - for Vercel serverless functions
const registerAllRoutes = async () => {
  await registerRoutes(app);
  
  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // For Vercel deployment, we need to dynamically determine client path location
  const clientDistPath = path.resolve('./client/dist');
  
  // For any non-API request, use client-side routing
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
};

// Initialize the app
registerAllRoutes();

// Export for Vercel
export default app;