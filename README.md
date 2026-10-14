# Pocket Life Assistant

This repository is structured as a monorepo using npm workspaces, containing the backend server and the mobile client.

## Prerequisites

Ensure the following tools are installed before proceeding:

- **Node.js** (>= 22.18.0)
- **MongoDB** (running locally on port 27017)
- **Ruby & Bundler** (for iOS dependency management)
- **Xcode & CocoaPods** (for iOS development)

## 1. Installation

All dependencies must be installed from the project root. Do not run installation commands inside individual workspace directories to avoid generating duplicate lockfiles.

```bash
npm install
```

## 2. Environment Configuration

Local environment variables must be configured for both the server and mobile applications.

**Server Configuration:**

```bash
cp server/.env.example server/.env
```

Ensure `server/.env` contains the following values:

```env
MONGO_URI=mongodb://localhost:27017/pocket_life_assistant
PORT=5000
NODE_ENV=development
```

**Mobile Configuration:**

```bash
cp mobile/.env.example mobile/.env
```

Ensure `mobile/.env` contains the following values:

```env
MEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

## 3. iOS Native Setup

Native dependencies must be installed via CocoaPods prior to running the iOS build for the first time.

```bash
cd mobile/ios
bundle install
bundle exec pod install
cd ../..
```

## 4. Running the Project

The backend server and the mobile bundler should be started in separate terminal sessions from the project root.

**Start the Server:**

```bash
npm start --workspace=server
```

**Start the Mobile Application:**

First, start the React Native Metro bundler:

```bash
npm start --workspace=mobile
```

In a new terminal session, build and run the application on your target platform:

```bash
# For iOS
npm run ios --workspace=mobile

# For Android
npm run android --workspace=mobile
```
