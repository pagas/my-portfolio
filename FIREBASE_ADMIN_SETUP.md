# Firebase Admin SDK Setup Guide 🔐

## **✅ What We've Implemented:**

### **🔧 Proper Authentication Flow:**
1. **Frontend** - Sends Firebase Auth token (not email)
2. **Backend** - Verifies token with Firebase Admin SDK
3. **Security** - Server-side token validation
4. **Author** - Automatically set from verified user

### **📁 New Files Created:**
- `src/lib/firebase-admin.ts` - Firebase Admin SDK configuration
- `src/lib/auth-utils.ts` - Token verification utilities

---

## **🔧 Required Environment Variables:**

Add these to your `.env.local` file:

```bash
# Existing Firebase config
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
```

---

## **🔑 How to Get Firebase Admin Credentials:**

1. **Go to Firebase Console:**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Select your project

2. **Generate Service Account:**
   - Go to **Project Settings** → **Service Accounts**
   - Click **"Generate new private key"**
   - Download the JSON file

3. **Extract Values:**
   ```json
   {
     "project_id": "your-project-id",
     "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   }
   ```

4. **Add to .env.local:**
   ```bash
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
   ```

---

## **🛡️ Security Benefits:**

### **✅ Before (Not Secure):**
- ❌ Client sends email in header
- ❌ No token validation
- ❌ Easy to impersonate users
- ❌ No server-side verification

### **✅ After (Secure):**
- ✅ Client sends Firebase Auth token
- ✅ Server validates token with Firebase Admin SDK
- ✅ Cannot impersonate users
- ✅ Proper authentication flow

---

## **🔄 How It Works Now:**

1. **User Logs In** → Firebase Auth creates token
2. **User Creates Post** → Frontend sends token in Authorization header
3. **API Receives Request** → Verifies token with Firebase Admin SDK
4. **Token Valid** → Extract user info (email, name, uid)
5. **Create Post** → Author set from verified user data

---

## **🚀 Ready to Use!**

Once you add the environment variables, your authentication will be:
- **Secure** - Proper token validation
- **Automatic** - Author set from authenticated user
- **Reliable** - Server-side verification
- **Best Practice** - Industry standard approach

This is now following Firebase's recommended authentication patterns! 🎉
