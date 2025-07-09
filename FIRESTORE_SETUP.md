# Firestore Index Setup Instructions

Your app requires composite indexes in Firestore to work properly. Here are two ways to set them up:

## Option 1: Automatic Setup (Recommended)

1. **Deploy the indexes file:**
   ```bash
   firebase deploy --only firestore:indexes
   ```

2. **Wait for indexes to build** (this can take a few minutes)

## Option 2: Manual Setup via Firebase Console

Click on these links to create the required indexes automatically:

### Index 1: User Sessions (Descending Order)
https://console.firebase.google.com/v1/r/project/focustimer-2501d/firestore/indexes?create_composite=ClZwcm9qZWN0cy9mb2N1c3RpbWVyLTI1MDFkL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9mb2N1c1Nlc3Npb25zL2luZGV4ZXMvXxABGgoKBnVzZXJJZBABGg0KCWNyZWF0ZWRBdBACGgwKCF9fbmFtZV9fEAI

### Index 2: User Sessions with Completion Filter
You'll need to create this manually:
1. Go to [Firestore Console](https://console.firebase.google.com/project/focustimer-2501d/firestore/indexes)
2. Click "Create Index"
3. Collection ID: `focusSessions`
4. Add fields in this order:
   - `userId` (Ascending)
   - `completed` (Ascending) 
   - `createdAt` (Ascending)
5. Click "Create"

## Option 3: Use the Firebase CLI

If you have Firebase CLI installed:

1. **Initialize Firestore (if not done already):**
   ```bash
   firebase init firestore
   ```

2. **Deploy the indexes:**
   ```bash
   firebase deploy --only firestore:indexes
   ```

## Verification

After setting up the indexes:
1. Wait 5-10 minutes for them to build
2. Refresh your app
3. The history page should now load without errors

## Fallback Behavior

The app now includes fallback queries that work even without indexes, but performance will be better with proper indexes in place.