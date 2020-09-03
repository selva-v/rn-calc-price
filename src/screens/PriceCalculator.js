import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, StatusBar, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const CURRENCY = 'S$';

const PriceCalculator = () => {
  const [price, setPrice ] = useState('');
  const [discount, setDiscount ] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  /* const [salePrice, setSalePrice] = useState('');

  const calcPrice = (type, value) => {
    if (type === 'price') {
      setPrice(value);
    } else {
      setDiscount(value);
    }
    setSalePrice( price - (price * (discount / 100)) );
  } */
  const handleChange = (newValue) => {
    //newValue <= 100 ? setDiscount(newValue) : setErrorMessage('Please keyin number between 0 - 100');
    
    if (newValue <= 100 ) {
      setDiscount(newValue);
      setErrorMessage('');
    } else {
      setErrorMessage('Discount cannot be more than 100%');
      setDiscount(discount);
    }
  };
  const handleClear = () => {
    setPrice('');
    setDiscount('');
    setErrorMessage('');
  };
  return(
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
			<LinearGradient colors={['#0256C2', '#0248BA', '#0335B3']} style={styles.wrapper}>
					<View style={styles.innerContainer}>
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
            <TouchableOpacity style={styles.clearButton} onPress={() => handleClear()}>
              <MaterialIcons name='clear' style={styles.clearButtonIcon} />
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
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
                  <Ionicons name='ios-pricetags' style={styles.textInputIcon} />
                  <TextInput
                  value={price}
                  onChangeText={(newValue) => setPrice(newValue)}
                  keyboardType={'decimal-pad'}
                  style={styles.input}
                  placeholder="100"
                />
                </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Discount</Text>
              <View style={styles.fieldWrapper}>
                <MaterialCommunityIcons name='sale' style={styles.textInputIcon} />
                <TextInput
                  value={discount}
                  onChangeText={(newValue) => handleChange(newValue)}
                  keyboardType={'decimal-pad'}
                  style={styles.input}
                  placeholder="10"
                />
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAvoidingView>
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
  },
  innerContainer: {
    width: '100%',
		height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
	circle: {
		width: 220,
		height: 220,
    borderRadius: 110,
		justifyContent: "center",
		alignItems: 'center',
		backgroundColor: '#0335B3',
		marginTop: 10,
		marginBottom: 10
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
		fontSize: 18,
		color: '#fff',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  clearButtonIcon: {
    fontSize: 24,
    color: "#fff"
  },
  clearText: {
    color: '#FFF'
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
    fontSize: 28,
		position: 'absolute',
		top: 10,
		left: 10,
		zIndex: 1,
		color: '#0248BA'
	},
  input: {
    fontSize: 20,
    color: '#0335B3',
    borderColor: '#2576D9',
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    height: 50,
		padding: 10,
		backgroundColor: '#fff',
		paddingLeft: 45,
  },
  errorMessage: {
    color: 'red'
  }
})

export default PriceCalculator;