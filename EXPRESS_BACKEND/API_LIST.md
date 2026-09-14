# API Documentation

This file keeps track of all the created APIs for the backend.

## 1. Health Check
- **Endpoint**: `GET /`
- **Description**: Verifies if the backend server is running successfully.
- **Access**: Public
- **Response**:
  ```json
  {
    "success": true,
    "message": "Backend API is running successfully."
  }
  ```

---

## 2. File Upload
- **Endpoint**: `POST /api/v1/public/upload`
- **Description**: Uploads a `.csv` or `.pdf` file to the server. The file is saved in the `src/uploads` directory.
- **Access**: Public
- **Request Format**: `multipart/form-data`
  - **Key**: `file` (The file to be uploaded. Max size: 10MB)
- **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "File uploaded successfully",
    "sessionId": "a1b2c3d4e5f6g7h8i9j0",
    "file": {
      "fieldname": "file",
      "originalname": "document.pdf",
      "encoding": "7bit",
      "mimetype": "application/pdf",
      "destination": "src/uploads/",
      "filename": "temp-file-1691234567890.pdf",
      "path": "src\\uploads\\temp-file-1691234567890.pdf",
      "size": 1048576
    }
  }
  ```
- **Error Response (400)**:
  ```json
  {
    "success": false,
    "message": "Error: Only .csv and .pdf files are allowed!" 
  }
  ```
  *(or "No file uploaded")*

---

## 3. View Uploaded Files
- **Endpoint**: `GET /uploads/<filename>`
- **Description**: A static endpoint to view or download a file that was uploaded to the server.
- **Access**: Public
- **Example**: `http://localhost:5000/uploads/temp-file-1691234567890.pdf`

---

## 4. Cancel Upload Session
- **Endpoint**: `DELETE /api/v1/public/cancel/:sessionId`  
- **Description**: Cancels an upload session by deleting the temporary uploaded file from the server.
- **Access**: Public
- **Success Response (200)**:
  ```json
  {
    "success": true,
    "message": "Session cancelled and file deleted"
  }
  ```
- **Error Response (404)**:
  ```json
  {
    "success": false,
    "message": "Session not found or already cancelled"
  }
  ```

---

## 5. Get Financial Analysis
- **Endpoint**: `GET /api/v1/public/analysis/:sessionId`
- **Description**: Retrieves the parsed and analyzed financial data for the given session.
- **Access**: Public
- **Success Response (200)**:
  ```json
  {
    "success": true,
    "data": {
      "summary": { "totalIncoming": 5000, "totalOutgoing": 2000, "totalTransactions": 15 },
      "pieChartData": [...],
      "graphData": [...],
      "topPlaces": [...],
      "transactions": [...]
    }
  }
  ```
- **Processing Response (202)**:
  *(Returned if the file is still being parsed)*
  ```json
  {
    "success": true,
    "message": "Analysis is still processing, please check back."
  }
  ```
- **Error Response (404)**:
  *(Returned if the session expired, was cleared by the cleanup job, or if the user lost the session ID)*
  ```json
  {
    "success": false,
    "message": "Session is cleared and file is removed. Please upload the file again."
  }
  ```

---

## 6. Frontend Integration Guidelines

When building the frontend dashboard, you should handle these specific scenarios and render the following components based on the `GET /analysis/:sessionId` API data:

### Preventions & Error Handling
- **Lost Sessions**: If the user refreshes the page, returns after a long time, or the server automatically cleans up the session after 1 hour, the API will return the `404` status with the message `"Session is cleared and file is removed. Please upload the file again."`. 
  - **Action**: The frontend should catch this 404 error, clear any local state/storage holding the `sessionId`, and redirect the user back to the upload screen, showing this message as an alert.
- **Processing State**: If the API returns a `202` status, it means a large PDF is still being parsed. 
  - **Action**: Show a loading spinner and poll the endpoint again after a few seconds.

### Required UI Components
Based on the `data` object returned by the analysis endpoint, the frontend should display:
1. **Summary Cards**: Display `data.summary.totalIncoming`, `data.summary.totalOutgoing`, and `data.summary.totalTransactions` at the top of the dashboard.
2. **Timeline Chart (Bar/Line)**: Use `data.graphData` to plot `incoming` vs `outgoing` amounts over `date` (chronological timeline).
3. **Pie Chart**: Use `data.pieChartData` to show the overall split between Incoming and Outgoing transactions.
4. **Top UPIs / Most Repeated Places List**: Render `data.topPlaces` as a leaderboard or table, showing the `upiId`, the `count` of transactions, and the `totalAmount` spent there.
5. **Detailed Transaction Table**: Render `data.transactions` in a paginated table showing `date`, `description`, `amount`, `type`, and `upiId`.
