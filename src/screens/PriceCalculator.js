import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const CURRENCY = 'S$';

const PriceCalculator = () => {
  const [price, setPrice ] = useState('');
  const [discount, setDiscount ] = useState('');
  /* const [salePrice, setSalePrice] = useState('');

  const calcPrice = (type, value) => {
    if (type === 'price') {
      setPrice(value);
    } else {
      setDiscount(value);
    }
    setSalePrice( price - (price * (discount / 100)) );
  } */
  return(
    <React.Fragment>
			<SafeAreaView style={styles.container}>
			<LinearGradient colors={['#0256C2', '#0248BA', '#0335B3']} style={styles.wrapper}>
					<StatusBar barStyle='light-content' />
					<View style={styles.wrapper}>
						<View style={styles.circle}>
							<Text style={styles.priceText}>You pay</Text>
							<Text style={styles.priceAmount}>{CURRENCY} { (price - (price * (discount / 100))).toFixed(2) }</Text>
							<View style={styles.badge}>
							{ discount > 0 ?
								<Text style={styles.badgeText}>{discount}% OFF</Text>
								:
								<Text style={styles.badgeText}>0% OFF</Text>
							}
							</View>
						</View>
						<Text style={styles.savingsText}>You save: {CURRENCY} { (price - (price - (price * (discount / 100)))).toFixed(2) }</Text>
						{/* <InputField name='Price' onValueChange={(priceValue) => calcPrice('price', priceValue)} />
						<InputField name='Discount' onValueChange={(discountValue) => calcPrice('discount', discountValue)} /> */}

					</View>
				</LinearGradient>
			</SafeAreaView>
			<SafeAreaView style={{ flex: 0.5 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price</Text>
                <View style={styles.fieldWrapper}>
                  <Ionicons name='ios-pricetags' size={28} style={styles.textInputIcon} />
                  <TextInput value={price} onChangeText={(newValue) => setPrice(newValue)} keyboardType={'decimal-pad'} style={styles.input} />
                </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Discount</Text>
              <View style={styles.fieldWrapper}>
                <MaterialCommunityIcons name='sale' size={28} style={styles.textInputIcon} />
                <TextInput value={discount} onChangeText={(newValue) => setDiscount(newValue)} keyboardType={'decimal-pad'} style={styles.input} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
			</SafeAreaView>
		</React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#0256C2',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
		height: '100%',
		padding: 20,
		alignItems: 'center',
	},
	circle: {
		width: 250,
		height: 250,
		borderRadius: 125,
		justifyContent: "center",
		alignItems: 'center',
		backgroundColor: '#0335B3',
		marginTop: 10,
		marginBottom: 30
	},
	priceText: {
		fontSize: 22,
		color: '#fff',
		textAlign: 'center',
	},
	priceAmount: {
		fontSize: 40,
		fontWeight: '800',
		color: '#fff',
    textAlign: 'center',
    marginVertical: 10
	},
	badge: {
		backgroundColor: '#1897E6',
    paddingVertical: 5,
    paddingHorizontal: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
	badgeText: {
		fontSize: 16,
		color: '#fff',
	},
	savingsText: {
		fontSize: 17,
		color: '#fff',
	},
  

	formContainer: {
		width: '100%',
		padding: 20,
	},
	inputContainer: {
		marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: '#0335B3',
    marginBottom: 5,
	},
	fieldWrapper: {
		position: "relative",
		width: '100%'
	},
	textInputIcon: {
		position: 'absolute',
		top: 10,
		left: 10,
		zIndex: 1,
		color: '#0248BA'
	},
  input: {
		fontSize: 20,
    borderColor: '#2576D9',
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    height: 50,
		padding: 10,
		backgroundColor: '#fff',
		paddingLeft: 45,
  }
})

export default PriceCalculator;