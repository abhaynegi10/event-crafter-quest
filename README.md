# 🎉 Event Explorer – Mini Event App

A simple event exploration app built as part of the **College Crave – App Developer Intern Coding Assignment**.  
The app demonstrates **authentication, API integration, navigation, local storage, and event registration** with a neat UI.  

---

## 🚀 Features
- **Authentication**
  - Signup & Login with Email + Password (Firebase / Dummy JSON system).
- **Event List Page**
  - Fetches events (using [`dummyjson.com/products`](https://dummyjson.com/products))  
  - Displays event title, date, and location in a scrollable card-based UI.
- **Event Detail Page**
  - Shows event title, description, image, and a **Register button**.  
- **Register for Event**
  - Users can save events in Local Storage / Firebase under their account.
- **Profile Page**
  - Displays the logged-in user’s registered events list.
- **Link to the project**
  - https://event-crafter-quest.lovable.app.

## 📱 Mobile App (APK Generation)

This project is configured with Capacitor for mobile app development. To generate an APK:

### Prerequisites
- Node.js installed
- Android Studio installed
- Git

### Steps to Generate APK:
1. **Export to GitHub**: Use the "Export to Github" button in Lovable
2. **Clone the repository**: `git clone [your-repo-url]`
3. **Install dependencies**: `npm install`
4. **Add Android platform**: `npx cap add android`
5. **Update native dependencies**: `npx cap update android`
6. **Build the web app**: `npm run build`
7. **Sync to native platform**: `npx cap sync`
8. **Open in Android Studio**: `npx cap run android`
9. **Generate APK**: In Android Studio, go to Build > Build Bundle(s) / APK(s) > Build APK(s)

The APK will be generated in `android/app/build/outputs/apk/debug/app-debug.apk`

For production APK, use Build > Generate Signed Bundle / APK in Android Studio.

---

## 🛠️ Tech Stack
- **Frontend**: React / React Native / Flutter  
- **Authentication**: Firebase Authentication / Dummy JSON-based auth  
- **API**: [`https://dummyjson.com/products`](https://dummyjson.com/products)  
- **Storage**: Local Storage / Firebase Realtime DB / Firestore  
- **UI**: Card-based clean minimal design  

---

