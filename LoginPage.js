import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    borderColor: 'red',
    borderWidth: 1
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center"
  },
});

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    if (username === 'qazi' && password === 'admin') {
      navigation.navigate('Home')
    }
  }
  return (
    <View>
      <Text>I am login page</Text>
      <TextInput
        style={ styles.input }
        value={ username }
        placeholder="Enter a username"
        onChangeText={ text => setUsername(text) }
      />
      <TextInput
        style={ styles.input }
        value={ password }
        secureTextEntry={true}
        placeholder="Enter a password"
        onChangeText={ text => setPassword(text) }
      />
      <Button title='Login' onPress={login} />
    </View>
  );
};

export default LoginPage;