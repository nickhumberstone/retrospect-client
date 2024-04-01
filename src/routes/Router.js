import { NavigationContainer } from '@react-navigation/native';
import AppStack from '../stacks/AppStack';
import AuthStack from '../stacks/AuthStack';
import { useAuth0 } from 'react-native-auth0';

export default function Router() {
  const {user} = useAuth0();
    return (
        <NavigationContainer>
          {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      );
}