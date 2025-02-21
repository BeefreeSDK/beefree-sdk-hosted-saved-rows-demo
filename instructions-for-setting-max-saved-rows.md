# Instructions for Hosted Saved Rows Integration

## Overview
This project integrates the Beefree SDK to allow users to create, edit, and save email rows within a web-based editor. Saved rows are tracked and managed via a backend server built with Express and SQLite, hosted on Glitch. View what the final result looks like in the following video. [Click here to view the file](https://drive.google.com/file/d/168-wCclvrP6YykwCSBQtezYmdy4L64A9/view?usp=drive_link).

## Functionality in Place

### 1. **Frontend (HTML & JavaScript)**
The frontend provides the following capabilities:
- **Load and Edit Templates:** Users can load an email template from a file and edit it using the Beefree editor.
- **Hosted Save Rows:** Users can save rows, with a restriction on how many rows they can store.
- **Track Changes:** The application logs changes and updates the backend when a row is added or deleted.
- **Display Remaining Rows:** A modal alerts users about their remaining available row slots.
- **Restrict Saving Beyond Limit:** Users exceeding their row limit are prevented from saving additional rows.

#### Key JavaScript Components:
- **Request Handling (`request` function):** Makes HTTP requests to the backend for fetching and saving rows.
- **Row Save Handler (`contentDialog.saveRow.handler`)**
  - Checks the backend for the number of saved rows.
  - Allows saving if the limit is not exceeded.
  - Displays an alert and blocks saving when the limit is reached.
- **Automatic Reload (`reloadBeePlugin`)**
  - If the row limit is reached, the SDK is reloaded with `saveRows` disabled to prevent further saves.

### 2. **Backend (server.js - Express & SQLite)**
The backend server provides:
- **Row Tracking:**
  - Stores saved rows in an SQLite database.
  - Logs additions and deletions with metadata.
- **Endpoints for Row Management:**
  - `POST /confirmation-row-saved/:uid` - Logs row saves or deletions.
  - `GET /saved-rows/:uid` - Retrieves the list of saved rows for a specific user.
- **CORS & JSON Parsing:** Supports cross-origin requests and handles JSON data processing.

### 3. **Glitch Hosting**
Glitch provides a temporary online environment for running the backend. It enables:
- Easy access to the API endpoints.
- A dynamic SQLite database for tracking rows.

## How to Add a Restriction on Saved Rows
To modify the project to enforce a maximum number of hosted saved rows per user, follow these steps:

### **1. Modify the Frontend (JavaScript)**
- Locate `var maxSavedRows = uid === "Admin" ? 5 : 0;` in the frontend code.
- Modify this variable based on user roles or individual limits.
- Ensure that the `contentDialog.saveRow.handler` function checks `savedRowsCount` against `maxSavedRows` before allowing a save.

### **2. Update the Backend to Enforce Limits**
- Modify `POST /confirmation-row-saved/:uid` in `server.js` to count the number of saved rows before inserting a new one:
  ```javascript
  db.get("SELECT COUNT(*) AS count FROM saved_rows WHERE uid = ?", [uid], (err, row) => {
    if (err) {
      console.error("Error checking row count:", err);
      return res.status(500).json({ error: err.message });
    }
    if (row.count >= 5) {
      return res.status(400).json({ error: "Maximum saved row limit reached." });
    }
    const stmt = db.prepare("INSERT INTO saved_rows (uid, data, action) VALUES (?, ?, ?)");
    stmt.run(uid, data, action, function (err) {
      if (err) {
        console.error("Error saving row:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
    stmt.finalize();
  });
  ```

### **3. Testing the Restriction**
- Try saving more than 5 rows as an Admin and verify that it blocks the save.
- Check the modal message updates correctly when nearing the limit.

## Conclusion
This setup allows users to save hosted rows with a limit enforced both on the frontend and backend. Any modifications should ensure that both layers of the application properly check and enforce the restriction to prevent excess saves.

