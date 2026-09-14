import express from "express";
import fs from "fs";
import uploadRoutes from "./uploadRoutes.js";
import { uploadSessions, clearSession } from "../../utils/sessionStore.js";

const router = express.Router();

router.use("/public/upload", uploadRoutes);

// Endpoint to cancel/delete the uploaded file session
router.delete("/public/cancel/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  
  const session = uploadSessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ success: false, message: "Session not found or already cancelled" });
  }

  // Delete the file
  fs.unlink(session.filePath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error("Error deleting file:", err);
      return res.status(500).json({ success: false, message: "Failed to delete file" });
    }
    
    // Remove session
    clearSession(sessionId);
    
    res.status(200).json({ success: true, message: "Session cancelled and file deleted" });
  });
});

// Endpoint to get the analysis of the session
router.get("/public/analysis/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  
  const session = uploadSessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ success: false, message: "Session is cleared and file is removed. Please upload the file again." });
  }

  if (session.status === 'parsing') {
    return res.status(202).json({ success: true, message: "Analysis is still processing, please check back." });
  }

  if (session.status === 'error') {
    return res.status(500).json({ success: false, message: "Analysis failed", error: session.error });
  }

  res.status(200).json({
    success: true,
    data: session.analysis
  });
});

export default router;
