import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Button, RadioButton} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InvitiGuest = ({navigation, route}) => {
  const {did, sem_id, secId, stdDetails, details} = route.params;
  const [guestOption, setGuestOption] = useState('No');
  const [guestFields, setGuestFields] = useState([
    {name: '', contactNumber: '', email: '', cnicNumber: '', gender: ''},
  ]);
  const [totalAmount, setTotalAmount] = useState(Number(details.amount));

  useEffect(() => {
    console.log('stdDetails', stdDetails);
    console.log('did:', did);
    console.log('secId:', secId);
    console.log('sem_id:', sem_id);
    console.log('Event_id:', details.Event_id);
    console.log('Event_Amount:', details.amount);

    // Log the details.amount for the initial form
    console.log(`Form 1 details.amount: ${details.amount}`);
  }, []);

  const handleRadioChange = value => {
    setGuestOption(value);
    if (value === 'Yes') {
      setTotalAmount(Number(details.amount) * guestFields.length);
    } else {
      setTotalAmount(Number(details.amount));
    }
  };

  const addMoreFields = () => {
    setGuestFields([
      ...guestFields,
      {name: '', contactNumber: '', email: '', cnicNumber: '', gender: ''},
    ]);

    // Update the total amount for each form including the new one
    setTotalAmount(prevAmount => prevAmount + Number(details.amount));

    // Log the details.amount for each form including the new one
    guestFields.forEach((_, index) => {
      console.log(`Form ${index + 1} details.amount: ${details.amount}`);
    });
    console.log(
      `Form ${guestFields.length + 1} details.amount: ${details.amount}`,
    );
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...guestFields];
    updatedFields[index][field] = value;
    setGuestFields(updatedFields);
  };

  const handleProceed = () => {
    console.log(guestFields);
    console.log('eventamountfortest:', details.amount);
    let amount = totalAmount + Number(details.amount);
    console.log('totalAmount', amount);
    navigation.navigate('Payment Pay', {
      guestDetails: guestFields,
      did: did,
      secId: secId,
      sem_id: sem_id,
      stdDetails: stdDetails,
      Eventid: details.Event_id,
      EventAmount: details.amount,
      TicketCost: details.EventAmount,
      amount,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Will you have a guest with you?</Text>
      <View style={styles.radioGroup}>
        <RadioButton
          value="No"
          status={guestOption === 'No' ? 'checked' : 'unchecked'}
          onPress={() => handleRadioChange('No')}
        />
        <Text style={styles.radioLabel}>No</Text>
        <RadioButton
          value="Yes"
          status={guestOption === 'Yes' ? 'checked' : 'unchecked'}
          onPress={() => handleRadioChange('Yes')}
        />
        <Text style={styles.radioLabel}>Yes</Text>
      </View>
      {guestOption === 'Yes' && (
        <View>
          {guestFields.map((_, index) => (
            <View key={index} style={styles.fieldContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Name"
                value={guestFields[index].name}
                onChangeText={text => handleFieldChange(index, 'name', text)}
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Contact Number"
                value={guestFields[index].contactNumber}
                onChangeText={text =>
                  handleFieldChange(index, 'contactNumber', text)
                }
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Email"
                value={guestFields[index].email}
                onChangeText={text => handleFieldChange(index, 'email', text)}
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="CNIC Number"
                value={guestFields[index].cnicNumber}
                onChangeText={text =>
                  handleFieldChange(index, 'cnicNumber', text)
                }
              />
              <Text style={styles.label}>Gender:</Text>
              <View style={styles.genderContainer}>
                <Button
                  mode={
                    guestFields[index].gender === 'Male'
                      ? 'contained'
                      : 'outlined'
                  }
                  onPress={() => handleFieldChange(index, 'gender', 'Male')}
                  style={styles.genderButton}>
                  Male
                </Button>
                <Button
                  mode={
                    guestFields[index].gender === 'Female'
                      ? 'contained'
                      : 'outlined'
                  }
                  onPress={() => handleFieldChange(index, 'gender', 'Female')}
                  style={styles.genderButton}>
                  Female
                </Button>
              </View>
            </View>
          ))}
          <Button
            mode="contained"
            icon={() => <Icon name="plus" type="font-awesome" color="#fff" />}
            onPress={addMoreFields}
            style={styles.addButton}>
            Add More
          </Button>
        </View>
      )}
      <Button
        mode="contained"
        onPress={handleProceed}
        style={styles.proceedButton}>
        Proceed to Pay
      </Button>
      <Text style={styles.amountText}>Total Amount: {totalAmount}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#83f2cd',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  radioLabel: {
    fontSize: wp('4.5%'),
    marginRight: wp('5%'),
    color: '#333',
  },
  fieldContainer: {
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: wp('1%'),
    elevation: 3,
  },
  input: {
    marginBottom: hp('1%'),
  },
  label: {
    fontSize: wp('4.5%'),
    marginBottom: hp('1%'),
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    marginRight: wp('1%'),
    marginLeft: wp('1%'),
  },
  addButton: {
    marginBottom: hp('2%'),
    backgroundColor: '#b8605a',
  },
  proceedButton: {
    paddingVertical: hp('1.5%'),
    backgroundColor: '#b8605a',
  },
  amountText: {
    marginTop: hp('2%'),
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default InvitiGuest;
