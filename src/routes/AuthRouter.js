import { NavigationContainer } from '@react-navigation/native';
import DailyRouter from '../routes/DailyRouter';
import AuthStack from '../stacks/AuthStack';
import { useAuth0} from 'react-native-auth0';

export default function AuthRouter() {
const {user} = useAuth0();

  return (
        <NavigationContainer>
          {!user ? <AuthStack /> : <DailyRouter />}
        </NavigationContainer>
      );
}