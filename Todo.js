import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Todo = ({ id, title, completed }) => {
  return (
    <View>
      <Text>{ id } { title } { completed }</Text>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({});

