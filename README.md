📍 Business Directory
Business Directory is a mobile application built with React Native (Expo) to help users discover and explore nearby businesses. Powered by Firebase for real-time data and Clerk for secure authentication, it offers a seamless way to search for local services, view details, and connect with businesses.

✨ Features

🔍 Search businesses by name, category, or location
📍 Find nearby businesses using geolocation
📋 View detailed business profiles (address, contact, description)
🔐 Secure login and signup with Clerk authentication
📱 Mobile-first UI with Expo and React Native
🔥 Real-time business data powered by Firebase


📸 Screenshots
Add screenshots or screen recordings here once available

🚀 Getting Started
Prerequisites

Node.js & npm
Expo CLI:  npm install -g expo-cli


A Firebase project with Firestore enabled
A Clerk account with API keys

Installation

Clone the Repository:
git clone https://github.com/your-username/business-directory.git
cd business-directory


Install Dependencies:
npm install


Set Up Environment Variables:Create a .env file in the root directory:
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id


Configure Firebase:

Create a project in the Firebase Console.
Enable Firestore and set up database rules.
Add Firebase config to the .env file.


Configure Clerk:

Sign up at Clerk and create an application.
Add the publishable key to the .env file.
Follow Clerk’s React Native setup guide.


Run the App:
npx expo start


Scan the QR code with the Expo Go app, or
Use a for Android emulator or i for iOS simulator.




🛠️ Tech Stack

React Native: Cross-platform mobile app framework
Expo: Streamlined development and deployment
JSX: UI component syntax
Firebase: Real-time database and storage
Clerk: Secure authentication
Node.js: Dependency management


📂 Project Structure
business-directory/
├── assets/                # Images and static assets
├── components/            # Reusable UI components
├── screens/               # App screens (Home, Search, Details)
├── navigation/            # Navigation setup
├── services/              # Firebase and Clerk integrations
├── .env                   # Environment variables
├── App.jsx                # App entry point
├── package.json           # Dependencies
└── README.md              # This file


🤝 Contributing

Fork the repository.
Create a branch: git checkout -b feature/your-feature.
Commit changes: git commit -m "Add your feature".
Push to the branch: git push origin feature/your-feature.
Open a Pull Request.


📜 License
MIT License. See LICENSE for details.

📬 Contact
Questions or ideas? Reach out:

Email: praveen20005kumar@gmail.com.com
GitHub:PraveenGithubAccnt
