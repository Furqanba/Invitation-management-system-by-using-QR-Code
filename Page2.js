import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Switch,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {url} from './URL';

const Page2 = ({navigation, route}) => {
  const {userDetails} = route.params;
  const [eventName, setEventName] = useState('');
  const [venue, setVenue] = useState('');
  const [allowGuest, setAllowGuest] = useState('false');
  const [allVenues, setAllVenues] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [studentChecked, setStudentChecked] = useState(false);
  const [facultyChecked, setFacultyChecked] = useState(false);
  const [societyChecked, setSocietyChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    console.log('UserDetails: ', userDetails);
  });

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    setSelectedDate(selectedDate || new Date());
  };

  const onChangeStartTime = (event, selectedTime) => {
    setShowStartTimePicker(false);
    setStartTime(selectedTime || new Date());
  };

  const onChangeEndTime = (event, selectedTime) => {
    setShowEndTimePicker(false);
    setEndTime(selectedTime || new Date());
  };

  const formatTime = time => {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const NextButtonHandler = () => {
    if (!eventName || !venue || !selectedDate || !selectedEndDate) {
      Alert.alert('All fields are required.');
      return;
    }
    const selectedRoles = {
      userDetails: userDetails,
      eventname: eventName,
      venue: venue,
      startdate: selectedDate.toLocaleDateString(),
      starttime: formatTime(startTime),
      enddate: selectedEndDate.toLocaleDateString(),
      endtime: formatTime(endTime),
      allowGuest: allowGuest,
    };

    console.log(allowGuest);
    console.log('selectedRoles', {
      userDetails: userDetails,
      eventname: eventName,
      venue: venue,
      startdate: selectedDate.toLocaleDateString(),
      starttime: formatTime(startTime),
      enddate: selectedEndDate.toLocaleDateString(),
      endtime: formatTime(endTime),
      allowGuest: allowGuest,
    });

    if (studentChecked) {
      navigation.navigate('Choose Decipline', selectedRoles);
    } else if (facultyChecked) {
      navigation.navigate('Faculty Event', selectedRoles);
    } else if (societyChecked) {
      navigation.navigate('Society Event', selectedRoles);
    } else if (allChecked) {
      navigation.navigate('Create Event Both', selectedRoles);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await fetch(`${url}Venue/allVenues`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAllVenues(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <View style={{backgroundColor: '#83f2cd', flex: 1}}>
      <ScrollView>
        <View>
          <Text style={styles.headerText}>Create Event</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Event Name"
              onChangeText={setEventName}
              value={eventName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Venue Name</Text>
            <Picker
              selectedValue={venue}
              onValueChange={setVenue}
              style={styles.picker}>
              <Picker.Item label="Select Venue" value="" />
              {allVenues.map(item => (
                <Picker.Item
                  label={item.Venue_name}
                  value={item.Venue_name}
                  key={item.venue_id}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.dateTimeContainer}>
            <Text style={styles.label}>Start Date:</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.buttonText}>Select Date</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.selectedDateText}>
            {selectedDate.toLocaleDateString()}
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <View style={styles.dateTimeContainer}>
            <Text style={styles.label}>Start Time:</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowStartTimePicker(true)}>
              <Text style={styles.buttonText}>Select Time</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.selectedDateText}>{formatTime(startTime)}</Text>

          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={onChangeStartTime}
            />
          )}

          <View style={styles.dateTimeContainer}>
            <Text style={styles.label}>End Time:</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowEndTimePicker(true)}>
              <Text style={styles.buttonText}>Select Time</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.selectedDateText}>{formatTime(endTime)}</Text>

          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={onChangeEndTime}
            />
          )}

          <Text style={styles.sectionHeader}>Event For</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxRow}>
              <View style={styles.checkboxItem}>
                <CheckBox
                  isChecked={studentChecked}
                  onClick={() => setStudentChecked(!studentChecked)}
                  checkBoxColor="black"
                />
                <Text style={styles.label}>Student</Text>
              </View>
              <View style={styles.checkboxItem}>
                <CheckBox
                  isChecked={facultyChecked}
                  onClick={() => setFacultyChecked(!facultyChecked)}
                  checkBoxColor="black"
                />
                <Text style={styles.label}>Faculty</Text>
              </View>
            </View>
            <View style={styles.checkboxRow}>
              <View style={styles.checkboxItem}>
                <CheckBox
                  isChecked={societyChecked}
                  onClick={() => setSocietyChecked(!societyChecked)}
                  checkBoxColor="black"
                />
                <Text style={styles.label}>Society</Text>
              </View>
              <View style={styles.checkboxItem}>
                <CheckBox
                  isChecked={allChecked}
                  onClick={() => setAllChecked(!allChecked)}
                  checkBoxColor="black"
                />
                <Text style={styles.label}>All</Text>
              </View>
            </View>
          </View>

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Allow Guest</Text>
            <Switch
              onValueChange={value => {
                const stringValue = value ? 'true' : 'false';
                setAllowGuest(stringValue);
                console.log(stringValue);
              }}
              value={allowGuest === 'true'}
            />
          </View>

          <TouchableOpacity onPress={NextButtonHandler}>
            <View style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: hp(4.6),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: hp(2),
  },
  inputContainer: {
    marginVertical: hp(1),
    marginHorizontal: wp(8),
  },
  label: {
    fontSize: hp(3),
    marginVertical: hp(0.4),
    color: 'black',
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 20,
    width: '100%',
    fontSize: hp(2),
    fontWeight: '800',
    textAlign: 'center',
    padding: hp(1),
  },
  picker: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    paddingVertical: hp(1),
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  button: {
    backgroundColor: '#b8605a',
    padding: 11,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: hp(2),
  },
  selectedDateText: {
    textAlign: 'center',
    fontSize: hp(2.2),
    marginVertical: hp(1),
  },
  sectionHeader: {
    fontSize: hp(4),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: hp(2),
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Adjusted from 'center' to 'space-evenly'
    marginVertical: hp(2),
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(8),
    marginVertical: hp(2),
  },
  toggleLabel: {
    fontSize: hp(3),
    fontWeight: '600',
    color: 'black',
  },
  nextButton: {
    backgroundColor: '#b8605a',
    padding: 15,
    marginVertical: hp(2),
    marginHorizontal: wp(20),
    borderRadius: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: hp(2.5),
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Page2;
