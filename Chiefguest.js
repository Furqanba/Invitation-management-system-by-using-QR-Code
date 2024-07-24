import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {url} from './URL';

const Chiefguest = ({navigation, route}) => {
  const {
    userDetails,
    eventname,
    venue,
    startdate,
    starttime,
    enddate,
    endtime,
    allowGuest,
    selectedDiscipline,
    selectedSemesters,
    selectedSections,
  } = route.params;
  const [eventtype, setEventtype] = useState('Un-Paid');
  const [chiefGuests, setChiefGuests] = useState([
    {
      cgName: '',
      cgEmail: '',
      cgnumber: '',
      cgstatus: '',
      amount: '',
    },
  ]);
  const [amountPaid, setAmountPaid] = useState('');

  const handleChange = (index, field, value) => {
    const updatedChiefGuests = [...chiefGuests];
    updatedChiefGuests[index][field] = value;
    setChiefGuests(updatedChiefGuests);
  };

  const addChiefGuest = () => {
    setChiefGuests([
      ...chiefGuests,
      {
        cgName: '',
        cgEmail: '',
        cgnumber: '',
        cgstatus: '',
        amount: '',
      },
    ]);
  };

  const Nextbutton = async () => {
    console.log('Selected Sections:', selectedSections);
    console.log('Event Name:', eventname);
    console.log('Venue:', venue);
    console.log('Start Date:', startdate);
    console.log('Start Time:', starttime);
    console.log('End Date:', enddate);
    console.log('End Time:', endtime);

    const formattedSections = [];

    // Extract and format selectedSections
    Object.keys(selectedSections).forEach(discipline => {
      Object.keys(selectedSections[discipline]).forEach(semester => {
        Object.keys(selectedSections[discipline][semester]).forEach(
          sectionId => {
            formattedSections.push({
              discipline,
              semester,
              secId: sectionId,
              secName: `Section ${sectionId}`, // Adjust if you have the section name somewhere
            });
          },
        );
      });
    });

    console.log('Formatted Sections:', formattedSections);

    chiefGuests.forEach((guest, index) => {
      console.log(`Chief Guest ${index + 1} Name:`, guest.cgName);
      console.log(`Chief Guest ${index + 1} Email:`, guest.cgEmail);
      console.log(`Chief Guest ${index + 1} Number:`, guest.cgnumber);
      console.log(`Chief Guest ${index + 1} Status:`, guest.cgstatus);
      console.log(`Chief Guest ${index + 1} Amount:`, guest.amount);
    });

    let list = {
      EventName: eventname,
      EventStatus: 'Active',
      starttime: starttime,
      Endtime: endtime,
      startdate: startdate,
      enddate: enddate,
      userid: '1',
      societyid: '1',
      Venuename: venue,
      Event_Type: eventtype,
      Allow_Guest: allowGuest,
      ChiefGuests: chiefGuests.map(guest => ({
        CG_Name: guest.cgName,
        Email: guest.cgEmail,
        number: guest.cgnumber,
        Cheif_Status: guest.cgstatus,
      })),
      eventamount: amountPaid,
      secList: formattedSections,
    };
    console.log('Formatted List:', list);

    const response = await fetch(url + 'CreateEvents/EventCreation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list),
    });

    if (response.ok) {
      var ans = await response.json();
      console.log(ans);
      Alert.alert('Event Create Successfuly');
      navigation.navigate('Home', {userDetails});
    } else {
      console.log('Error in API call');
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#83f2cd', flex: 1}}>
      <Text
        style={{
          fontSize: hp(4),
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Chief Guest Info
      </Text>

      {chiefGuests.map((guest, index) => (
        <View key={index}>
          <View style={{marginTop: hp(0.5)}}>
            <Text
              style={{
                fontSize: hp(3),
                margin: 10,
                color: 'black',
                fontWeight: '600',
                marginLeft: hp(9),
              }}>
              Guest Name
            </Text>
            <TextInput
              style={{
                borderWidth: 2,
                borderRadius: 20,
                width: wp(64),
                fontSize: hp(2),
                fontWeight: '800',
                textAlign: 'center',
                marginLeft: hp(9),
              }}
              value={guest.cgName}
              placeholder="Enter Name"
              onChangeText={text => handleChange(index, 'cgName', text)}
            />
          </View>

          <View style={{marginTop: hp(0.5)}}>
            <Text
              style={{
                fontSize: hp(3),
                margin: 10,
                color: 'black',
                fontWeight: '600',
                marginLeft: hp(9),
              }}>
              Email
            </Text>
            <TextInput
              style={{
                borderWidth: 2,
                borderRadius: 20,
                width: wp(64),
                fontSize: hp(2),
                fontWeight: '800',
                textAlign: 'center',
                marginLeft: hp(9),
              }}
              value={guest.cgEmail}
              placeholder="abc5937@gmail.com"
              onChangeText={text => handleChange(index, 'cgEmail', text)}
            />
          </View>

          <View style={{marginTop: hp(0.5)}}>
            <Text
              style={{
                fontSize: hp(3),
                margin: 10,
                color: 'black',
                fontWeight: '600',
                marginLeft: hp(9),
              }}>
              Contact Number
            </Text>
            <TextInput
              style={{
                borderWidth: 2,
                borderRadius: 20,
                width: wp(64),
                fontSize: hp(2),
                fontWeight: '800',
                textAlign: 'center',
                marginLeft: hp(9),
              }}
              value={guest.cgnumber}
              placeholder="03145125025"
              onChangeText={text => handleChange(index, 'cgnumber', text)}
            />
          </View>

          <Text
            style={{
              fontSize: hp(3),
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: 7,
            }}>
            Status
          </Text>
          <Picker
            selectedValue={guest.cgstatus}
            onValueChange={val => handleChange(index, 'cgstatus', val)}
            style={{
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: 9,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderColor: '#ccc',
              width: '60%', // Adjust the width as needed
              alignSelf: 'center', // Center the Picker horizontally
              marginBottom: 20,
              color: 'black',
            }}>
            <Picker.Item label="VIP" value="VIP" />
            <Picker.Item label="V-VIP" value="V-VIP" />
          </Picker>
        </View>
      ))}

      <View style={{marginTop: hp(0.5)}}>
        <Text
          style={{
            fontSize: hp(3),
            marginTop: hp(0),
            color: 'black',
            fontWeight: '600',
            marginLeft: hp(9),
          }}>
          Event Type
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: hp(9),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setEventtype('Un-Paid')}>
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              {eventtype === 'Un-Paid' && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#000',
                  }}
                />
              )}
            </View>
            <Text style={{fontSize: hp(2.5)}}>Unpaid</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}
            onPress={() => setEventtype('Paid')}>
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              {eventtype === 'Paid' && (
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#000',
                  }}
                />
              )}
            </View>
            <Text style={{fontSize: hp(2.5)}}>Paid</Text>
          </TouchableOpacity>
        </View>
      </View>

      {eventtype === 'Paid' && (
        <View style={{marginTop: hp(0.5)}}>
          <Text
            style={{
              fontSize: hp(3),
              marginTop: hp(0),
              color: 'black',
              fontWeight: '600',
              marginLeft: hp(9),
            }}>
            Amount Paid
          </Text>
          <TextInput
            style={{
              borderWidth: 2,
              borderRadius: 20,
              width: wp(64),
              fontSize: hp(2),
              fontWeight: '800',
              textAlign: 'center',
              marginLeft: hp(9),
            }}
            value={amountPaid}
            placeholder="Enter Amount"
            onChangeText={text => setAmountPaid(text)}
          />
        </View>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: 'lightgreen',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          margin: 20,
        }}
        onPress={addChiefGuest}>
        <Text style={{fontSize: hp(2.5), color: 'black'}}>Add Chief Guest</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#87ceeb',
            paddingVertical: 15,
            paddingHorizontal: 40,
            borderRadius: 20,
            marginHorizontal: 10,
          }}
          onPress={Nextbutton}>
          <Text style={{fontSize: hp(2.5), color: 'black'}}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Chiefguest;
