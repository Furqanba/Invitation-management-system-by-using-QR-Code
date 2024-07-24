import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InvitationDetails = ({navigation, route}) => {
  const {details, stdDetails, secId, sem_id, did, userDetails, item} =
    route.params;

  useEffect(() => {
    console.log('details', details);
    console.log('did', did);
    console.log('secId', secId);
    console.log('sem_id', sem_id);
    console.log('stdDetails', stdDetails);
  }, [details, userDetails]);

  const handleYesPress = () => {
    console.log('detqulas', details.allowGuest);
    if (details.allowGuest === 'true') {
      navigation.navigate('Inviti Guest', {
        did,
        sem_id,
        secId,
        stdDetails,
        details,
      });
    } else {
      // navigation.navigate('Payment Pay');
    }
  };

  const handleNoPress = () => {
    Alert.alert('Response', 'Thanks for your answer.', [{text: 'OK'}]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Invitation Details</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Event Name:</Text>
        <Text style={styles.value}>{details.Event_name}</Text>
        <Text style={styles.label}>Event Status:</Text>
        <Text style={styles.value}>{details.Event_status}</Text>
        <Text style={styles.label}>Venue Name:</Text>
        <Text style={styles.value}>{details.Venuename}</Text>
        <Text style={styles.label}>Event Section:</Text>
        <Text style={styles.value}>{details.eventSection}</Text>
        <Text style={styles.label}>Event Semester:</Text>
        <Text style={styles.value}>{details.eventSemester}</Text>
        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.value}>{details.startdate}</Text>
        <Text style={styles.label}>Start Time:</Text>
        <Text style={styles.value}>{details.starttime}</Text>
        <Text style={styles.label}>End Time:</Text>
        <Text style={styles.value}>{details.Endtime}</Text>
        <Text style={styles.label}>Chief Guest Name:</Text>
        <Text style={styles.value}>{details.CG_Name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{details.Email}</Text>
        <Text style={styles.label}>Event Type:</Text>
        <Text style={styles.value}>{details.eventype}</Text>
        <Text style={styles.label}>Event Amount:</Text>
        <Text style={styles.value}>{details.amount}</Text>
      </View>
      <Text style={styles.question}>Are you coming to the event?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleYesPress}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNoPress}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83f2cd',
    paddingVertical: hp('2.5%'), // Responsive padding vertical
    paddingHorizontal: wp('2.5%'), // Responsive padding horizontal
  },
  header: {
    fontSize: wp('7%'), // Responsive font size
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp('2.5%'), // Responsive margin bottom
    color: 'black',
  },
  detailItem: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'), // Responsive border radius
    padding: wp('4%'), // Responsive padding
    marginBottom: hp('2%'), // Responsive margin bottom
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: wp('0.5%'), // Responsive shadow radius
    elevation: 3,
  },
  label: {
    fontSize: wp('5%'), // Responsive font size
    fontWeight: '600',
    marginBottom: hp('0.5%'), // Responsive margin bottom
    color: 'green',
    textAlign: 'center',
  },
  value: {
    fontSize: wp('4.5%'), // Responsive font size
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  question: {
    fontSize: wp('5%'), // Responsive font size
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: hp('2%'), // Responsive margin bottom
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('2.5%'), // Responsive margin bottom
  },
  button: {
    backgroundColor: '#b8605a',
    paddingVertical: hp('1.5%'), // Responsive padding vertical
    paddingHorizontal: wp('10%'), // Responsive padding horizontal
    borderRadius: wp('2%'), // Responsive border radius
  },
  buttonText: {
    fontSize: wp('5%'), // Responsive font size
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default InvitationDetails;
