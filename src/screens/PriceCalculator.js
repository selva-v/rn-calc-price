import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, StatusBar } from 'react-native';
import InputField from '../components/InputField';

const PriceCalculator = () => {
  const [price, setPrice ] = useState('');
  const [discount, setDiscount ] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const calcPrice = (type, value) => {
    if (type === 'price') {
      setPrice(value);
    } else {
      setDiscount(value);
    }
    setSalePrice( price - (price * (discount / 100)) );
  }
  return(
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      <View style={styles.wrapper}>
        <Text style={styles.priceText}>Item price: {salePrice}</Text>
        <InputField name='Price' onValueChange={(priceValue) => calcPrice('price', priceValue)} />
        <InputField name='Discount' onValueChange={(discountValue) => calcPrice('discount', discountValue)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
		height: '100%',
		padding: 20,
		
  },
  priceText: {
		fontSize: 26,
		fontWeight: '600',
		color: '#000',
		marginBottom: 30
	},
})

export default PriceCalculator;