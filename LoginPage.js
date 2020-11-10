import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const LoginPage = ({navigation}) => {
  return (
    <View>
      <Text>I am login page</Text>
      <Button title='Go back' onPress={() => navigation.goBack()}/>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({})
