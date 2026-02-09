# Event Reservation Management Improvements

## Goal

Enhance the 'Event Reservations' management within PayloadCMS to make it practical.
Specifically, update the `ReservationManager` component (used in `Column` collection) to allow:

1.  **Viewing**: Display reservations in a table (already exists, but will be polished).
2.  **Printing**: Print the reservation list (already exists).
3.  **Adding**: Manually add a new reservation for the event.
4.  **Editing**: Edit existing reservation details.
5.  **Deleting**: Delete a reservation with confirmation.

## User Review Required

- **Confirmation Method**: I will use a standard browser `window.confirm` for delete confirmation to keep it simple and native.
- **Custom Fields**: "Add/Edit" forms will dynamically render fields based on the _saved_ `Column` configuration (via API). If you need to use unsaved changes, let me know (requires more complex UI state handling).

## Proposed Changes

### `src/components/admin`

#### [MODIFY] [ReservationManager.tsx](file:///c:/Users/Tohma/Dev/hana-to-tane/my-app/src/components/admin/ReservationManager.tsx)

- **Add UI State**:
  - `isModalOpen`: boolean
  - `editingReservation`: Reservation | null (if null, it's "Add" mode)
  - `columnSettings`: to store `customFields` schema fetched from `Column`.
- **Add Functions**:
  - `fetchColumnSettings`: Fetch the current column document to get `reservationSettings.customFields`.
  - `handleSave(data)`: POST (create) or PATCH (update) to `/api/reservations`.
  - `handleDelete(id)`: DELETE to `/api/reservations/:id` after confirmation.
- **Update Render**:
  - Add "予約を追加 (Add Reservation)" button.
  - Add "Edit" (pencil icon) and "Delete" (trash icon) buttons to each table row.
  - Implement a `ReservationModal` (inline or sub-component) that renders the form:
    - Standard fields: Name, Email, Phone.
    - Dynamic fields: Render inputs based on `columnSettings.reservationSettings.customFields`.

## Verification Plan

### Manual Verification

1.  **Open Admin Panel**: Go to a "Column" (Event) that has reservations enabled.
2.  **Check Table**: Verify "Reservation Manager" shows the list.
3.  **Add Reservation**:
    - Click "Add".
    - Fill form (including custom fields).
    - Save.
    - Verify list updates.
4.  **Edit Reservation**:
    - Click "Edit" on a row.
    - Change some values.
    - Save.
    - Verify updates reflect in table.
5.  **Delete Reservation**:
    - Click "Delete".
    - Cancel confirmation -> No change.
    - Accept confirmation -> Row disappears.
6.  **Print**: Click Print button and verify the print view looks correct (hides buttons, shows table).
