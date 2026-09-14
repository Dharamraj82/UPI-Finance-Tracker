import fs from 'fs';
import path from 'path';

export const uploadSessions = new Map();

// Clear orphaned files in uploads directory on server startup
const uploadsDir = path.resolve("src/uploads");
if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir);
  for (const file of files) {
    if (file !== '.gitkeep') { // Optional: ignore .gitkeep if present
      try {
        fs.unlinkSync(path.join(uploadsDir, file));
      } catch (err) {
        console.error("Failed to delete orphaned file on startup:", err);
      }
    }
  }
}

// Helper to clean up memory
export const clearSession = (sessionId) => {
  uploadSessions.delete(sessionId);
};

// Cleanup job: runs every 30 minutes to clean up stale sessions (older than 1 hour)
const CLEANUP_INTERVAL = 30 * 60 * 1000;
const SESSION_TIMEOUT = 60 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of uploadSessions.entries()) {
    if (now - session.uploadedAt > SESSION_TIMEOUT) {
      fs.unlink(session.filePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error(`Failed to delete expired file for session ${sessionId}:`, err);
        }
      });
      clearSession(sessionId);
      console.log(`Cleaned up expired session: ${sessionId}`);
    }
  }
}, CLEANUP_INTERVAL);
