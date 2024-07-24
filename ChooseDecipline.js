import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert, // Step 1: Import Alert
} from 'react-native';
import CheckBox from 'react-native-check-box';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {url} from './URL';

const ChooseDecipline = ({navigation, route}) => {
  const [allDiscipline, setAllDiscipline] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState([]);
  const {
    userDetails,
    eventname,
    venue,
    startdate,
    starttime,
    enddate,
    endtime,
    allowGuest,
  } = route.params;
  useEffect(() => {
    console.log(eventname);
    console.log(venue);
    console.log(startdate);
    console.log(starttime);
    console.log(endtime);
    console.log(allowGuest);
  });
  useEffect(() => {
    console.log('UserDetails= ', userDetails);
  });

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await fetch(url + 'StudentDetails/allDicipline', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAllDiscipline(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiscipline();
  }, []);

  const toggleCheckbox = disciplineName => {
    const updatedSelectedDiscipline = [...selectedDiscipline];
    if (updatedSelectedDiscipline.includes(disciplineName)) {
      setSelectedDiscipline(
        updatedSelectedDiscipline.filter(name => name !== disciplineName),
      );
    } else {
      setSelectedDiscipline([...updatedSelectedDiscipline, disciplineName]);
    }
  };

  const isDisciplineSelected = disciplineName => {
    return selectedDiscipline.includes(disciplineName);
  };

  const selectAll = () => {
    const allDisciplineNames = allDiscipline.map(
      discipline => discipline.Dec_name,
    );
    setSelectedDiscipline(allDisciplineNames);
  };

  const Nextbutton = () => {
    if (selectedDiscipline.length === 0) {
      // Step 2: Check if any item is selected
      Alert.alert('No item selected', 'Please select at least one discipline.');
    } else {
      navigation.navigate('Choose Semester', {
        userDetails,
        eventname,
        venue,
        startdate,
        starttime,
        endtime,
        allowGuest,
        selectedDiscipline,
      });
      console.log('Discipline :', selectedDiscipline);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#83f2cd', flex: 1}}>
      <Text
        style={{
          fontSize: hp(3.5),
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: hp(2),
        }}>
        Choose Discipline
      </Text>
      <TouchableOpacity onPress={selectAll}>
        <View
          style={{
            backgroundColor: '#b8605a',
            padding: 5,
            borderRadius: 100,
            marginLeft: hp(12),
            width: wp(50),
            height: hp(5),
            margin: hp(2),
            marginTop: hp(2),
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', marginLeft: hp(1), fontSize: hp(3)}}>
            Select All
          </Text>
        </View>
      </TouchableOpacity>

      {allDiscipline.map(discipline => (
        <View
          key={discipline.Dec_name}
          style={{
            flexDirection: 'row',
            marginLeft: hp(2),
            borderWidth: hp(0.2),
            margin: hp(2),
            borderRadius: hp(1),
            backgroundColor: '#d0d9db',
            justifyContent: 'space-evenly',
          }}>
          <CheckBox
            style={{flexDirection: 'row', marginTop: hp(2)}}
            isChecked={isDisciplineSelected(discipline.Dec_name)}
            onClick={() => toggleCheckbox(discipline.Dec_name)}
          />
          <Text
            style={[
              styles.text,
              isDisciplineSelected(discipline.Dec_name) && styles.selectedText,
            ]}>
            {discipline.Dec_name}
          </Text>
        </View>
      ))}

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
            marginTop: hp(3),
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', marginLeft: hp(1), fontSize: hp(3)}}>
            Next{' '}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: hp(3),
    marginVertical: 10,
    marginTop: hp(4),
    fontWeight: '500',
    height: hp(5),
    width: wp(80),
  },
  selectedText: {
    backgroundColor: '#55bad9',
    borderRadius: hp(1),
  },
});

export default ChooseDecipline;
