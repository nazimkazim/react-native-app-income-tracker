import React from 'react';
import Homepage from './Homepage';
import LoginPage from './LoginPage'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Home" component={Homepage}/>
      <Stack.Screen name="Login" component={LoginPage} options={{
        title:'Sign in or Sign Up'
      }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};