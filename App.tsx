import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/MainScreen';
import Settings from './src/Settings';
import { SpotifyContextProvider } from './src/SpotifyAPIContext';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

class App extends React.PureComponent {

  render(): React.ReactNode {
    return (
      <NavigationContainer>
        <SafeAreaView style={{ width: "100%", height: "100%" }}>
          <SpotifyContextProvider>
            <Stack.Navigator>
              <Stack.Screen name="MainScreen" component={MainScreen} />
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
          </SpotifyContextProvider>
        </SafeAreaView>
      </NavigationContainer >
    )
  }
}

export default App;
