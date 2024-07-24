import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {url} from './URL';

// const QRCODE = require('./images/Qr.png');

const StudentInvitation = ({navigation, route}) => {
  const {stdDetails, userDetails} = route.params;
  const [stdEvent, setStdEvent] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const {did, secId, sem_id} = stdDetails;
      console.log('did', did);
      console.log('stdDetails', stdDetails);
      console.log('secId', secId);
      console.log('sem_id', sem_id);

      const formdata = new FormData();
      formdata.append('did', did);
      formdata.append('sem_id', sem_id);
      formdata.append('secId', secId);
      try {
        const response = await fetch(`${url}EventInfo/allEvents`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formdata,
        });
        if (response.ok) {
          const result = await response.json();
          setStdEvent(result);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [stdDetails, userDetails]);

  const handleNextButton = () => {
    Alert.alert('Share Successfully');
    // navigation.navigate('QR Code');
  };

  const handleEventDetails = item => {
    console.log('stdDetails', stdDetails);
    const {did, secId, sem_id} = stdDetails;
    console.log(secId, did, sem_id, userDetails);
    navigation.navigate('InvitationDetails', {
      details: item,
      did: did,
      secId: secId,
      sem_id: sem_id,
      stdDetails: stdDetails,
    });
  };

  const renderEventItem = ({item}) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => handleEventDetails(item)}>
      <Text style={styles.eventName}>{item.Event_name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.qrCodeContainer}>
        {/* Uncomment and use QRCode component if available */}
        {/* <QRCode value="Your QR Code Value" size={hp(30)} /> */}
        {/* <Image source={QRCODE} style={styles.qrCodeImage} /> */}
      </View>
      {stdEvent.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.eventItem}
          onPress={() => handleEventDetails(item)}>
          <Text style={styles.eventName}>{item.Event_name}</Text>
        </TouchableOpacity>
      ))}
      {/* <TouchableOpacity style={styles.nextButton} onPress={handleNextButton}>
        <Text style={styles.nextButtonText}>Share-QR-Code</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83f2cd',
    padding: hp(3),
  },
  title: {
    fontSize: hp(6),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(3),
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginBottom: hp(3),
  },
  qrCodeImage: {
    width: wp(60),
    height: hp(30),
  },
  eventList: {
    flexGrow: 1,
    paddingBottom: hp(2),
  },
  eventItem: {
    backgroundColor: 'white',
    padding: hp(2),
    marginVertical: hp(1),
    marginHorizontal: wp(5),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventName: {
    fontSize: hp(2.5),
    color: 'black',
  },
  nextButton: {
    backgroundColor: '#b8605a',
    padding: hp(2),
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    width: wp(70),
    marginTop: hp(3),
  },
  nextButtonText: {
    color: 'white',
    fontSize: hp(2.5),
  },
});

export default StudentInvitation;
