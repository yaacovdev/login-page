import React, {useEffect, useState} from 'react';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Auth0Provider} from 'react-native-auth0';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const credentials = await Keychain.getGenericPassword({
          service: 'authToken',
        });
        if (credentials) {
          console.log(
            'Credentials successfully loaded for user',
            credentials.username,
          );
          setIsLoggedIn(true);
        } else {
          console.log('No credentials stored');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to fetch auth token', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Auth0Provider
      domain={'dev-x68uv01qodfof87n.us.auth0.com'}
      clientId={'lA195SFODw0CsuiCpLiYBCyz3Pzk6yPu'}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
