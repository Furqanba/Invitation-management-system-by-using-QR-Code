import React, {useEffect} from 'react';
import {View, Text, Image, Pressable, Alert, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const pendingevent = require('./images/invitaionnew.png');
const addgusts = require('./images/Wallet.png');
const completedevevt = require('./images/Upcomingevents.png');
const invitlist = require('./images/Completedevent.png');
const upcomingevents = require('./images/pendingevents.png');

const StudentDeshbord = ({navigation, route}) => {
  const {stdDetails} = route.params;
  const {Student_Name} = stdDetails; // Extracting the Student_Name

  useEffect(() => {
    console.log('studentdasbordscreenData', stdDetails);
  }, [stdDetails]); // Adding stdDetails as dependency to useEffect

  function Invitations() {
    Alert.alert('Invitation');
    navigation.navigate('Invitation', {
      stdDetails: stdDetails,
    });
  }
  function wallet() {
    Alert.alert('Student Wallet');
    navigation.navigate('Student Wallet', {stdDetails: stdDetails});
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
      <Text
        style={{
          fontSize: hp(3),
          color: 'white',
          textAlign: 'center',
          marginBottom: hp(1),
          fontWeight: '800',
        }}>
        ****{Student_Name}****
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
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
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
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}>
            My Wallet
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
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
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
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
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
              textAlign: 'center',
              color: 'black',
              fontWeight: 'bold',
            }}>
            Pending Events
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default StudentDeshbord;
