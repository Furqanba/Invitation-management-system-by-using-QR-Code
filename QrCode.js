import React, {useEffect, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const QrCode = ({navigation, route}) => {
  const [qrValue, setQrValue] = useState('');
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
  } = route.params || {}; // Add default value to prevent undefined error

  useEffect(() => {
    console.log(
      'guestDetails',
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
    console.log('Arid', stdDetails.Std_Arid);
    setQrValue(stdDetails.Std_Arid);
    console.log('QR code', qrValue);
  }, [
    guestDetails,
    secId,
    did,
    sem_id,
    stdDetails,
    Eventid,
    EventAmount,
    TicketCost,
    amount,
  ]);

  const Nextbutton = () => {
    navigation.navigate('Student Dashboard', {stdDetails: stdDetails});
  };

  // Ensure stdDetails and guestDetails exist before accessing their properties

  return (
    <View style={{backgroundColor: '#83f2cd', flex: 1}}>
      <View>
        <Text
          style={{
            fontSize: 50,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: hp(3),
          }}>
          QR Code
        </Text>
        <View style={{alignSelf: 'center'}}>
          {qrValue ? <QRCode value={qrValue} size={200} /> : null}
        </View>
      </View>
      {/* <Text
        style={{
          fontSize: 30,
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: hp(3),
        }}>
        Take Screenshot3
      </Text> */}
      <TouchableOpacity onPress={Nextbutton}>
        <View
          style={{
            backgroundColor: '#b8605a',
            padding: 5,
            borderRadius: 50,
            marginLeft: hp(7),
            width: wp(70),
            height: hp(5),
            margin: hp(2),
            marginTop: hp(30),
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', marginLeft: hp(1), fontSize: hp(3)}}>
            Done
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QrCode;
