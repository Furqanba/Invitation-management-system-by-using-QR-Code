import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, Alert, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const createeventimage = require('./images/createevents.png');
const pendingevent = require('./images/invitaionnew.png');
const addgusts = require('./images/Wallet.png');
const completedevevt = require('./images/Upcomingevents.png');
const invitlist = require('./images/Completedevent.png');
const upcomingevents = require('./images/pendingevents.png');

const Page1 = ({navigation, route}) => {
  const userDetails = (route.params && route.params.userDetails) || null;

  const [uname, setUname] = useState('');

  function pres() {
    navigation.navigate('Create Event', {userDetails: userDetails});
  }
  useEffect(() => {
    console.log('UserDetails', userDetails);
  });

  function Invitations() {
    Alert.alert('Pending Events');
    navigation.navigate('Pending Events');
  }
  function wallet() {
    Alert.alert('Admin Wallet Dashboard');
    navigation.navigate('Admin Wallet Dashboard');
  }
  function Upcomingevet() {
    Alert.alert('Upcoming Events');
    navigation.navigate('Upcoming Events');
  }
  function Completedevent() {
    Alert.alert('Completed Events');
    navigation.navigate('Completed Events');
  }
  function Pendingevents() {
    Alert.alert('Pending Events');
    navigation.navigate('Pending Events');
  }

  return (
    <ScrollView style={{backgroundColor: '#83f2cd', flex: 1}}>
      <Text
        style={{
          fontSize: hp(6),
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          marginVertical: hp(2),
        }}>
        Welcome
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        <Pressable
          style={({pressed}) => ({
            opacity: pressed ? 0.6 : 1,
            marginBottom: hp(2),
          })}
          onPress={pres}>
          <Image
            source={createeventimage}
            style={{
              width: wp(40),
              height: hp(20),
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              fontSize: hp(2.5),
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}>
            Create Event
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => ({
            opacity: pressed ? 0.6 : 1,
            marginBottom: hp(2),
          })}
          onPress={Invitations}>
          <Image
            source={pendingevent}
            style={{
              width: wp(40),
              height: hp(20),
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              fontSize: hp(2.5),
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Invitations
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => ({
            opacity: pressed ? 0.6 : 1,
            marginBottom: hp(2),
          })}
          onPress={wallet}>
          <Image
            source={addgusts}
            style={{
              width: wp(40),
              height: hp(20),
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              fontSize: hp(2.5),
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Amount Request
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => ({
            opacity: pressed ? 0.6 : 1,
            marginBottom: hp(2),
          })}
          onPress={Upcomingevet}>
          <Image
            source={completedevevt}
            style={{
              width: wp(40),
              height: hp(20),
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              fontSize: hp(2.5),
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Upcoming Events
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => ({
            opacity: pressed ? 0.6 : 1,
            marginBottom: hp(2),
          })}
          onPress={Completedevent}>
          <Image
            source={invitlist}
            style={{
              width: wp(40),
              height: hp(20),
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              fontSize: hp(2.5),
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Completed Events
          </Text>
        </Pressable>

        <Pressable
          style={({pressed}) => ({
            opacity: pressed ? 0.6 : 1,
            marginBottom: hp(2),
          })}
          onPress={Pendingevents}>
          <Image
            source={upcomingevents}
            style={{
              width: wp(40),
              height: hp(20),
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              fontSize: hp(2.5),
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Pending Events
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Page1;
