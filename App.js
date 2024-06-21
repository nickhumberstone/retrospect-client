import { Auth0Provider } from 'react-native-auth0';
import AuthRouter from './src/routes/AuthRouter';
import { usePushNotifications } from './usePushNotifications';
import { Text } from 'react-native';

export default function App() {
  const {expoPushToken, notification} = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  return (
    <Auth0Provider domain={"dev-questionanswer.uk.auth0.com"} clientId={"fQQA6iyyjMekTTCBXQ7PRTGp3CzdT4F0"}>
      <Text>Token: {expoPushToken?.data ?? ""}</Text>
      <Text>{data}</Text>
      <AuthRouter />
    </Auth0Provider>
  );
}