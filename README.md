# Retrospect

## What is Retrospect?

Retrospect is a social journalling app. Each day you are asked a question. Answering lets you see what 10 responses from the community, and lets you see how you answered that same question 28 days ago. The questions focus on thoughfulness, self-reflection, gratitude, and self-development

## What is it built with?

Retrospect is build with React Native and Expo. The backend is build with Node.JS, Express, and MySQL.

## How do I download it?

Retrospect is currently in closed testing for Android devices only. Please go to https://humberstone.uk to sign up, and I will get you added to the testing group. More users will help me get the app onto the public Google Play Store faster.

## How to spin up a copy of Retrospect

### Commands for setup

You will need to clone this repo, and the retrospect-server repo available on my GitHub profile

---

You may need to expose the port to make it work with Android Studio, I used local tunnel for this:
lt --port 3030 --subdomain {enter subdomain to use} (you'll need to update this variable in the env file of the client)

When using the Expo Dev app on device, you need to start the client with --tunnel flag to make it work
npx expo start --dev-client --tunnel

How the app and sign in is set up:
We have our central app.js which is the app itself. Within it is a condition that checks if the user is logged in, and shows them either the app, or the login/register screens. This had the added benefit of continuing to show someone the logged in experience if the login token persists, saving them from having to log in or to view the log-in screen each time.

Build with eas build --profile development (or preview)

User guide for the app
Once installed, these are the next steps:

1. Sign in or sign up using Auth0. Your account info is specific for Retrospect.
2. Click Complete Login on splash screen
3. Sign in again because it doesn't update its state properly
