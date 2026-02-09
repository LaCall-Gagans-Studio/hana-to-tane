# Verification: Reservation Management Improvements

## Overview

I have enhanced the **Reservation Manager** (used in `Column` > "Reservation Settings") to support full management of event attendees.

## Key Changes

- **Add Reservation**: Manual entry of new attendees from the admin panel.
- **Edit Reservation**: Modify details of existing reservations.
- **Delete Reservation**: Remove reservations (with confirmation).
- **Print**: Dedicated print view that hides UI buttons and shows a clean table.
- **Custom Fields Support**: The forms dynamically adapt if you have defined "Additional Questions" in the Column settings.

## Verification Steps (Manual)

### 1. Access the Reservation Manager

1. Go to the **Admin Dashboard** > **Columns** (コラム).
2. Open a Column document that is set as an "Event" or has "Reservation Settings" enabled.
3. Scroll down to "Reservation Settings" and look for the **Reservation Manager** panel.

### 2. Test "Add Reservation"

1. Click the blue **"予約を追加 (+ Add)"** button.
2. Fill in the modal form.
   - If you added custom questions in the settings, they should appear here.
3. Click **Save**.
4. Verify the new user appears in the table immediately.

### 3. Test "Edit Reservation"

1. Click the **Pencil Icon** (Edit) on any row.
2. Chang the name or email.
3. Click **Save**.
4. Verify the change is reflected in the table.

### 4. Test "Print"

1. Click the **"印刷 (Print)"** button.
2. The browser print dialog should open.
3. **Check the Preview**:
   - The "Add/Print" buttons should be **hidden**.
   - Except for the table, unnecessary UI elements should be hidden (depending on browser print styles).
   - A timestamp "出力日時" should appear at the bottom right.

### 5. Test "Delete"

1. Click the **Trash Icon** (Delete) on a row.
2. Confirm the browser alert dialog.
3. Verify the row is removed from the table.
