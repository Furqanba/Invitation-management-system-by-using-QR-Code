import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {url} from './URL';

const PaymentPay = ({navigation, route}) => {
  const {
    details,
    guestDetails,
    secId,
    did,
    sem_id,
    stdDetails,
    Eventid,
    EventAmount,
    TicketCost,
    amount,
  } = route.params;
  const [guestFields, setGuestFields] = useState([
    {name: '', contactNumber: '', email: '', cnicNumber: '', gender: ''},
  ]);

  const [currAmount, setCurrAmount] = useState([]);
  const [currBal, setCurrBal] = useState('');

  // Assume this value for currentBalance if needed
  const currentBalance = 'PKR1000';
  const totalTicketCost = 'PKR200';
  let totalPayment = 'PKR300'; // Declare totalPayment as a let variable

  // Increment totalPayment by 1 (assuming it's a numerical value)
  totalPayment = parseFloat(totalPayment.replace('PKR', '')) + 1;
  totalPayment = 'PKR' + totalPayment.toFixed(2);

  // Function to handle payment button press
  const handlePayment = async () => {
    // Navigate to the next screen (replace 'NextScreen' with your actual screen name)
    // navigation.navigate('QR Code', {
    //   guestDetails: guestFields,
    //   did: did,
    //   secId: secId,
    //   sem_id: sem_id,
    //   stdDetails: stdDetails,
    //   // Eventid: details.Event_id,
    //   // EventAmount: details.amount,
    //   // TicketCost: details.EventAmount,
    //   amount,
    // });
    console.log(guestDetails, stdDetails.Std_Arid);
    let list = {
      guestDetails: guestDetails,
      arid: stdDetails.Std_Arid,
      tamount: amount,
      Eventid: Eventid,
    };
    console.log('List: ', list);

    const response = await fetch(url + 'EventCreation/addGuests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list),
    });
    if (response.ok) {
      var ans = await response.json();
      console.log('ans', ans);
      navigation.navigate('QR Code', {
        guestDetails: guestFields,
        did: did,
        secId: secId,
        sem_id: sem_id,
        stdDetails: stdDetails,
        // Eventid: details.Event_id,
        // EventAmount: details.amount,
        // TicketCost: details.EventAmount,
        amount,
      });
    }
  };

  useEffect(() => {
    console.log(
      'guestDetailsssssss',
      guestDetails,
      secId,
      did,
      sem_id,
      stdDetails,
      Eventid,
      EventAmount,
      TicketCost,
      amount,
    );

    const userWallet = async () => {
      try {
        var formData = new FormData();
        console.log('aridNo', stdDetails.Std_Arid);
        console.log('Eventamount:', EventAmount);
        console.log('Event id:', Eventid);
        console.log('Total Amount:', amount);

        formData.append('aridNo', stdDetails.Std_Arid);
        var response = await fetch(url + 'StudentDetails/userAmount', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
        if (response.ok) {
          var ans = await response.json();
          console.log('ans', ans, ans[0].Wallet_amount);
          setCurrAmount(ans);
          setCurrBal(ans[0].Wallet_amount);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userWallet();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      <View style={styles.billContainer}>
        <View style={styles.billRow}>
          <Text style={styles.label}>Current Balance:</Text>
          <Text style={styles.value}>PKR{currBal}</Text>
        </View>

        <View style={styles.billRow}>
          <Text style={styles.label}>Event Amount:</Text>
          <Text style={styles.value}>PKR{EventAmount}</Text>
        </View>

        <View style={styles.billRow}>
          <Text style={styles.label}>Total Ticket Cost:</Text>
          <Text style={styles.value}>PKR{amount}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#83f2cd',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  billContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  payButton: {
    backgroundColor: '#b8605a',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  payText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentPay;
