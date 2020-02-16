import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ name, onValueChange }) => {
  const [value, setValue] = useState('');

  const handleOnChange = (newValue) => {
    setValue(newValue);
    onValueChange(value);
  }

  return(
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{name}</Text>
      <TextInput value={value} onChangeText={(newValue) => handleOnChange(newValue)} keyboardType={'decimal-pad'} style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#104b79',
    marginBottom: 10,
  },
  input: {
    borderColor: '#c5c1ba',
    borderWidth: 1,
    borderRadius: 5,
    width: "70%",
    height: 40,
    padding: 5,
  }
});

export default InputField;