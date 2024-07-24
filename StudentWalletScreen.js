import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {url} from './URL';

const StudentWalletScreen = ({navigation, route}) => {
  const {stdDetails} = route.params;

  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    console.log('Data', stdDetails);
  }, [stdDetails]);

  const handleAmountChange = text => {
    setAmount(text);
  };

  const handleSubmit = async () => {
    console.log('stdDetails.Std_Arid', stdDetails.Std_Arid);

    const data = {
      Amount: amount,
      Std_Arid: stdDetails.Std_Arid,
    };
    console.log(data);
    try {
      const response = await fetch(url + 'EventInfo/stdWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const ans = await response.json();
        console.log('ANS', ans);
        Alert.alert('Processing......! Please wait..');
        Currentbalance();
      } else {
        console.error('Failed to submit amount:', response.status);
      }
    } catch (error) {
      console.error('Error submitting amount:', error);
    }
  };

  const Currentbalance = async () => {
    try {
      const data = {
        Std_Arid: stdDetails.Std_Arid,
      };
      console.log('data', data);
      const response = await fetch(url + 'EventInfo/StudentWallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const ans = await response.json();
        console.log('ans', ans);

        const totalBalance = ans.reduce(
          (acc, item) => acc + parseFloat(item.walletamount),
          0,
        );
        setBalance(totalBalance);
      } else {
        console.error('Failed to fetch balance:', response.status);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    Currentbalance();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Wallet</Text>
      </View>
      <View style={styles.balanceContainer}>
        {balance !== null ? (
          <Text style={styles.balanceText}>Current Balance: PKR {balance}</Text>
        ) : (
          <Text style={styles.balanceText}>Loading balance...</Text>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Enter Amount to Admin:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="Enter amount"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#83f2cd',
    flex: 1,
    padding: wp('5%'),
  },
  header: {
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  headerText: {
    fontSize: wp('12%'),
    color: 'black',
    fontWeight: 'bold',
  },
  balanceContainer: {
    marginBottom: hp('2%'),
    padding: wp('2%'),
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  balanceText: {
    fontSize: wp('5%'),
    color: 'black',
  },
  content: {
    marginBottom: hp('2%'),
    alignItems: 'center',
  },
  label: {
    fontSize: wp('5%'),
    marginBottom: hp('1%'),
  },
  input: {
    height: hp('5%'),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: hp('2%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    width: wp('80%'),
  },
  button: {
    backgroundColor: '#b8605a',
    padding: wp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    width: wp('40%'),
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4.5%'),
  },
});

export default StudentWalletScreen;
