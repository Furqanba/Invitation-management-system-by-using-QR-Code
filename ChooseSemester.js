import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {url} from './URL';
import CheckBox from 'react-native-check-box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChooseSemester = ({navigation, route}) => {
  const {
    userDetails,
    eventname,
    venue,
    startdate,
    starttime,
    endtime,
    allowGuest,
    selectedDiscipline,
  } = route.params;
  useEffect(() => {
    console.log('UserDetails:= ', userDetails);
  });
  const [BSCS, setBscs] = useState([]);
  const [BSAI, setBsai] = useState([]);
  const [BSIT, setBsit] = useState([]);
  const [BSSE, setBsse] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);

  useEffect(() => {
    console.log('CS');
    console.log(eventname);
    console.log(venue);
    console.log(startdate);
    console.log(starttime);
    console.log(endtime);
    console.log(allowGuest);
    console.log(selectedDiscipline);
  });
  useEffect(() => {
    const fetchSemester = async () => {
      try {
        console.log(selectedDiscipline);
        for (let i = 0; i < selectedDiscipline.length; i++) {
          const formdata = new FormData();
          formdata.append('Dec_name', selectedDiscipline[i]);
          const response = await fetch(
            url + 'EventCreation/diciplineSemesters',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              body: formdata,
            },
          );
          if (response.ok) {
            const data = await response.json();
            switch (selectedDiscipline[i]) {
              case 'BS-CS':
                setBscs(data);
                break;
              case 'BS-AI':
                setBsai(data);
                break;
              case 'BS-IT':
                setBsit(data);
                break;
              case 'BS-SE':
                setBsse(data);
                break;
              default:
                break;
            }
            // Initialize selected semesters for each discipline
            setSelectedSemesters(prevState => ({
              ...prevState,
              [selectedDiscipline[i]]: [],
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSemester();
  }, [selectedDiscipline]);

  const toggleCheckbox = (discipline, semester) => {
    setSelectedSemesters(prevState => {
      const updatedSelectedSemesters = [...prevState[discipline]];
      const index = updatedSelectedSemesters.indexOf(semester);
      if (index !== -1) {
        updatedSelectedSemesters.splice(index, 1);
      } else {
        updatedSelectedSemesters.push(semester);
      }
      return {...prevState, [discipline]: updatedSelectedSemesters};
    });
  };

  // const toggleCheckbox = (discipline, semester) => {
  //   setSelectedSemesters(prevState => {
  //     const updatedSelectedSemesters = [...prevState[discipline]];
  //     const index = updatedSelectedSemesters.indexOf(semester);
  //     if (index !== -1) {
  //       updatedSelectedSemesters.splice(index, 1);
  //     } else {
  //       updatedSelectedSemesters.push(semester);
  //     }
  //     return {...prevState, [discipline]: updatedSelectedSemesters};
  //   });
  // };

  // const toggleCheckbox = semester => {
  //   if (selectedSemesters.includes(semester)) {
  //     setSelectedSemesters(selectedSemesters.filter(item => item !== semester));
  //   } else {
  //     setSelectedSemesters([...selectedSemesters, semester]);
  //   }
  // };

  // const selectAll = () => {
  //   let allSemesters = {};
  //   selectedDiscipline.forEach(discipline => {
  //     // Concatenate semesters from each discipline
  //     allSemesters[discipline] = getSemestersByDiscipline(discipline).map(
  //       item => item.semName,
  //     );
  //   });
  //   setSelectedSemesters(allSemesters);
  // };

  const selectAll = discipline => {
    setSelectedSemesters(prevState => {
      const allSemesters = {...prevState}; // Create a copy of the selectedSemesters state
      const semesters = getSemestersByDiscipline(discipline).map(
        item => item.semName,
      );
      allSemesters[discipline] = semesters;
      return allSemesters;
    });
  };

  // const navigateToNextScreen = () => {
  //   if (selectedSemesters.length === 0) {
  //     // Step 2: Check if any item is selected
  //     Alert.alert('No item selected', 'Please select at least one Semester.');
  //   } else {
  //     navigation.navigate('Choose Section', {
  //       selectedDiscipline,
  //       selectedSemesters,
  //     });
  //   }
  // };

  const navigateToNextScreen = () => {
    // Check if there is any selected semester
    const isAnySemesterSelected = Object.values(selectedSemesters).some(
      semesters => semesters.length > 0,
    );

    if (!isAnySemesterSelected) {
      Alert.alert('No item selected', 'Please select at least one Semester.');
    } else {
      navigation.navigate('Choose Section', {
        userDetails,
        eventname,
        venue,
        startdate,
        starttime,
        endtime,
        allowGuest,
        selectedDiscipline,
        selectedSemesters,
      });
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#83f2cd', flex: 1}}>
      <Text style={styles.title}>Choose Semester</Text>

      {selectedDiscipline.map(discipline => (
        <View key={discipline}>
          <Text style={styles.selectedDisciplineText}>
            Selected Discipline: {discipline}
          </Text>
          <TouchableOpacity
            onPress={() => selectAll(discipline)}
            style={styles.button}>
            <Text style={styles.buttonText}>Select All</Text>
          </TouchableOpacity>

          {getSemestersByDiscipline(discipline).map(item => (
            <View
              key={`${discipline}_${item.semName}`}
              style={styles.semesterItem}>
              <CheckBox
                isChecked={selectedSemesters[discipline]?.includes(
                  item.semName,
                )}
                onClick={() => toggleCheckbox(discipline, item.semName)} // Pass discipline and semester
              />
              <Text>{item.semName}</Text>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity onPress={navigateToNextScreen} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  function getSemestersByDiscipline(discipline) {
    switch (discipline) {
      case 'BS-CS':
        return BSCS;
      case 'BS-AI':
        return BSAI;
      case 'BS-IT':
        return BSIT;
      case 'BS-SE':
        return BSSE;
      default:
        return [];
    }
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(2),
  },
  selectedDisciplineText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    marginTop: hp(1),
  },
  semesterItem: {
    flexDirection: 'row',
    marginVertical: hp(0.7),
    padding: hp(1),
    backgroundColor: '#fff',
    borderRadius: hp(1),
  },
  button: {
    backgroundColor: '#b8605a',
    padding: hp(1),
    borderRadius: hp(1),
    margin: hp(1),
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: hp(2),
  },
});

export default ChooseSemester;
