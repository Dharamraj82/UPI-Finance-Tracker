import express from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { uploadSessions } from "../../utils/sessionStore.js";
import { parseCSV } from "../../utils/csvParser.js";
import { parsePDF } from "../../utils/pdfParser.js";
import { analyzeTransactions } from "../../utils/financeAnalyzer.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, "temp-" + file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (ext === '.csv' || ext === '.pdf') {
    return cb(null, true);
  } else {
    cb(new Error("Error: Only .csv and .pdf files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter,
});

router.post("/", (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    try {
      let transactions = [];
      if (ext === '.csv') {
        transactions = await parseCSV(filePath);
      } else if (ext === '.pdf') {
        transactions = await parsePDF(filePath);
      }

      if (!transactions || transactions.length === 0) {
        // Validation failed: Not a recognized bank statement
        fs.unlinkSync(filePath);
        return res.status(400).json({ 
          success: false, 
          message: "Invalid file format. Does not appear to be a supported UPI Transaction Report or Bank Statement." 
        });
      }

      const platform = req.body.platform || 'Unknown';
      const analysis = analyzeTransactions(transactions, platform);
      const sessionId = crypto.randomBytes(10).toString("hex");

      uploadSessions.set(sessionId, {
        filePath,
        uploadedAt: Date.now(),
        status: 'completed',
        analysis: analysis
      });

      res.status(200).json({
        success: true,
        message: "File uploaded and analyzed successfully",
        sessionId: sessionId,
        file: req.file,
      });

    } catch (parseErr) {
      console.error("Error parsing file:", parseErr);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.error("Failed to cleanup file after parse error:", unlinkErr);
        }
      }

      const errorMessage = parseErr.message || parseErr.toString();
      
      // Check if it's a password-protected PDF error
      if (errorMessage.toLowerCase().includes('password') || errorMessage.toLowerCase().includes('encrypted')) {
        return res.status(400).json({ 
          success: false, 
          message: "This PDF is password-protected. Please remove the password before uploading."
        });
      }

      return res.status(500).json({ 
        success: false, 
        message: "Error analyzing the file. Please ensure it is a valid UPI Transaction Report or Bank Statement.",
        errorDetail: errorMessage
      });
    }
  });
});

export default router;
