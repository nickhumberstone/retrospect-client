import { Auth0Provider} from 'react-native-auth0';
import AuthRouter from './src/routes/AuthRouter';

export default function App() {
  return (
    <Auth0Provider domain={"dev-questionanswer.uk.auth0.com"} clientId={"fQQA6iyyjMekTTCBXQ7PRTGp3CzdT4F0"}>
      {/* Router checks if user is logged in, and displays either authstack or appstack */}
      <AuthRouter/>
    </Auth0Provider>
  );
}