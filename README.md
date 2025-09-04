Business Directory App
Overview
Business Directory is a mobile application built with React Native and Expo, designed to help users discover and explore nearby businesses. The app leverages Firebase for its database to store business information and Clerk for secure user authentication. With a user-friendly interface, it allows users to search for businesses based on location, category, or other criteria, making it easy to find local services and establishments.
Features

Business Search: Search for businesses by name, category, or location.
Nearby Businesses: Discover businesses near your current location using geolocation.
User Authentication: Secure sign-up and login functionality powered by Clerk.
Business Details: View detailed information about businesses, including address, contact details, and descriptions.
Real-Time Data: Firebase integration ensures up-to-date business listings and user data.
Responsive UI: Built with React Native and JSX for a seamless cross-platform experience on iOS and Android.

Technologies Used

React Native: Framework for building the mobile app.
Expo: Development platform for streamlined React Native development.
JSX: Syntax for building the app's UI components.
Firebase: Backend for real-time database and storage.
Clerk: Authentication service for secure user management.
Node.js: For managing dependencies and running the development environment.

Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js (v16 or higher)
npm or Yarn
Expo CLI (npm install -g expo-cli)
A Firebase project set up with Firestore enabled
A Clerk account with API keys configured
Android Studio or Xcode for emulator/simulator (optional)

Installation

Clone the Repository:
git clone https://github.com/your-username/business-directory.git
cd business-directory


Install Dependencies:Using npm:
npm install

Or using Yarn:
yarn install


Set Up Environment Variables:Create a .env file in the root directory and add your Firebase and Clerk configuration:
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
EXPO_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id


Configure Firebase:

Set up a Firebase project in the Firebase Console.
Enable Firestore and configure your database rules.
Download the Firebase configuration and add it to your app (as shown in the .env file).


Configure Clerk:

Sign up at Clerk and create a new application.
Obtain the publishable key and add it to the .env file.
Follow Clerk's React Native setup guide to integrate authentication.


Run the App:Start the Expo development server:
npx expo start


Scan the QR code with the Expo Go app on your mobile device, or
Press a for Android emulator or i for iOS simulator.



Usage

Sign Up/Login: Use Clerk authentication to create an account or log in.
Search Businesses: Enter a business name, category, or use your location to find nearby businesses.
View Details: Tap on a business to view its details, such as address, phone number, and description.
Explore Nearby: Allow location access to discover businesses in your vicinity.

Project Structure
business-directory/
├── assets/                # Images and static assets
├── components/            # Reusable React Native components
├── screens/               # App screens (e.g., Home, Search, Business Details)
├── navigation/            # Navigation setup (e.g., Stack or Tab Navigator)
├── services/              # Firebase and Clerk API integrations
├── .env                   # Environment variables
├── App.jsx                # Main app entry point
├── package.json           # Project dependencies
└── README.md              # This file

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For any questions or suggestions, feel free to reach out:

Email: praveen20005kumar@gmail.com.com
GitHub:PraveenGithubAccnt
