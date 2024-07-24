import React, {useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';

import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {url} from './URL';
import CheckBox from 'react-native-check-box';

const Createeventstudent = ({navigation, route}) => {
  const {eventname, venue, startdate, starttime, enddate, endtime} =
    route.params;
  const [selectedGender, setSelectedGender] = useState(null);
  const [semester, setsemester] = useState('');
  const [decepline, setdecepline] = useState('');
  const [section, setsection] = useState('');

  const [isPaid, setIsPaid] = useState(false);
  const [EventType, setEventType] = useState('');

  const [allSemester, setAllSemester] = useState([]);
  const [allDicipline, setAllDicipline] = useState([]);
  const [allSection, setAllSection] = useState([]);

  const [allDiscipline, setAllDiscipline] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState([]);
  useEffect(() => {
    console.log('Event Name:', eventname);
    console.log('Venue:', venue);
    console.log('Start Date:', startdate);
    console.log('Start Time:', starttime);
    console.log('End Date:', enddate);
    console.log('End Time:', endtime);

    // const fetchSemester = async () => {
    //   try {
    //     const response = await fetch(
    //       url+'StudentDetails/allSemester',
    //       {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       },
    //     );
    //     if (response.ok) {
    //       const data = await response.json();
    //       setAllSemester(data);
    //       console.log(data);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    const fetchDicipline = async () => {
      try {
        const response = await fetch(url + 'StudentDetails/allDicipline', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAllDicipline(data);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const toggleCheckbox = disciplineId => {
      const selectedIndex = selectedDiscipline.indexOf(disciplineId);
      let updatedSelectedDiscipline = [...selectedDiscipline];
      if (selectedIndex === -1) {
        updatedSelectedDiscipline.push(disciplineId);
      } else {
        updatedSelectedDiscipline.splice(selectedIndex, 1);
      }
      setSelectedDiscipline(updatedSelectedDiscipline);
    };

    // const fetchSection = async () => {
    //   try {
    //     const response = await fetch(
    //       url+'StudentDetails/allSection',
    //       {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       },
    //     );
    //     if (response.ok) {
    //       const data = await response.json();
    //       setAllSection(data);
    //       console.log(data);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchSemester();
    fetchDicipline();
    // fetchSection();
  }, []);
  const handlePaidToggle = () => {
    setIsPaid(!isPaid);
    // Reset input text when switching between paid and unpaid
    setEventType('');
  };

  const handleInputChange = text => {
    setEventType(text);
  };

  const handleGenderSelect = gender => {
    setSelectedGender(gender);
  };
  const Nextbutton = () => {
    // if(isPaid==false){
    //   navigation.navigate('Chief Guest Details',{
    //     eventname: eventname,
    //     venue: venue,
    //     startdate: startdate,
    //     starttime: starttime,
    //     enddate: enddate,
    //     endtime: endtime,
    //     semester:semester,
    //     dicipline:decepline,
    //     section:section,
    //     gender:selectedGender,
    //     eventType:'Un-Paid',
    //   });
    // }
    // else{
    //   navigation.navigate('Chief Guest Details',{
    //     eventname: eventname,
    //     venue: venue,
    //     startdate: startdate,
    //     starttime: starttime,
    //     enddate: enddate,
    //     endtime: endtime,
    //     semester:semester,
    //     dicipline:decepline,
    //     section:section,
    //     gender:selectedGender,
    //     eventType:'Paid',
    //   });
    // }
  };

  return (
    <View style={{backgroundColor: '#83f2cd', flex: 1}}>
      {/* <View>
        <Text
          style={{
            fontSize: hp(4),
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          For
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: hp(2),
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
          onPress={() => handleGenderSelect('male')}>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: 'black',
              marginRight: 8,
              backgroundColor:
                selectedGender === 'male' ? 'black' : 'transparent',
            }}
          />
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: hp(2)}}>
            Male
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
          onPress={() => handleGenderSelect('female')}>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: 'black',
              marginRight: 8,
              backgroundColor:
                selectedGender === 'female' ? 'black' : 'transparent',
            }}
          />
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: hp(2)}}>
            Female
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
          onPress={() => handleGenderSelect('both')}>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: 'black',
              marginRight: 8,
              backgroundColor:
                selectedGender === 'both' ? 'black' : 'transparent',
            }}
          />
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: hp(2)}}>
            Both
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: hp(3.5),
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Semester
      </Text>
      <Picker
        selectedValue={semester}
        onValueChange={val => {
          setsemester(val);
        }}
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
        }}>
        <Picker.Item label="Select Semester" value="Select Semester" />
        {allSemester.map(item => (
          <Picker.Item
            label={item.semName}
            value={item.semName}
            key={item.sid}
          />
        ))}
      </Picker> */}
      <Text
        style={{
          fontSize: hp(3.5),
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: hp(2),
        }}>
        Choose Decipline
      </Text>
      <Picker
        selectedValue={decepline}
        onValueChange={val => {
          setdecepline(val);
        }}
        style={{
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: 9,
          borderWidth: 1,
          marginTop: hp(2),
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderColor: '#ccc',
          width: '60%', // Adjust the width as needed
          alignSelf: 'center', // Center the Picker horizontally
          marginBottom: 20,
        }}>
        <Picker.Item label="Select Dicipline" value="Select Dicipline" />
        {allDicipline.map(item => (
          <Picker.Item
            label={item.Dec_name}
            value={item.Dec_name}
            key={item.did}
          />
        ))}
      </Picker>

      <View>
        {allDiscipline.map(discipline => (
          <View key={discipline.id}>
            <CheckBox
              value={selectedDiscipline.includes(discipline.id)}
              onValueChange={() => toggleCheckbox(discipline.id)}
            />
            <Text>{discipline.name}</Text>
          </View>
        ))}
      </View>

      {/* <Text
        style={{
          fontSize: hp(3.5),
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Section
      </Text>

      <Picker
        selectedValue={section}
        onValueChange={val => {
          setsection(val);
        }}
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
        }}>
        <Picker.Item label="Select Section" value="Select Section" />
        {allSection.map(item => (
          <Picker.Item
            label={item.secName}
            value={item.secName}
            key={item.secId}
          />
        ))}
      </Picker> */}

      {/* <Text
        style={{
          fontSize: hp(3.5),
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Event Type
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: hp(2),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={handlePaidToggle}>
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: 'black',
                marginRight: 8,
                backgroundColor: isPaid ? 'black' : 'transparent',
              }}
            />
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: hp(2)}}>
            Paid
          </Text>
        </View>

        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity onPress={handlePaidToggle}>
            <View
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: 'black',
                marginRight: 8,
                backgroundColor: !isPaid ? 'black' : 'transparent',
              }}
            />
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', color: 'black', fontSize: hp(2)}}>
            Unpaid
          </Text>
        </View>

        {isPaid && (
          <TextInput
            style={{
              textAlign: 'center',
              fontWeight: '800',
              borderWidth: 2,
              borderColor: 'black',
              marginTop: 10,
              paddingHorizontal: 10,
              borderRadius: hp(2),
            }}
            placeholder="Enter payment details"
            value={EventType}
            onChangeText={handleInputChange}
          />
        )}
      </View> */}

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
            marginTop: hp(13),
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', marginLeft: hp(1), fontSize: hp(3)}}>
            Next{' '}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Createeventstudent;
