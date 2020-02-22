import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, StatusBar, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';

const CURRENCY = 'S$';

const PriceCalculator = () => {
  const [price, setPrice ] = useState('');
  const [discount, setDiscount ] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log(status);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log('handle scanned');
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleScanner = () => {
    if (hasPermission === null) {
      console.log('Need permission');
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      console.log('Permission denied');
      return <Text>No access to camera</Text>;
    }
    if (scanned) {
      setScanned(false)
    }
  };
  

  const handleChange = (newValue) => {
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
    <React.Fragment>
			<SafeAreaView style={styles.container}>
			<LinearGradient colors={['#0256C2', '#0248BA', '#0335B3']} style={styles.wrapper}>
					<StatusBar barStyle='light-content' />
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
            <View style={styles.controls}>
              <TouchableOpacity style={styles.clearButton} onPress={() => handleClear()}>
                <MaterialIcons name='clear' style={styles.clearButtonIcon} />
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.scanButton} onPress={() => handleScanner()}>
                <MaterialCommunityIcons name='barcode-scan' style={styles.scanButtonIcon} />
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />
              </TouchableOpacity>
            </View>

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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 30
  },
  scanButtonIcon: {
    fontSize: 30,
    color: '#FFF'
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