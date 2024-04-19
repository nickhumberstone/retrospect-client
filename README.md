Commands for setup

You may need to expose the port to make it work with Android Studio, I used local tunnel for this:
lt --port 3030 --subdomain {enter subdomain to use} (you'll need to update this variable in the env file of the client)

When using the Expo Dev app on device, you need to start the client with --tunnel flag to make it work
npx expo start --dev-client --tunnel

 How the app and sign in is set up:
 We have our central app.js which is the app itself. Within it is a condition that checks if the user is logged in, and shows them either the app, or the login/register screens. This had the added benefit of continuing to show someone the logged in experience if the login token persists, saving them from having to log in or to view the log-in screen each time.

 Build with eas build --profile development (or preview)