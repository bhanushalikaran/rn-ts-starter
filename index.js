#!/usr/bin/env node

const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

// Get the app name and version from command-line arguments
const appName = process.argv[2];
const rnVersion = process.argv[3] || "latest"; // Default to 'latest' if version is not provided

if (!appName) {
  console.error("Please provide a name for your React Native app.");
  process.exit(1);
}

// Define paths
const starterSrcPath = path.join(__dirname, "app");
const projectPath = path.join(process.cwd(), appName);
const destinationSrcPath = path.join(projectPath, "app");

// Check for existing project
if (fs.existsSync(projectPath)) {
  console.error(`Error: Project directory "${appName}" already exists.`);
  process.exit(1);
}

// Define the dependencies you want to install
const dependencies = [
  "axios",
  "react-native-fast-image",
  "@react-navigation/native",
  "@react-navigation/native-stack",
  "@react-navigation/bottom-tabs",
  "@react-navigation/material-top-tabs",
  "react-native-tab-view",
  "react-native-pager-view",
  "react-native-screens",
  "react-native-safe-area-context",
  "@react-native-async-storage/async-storage",
  "redux-persist",
  "react-redux",
  "@reduxjs/toolkit",
  "@react-native-firebase/app",
  "@react-native-firebase/messaging",
  "react-native-gesture-handler",
  "react-native-reanimated",
  "@gorhom/bottom-sheet",
  "@gorhom/portal",
  "@react-native-community/netinfo",
  "react-native-device-info",
];

// Function to run shell commands
const execCommand = (cmd, errorMessage) => {
  if (shell.exec(cmd).code !== 0) {
    console.error(errorMessage);
    process.exit(1);
  }
};

// Step 1: Initialize new React Native project
console.log(
  `Initializing new React Native project: ${appName} with version: ${rnVersion}...`
);
execCommand(
  `npx  @react-native-community/cli init ${appName} ${
    rnVersion ? "--version " + rnVersion : ""
  } --skip-install`,
  "Error: Failed to initialize React Native project."
);

// Step 2: Navigate to the project directory
shell.cd(projectPath);

// Step 3: Copy the `app` directory from the starter to the new project
if (fs.existsSync(starterSrcPath)) {
  shell.cp("-r", starterSrcPath, destinationSrcPath);
  console.log("Copied app directory to the new project.");

  // Step 4: Install dependencies
  console.log("Installing dependencies...");
  execCommand(
    `npm install ${dependencies.join(" ")}`,
    "Error: Failed to install dependencies."
  );
} else {
  console.error("Error: app directory not found in starter.");
  process.exit(1);
}

// Final message
console.log(
  `React Native project with TypeScript support created successfully.\n\n` +
    `Please follow these steps to complete the setup:\n` +
    `1. Navigate to your project directory: cd ${appName}\n` +
    `2. Install iOS dependencies using CocoaPods:\n` +
    `   cd ios\n` +
    `   pod install\n` +
    `3. Configure any necessary native setup for the libraries you've installed. Refer to the documentation of each library for specific instructions.`
);
