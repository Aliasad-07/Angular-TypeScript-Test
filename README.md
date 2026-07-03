# Product Inventory Management System

A complete, responsive Angular Single Page Application (SPA) for managing product inventories, performing full CRUD operations, and integrating in real-time with Firebase Realtime Database.

## Technologies Used

- **Angular 22** (Latest stable version, utilizing standalone components and Signal APIs)
- **Firebase & @angular/fire** (Modern modular SDK using dependency injection for Realtime Database CRUD)
- **Reactive Forms** (For secure client-side form state and robust validation)
- **Bootstrap Icons & Custom Dark Theme** (Premium, fully custom dark UI/UX with smooth micro-animations and responsive layouts)

## Features

- **Full CRUD Support**: Create, Read, Update, and Delete inventory items.
- **Real-time Synchronization**: The product list refreshes instantly on any changes to the backend database.
- **Responsive Layout**: Desktop table layout collapses automatically into fluid grid cards on mobile screens.
- **Interactive UI Feedback**: Auto-dismissing toast notifications, confirmation modals, loading spinner indicators, empty states, and dynamic status badges.
- **Search & Filter**: Real-time filtering by category and search queries.

## Getting Started

Follow these steps to set up and run the application locally on your machine.

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or later) and `npm` installed.

### 2. Installation

Clone this repository or navigate to the project directory:

```bash
cd "Angular & Typescript Task"
npm install --legacy-peer-deps
```

### 3. Firebase Configuration

You need to connect this project to your own Firebase Realtime Database instance:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Set up Realtime Database in **Test Mode** (to allow reads and writes without authentication rules).
3. Register a Web Application inside your project to receive your configuration object.
4. Replace the credentials in:
   - `src/environments/environment.ts` (Development)
   - `src/environments/environment.prod.ts` (Production)

Example template to replace:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    databaseURL: 'https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.firebasestorage.app',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};
```

### 4. Running Locally

Start the local Angular development server:

```bash
# If your project folder contains spaces or special characters like '&':
node "./node_modules/@angular/cli/bin/ng.js" serve

# Otherwise:
npx ng serve
```

Open [http://localhost:4200/](http://localhost:4200/) in your browser to view the application.

### 5. Production Build

To compile a production bundle:

```bash
node "./node_modules/@angular/cli/bin/ng.js" build
```
