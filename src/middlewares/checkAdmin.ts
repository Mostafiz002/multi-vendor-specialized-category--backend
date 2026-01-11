import { Request, Response, NextFunction } from "express";
import { prisma } from "../shared/prisma"; 

const checkAdmin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware hit");
    try {
      const userId = req.headers["user-id"] as string;
      console.log("User ID from header:", userId);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: user id missing",
        });
      }

      console.log("Finding user in DB...");
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, role: true },
      });

      console.log("User found:", user);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: user not found",
        });
      }

      if (user.role !== "ADMIN") {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: admin access only",
        });
      }

      req.user = user;
      console.log("Middleware finished, calling next()");
      next();
    } catch (error) {
      console.error("Error in checkAdmin:", error);
      next(error);
    }
  };
};


export default checkAdmin;
