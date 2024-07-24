import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {RadioButton} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {url} from './URL';

const ChooseSection = ({navigation, route}) => {
  // const {selectedDiscipline = [], selectedSemesters = {}} = route.params || {};
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
  } = route.params;
  const [sections, setSections] = useState({});
  const [selectedSections, setSelectedSections] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [fetchedSemesters, setFetchedSemesters] = useState({});
  const [gender, setGender] = useState({});
  // useEffect(() => {
  //   console.log('ChS');
  //   console.log(eventname);
  //   console.log(venue);
  //   console.log(startdate);
  //   console.log(starttime);
  //   console.log(enddate);
  //   console.log(endtime);
  //   console.log(selectedDiscipline);
  //   console.log(selectedSemesters);
  // });
  useEffect(() => {
    console.log('UserDetails:: ', userDetails);
  });
  useEffect(() => {
    fetchSections();
  }, [selectedSemesters]);

  // const fetchSections = async () => {
  //   try {
  //     const results = {};
  //     const fetched = {...fetchedSemesters};
  //     for (const program in selectedSemesters) {
  //       const semesters = selectedSemesters[program];
  //       results[program] = sections[program] || {};
  //       for (const semester of semesters) {
  //         if (fetched[program]?.includes(semester)) {
  //           continue; // Skip fetching if already fetched
  //         }
  //         const formdata = new FormData();
  //         formdata.append('Dec_name', program);
  //         formdata.append('semName', semester);
  //         const response = await fetch(url + 'EventCreation/sectionSemesters', {
  //           method: 'POST',
  //           headers: {
  //             Accept: 'application/json',
  //             'Content-Type': 'multipart/form-data',
  //           },
  //           body: formdata,
  //         });
  //         if (response.ok) {
  //           const ans = await response.json();
  //           results[program][semester] = ans;
  //           if (!fetched[program]) {
  //             fetched[program] = [];
  //           }
  //           fetched[program].push(semester);
  //         }
  //       }
  //     }
  //     setSections(prevSections => ({...prevSections, ...results}));
  //     setFetchedSemesters(fetched);
  //     console.log('Sections:', JSON.stringify(results, null, 2));
  //   } catch (error) {
  //     console.error('Error fetching sections:', error);
  //   }
  // };

  const fetchSections = async () => {
    try {
      const results = {};
      const fetched = {...fetchedSemesters};
      for (const program in selectedSemesters) {
        const semesters = selectedSemesters[program];
        results[program] = sections[program] || {};
        for (const semester of semesters) {
          if (fetched[program]?.includes(semester)) {
            continue; // Skip fetching if already fetched
          }
          const formdata = new FormData();
          formdata.append('Dec_name', program);
          formdata.append('semName', semester);

          let response, text;

          try {
            response = await fetch(url + 'EventCreation/sectionSemesters', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
              body: formdata,
            });

            text = await response.text();
          } catch (networkError) {
            console.error('Network error:', networkError);
            Alert.alert(
              'Network Error',
              'Failed to fetch data due to network issues.',
            );
            continue;
          }

          if (response.ok) {
            try {
              const ans = JSON.parse(text);
              results[program][semester] = ans;
              if (!fetched[program]) {
                fetched[program] = [];
              }
              fetched[program].push(semester);
            } catch (jsonError) {
              console.error('Error parsing JSON:', jsonError);
              console.error('Response text:', text);
              Alert.alert(
                'Error',
                'There was an issue with the server response.',
              );
            }
          } else {
            console.error(
              'Error fetching data:',
              response.status,
              response.statusText,
            );
            Alert.alert(
              'Error',
              `Failed to fetch data: ${response.statusText}`,
            );
          }
        }
      }
      setSections(prevSections => ({...prevSections, ...results}));
      setFetchedSemesters(fetched);
      console.log('Sections:', JSON.stringify(results, null, 2));
    } catch (error) {
      console.error('Error fetching sections:', error);
      Alert.alert('Error', 'There was an issue fetching the sections.');
    }
  };

  const toggleSection = (program, semester, section) => {
    const selected = {...selectedSections};
    if (!selected[program]) {
      selected[program] = {};
    }
    if (!selected[program][semester]) {
      selected[program][semester] = {};
    }
    selected[program][semester][section.secId] =
      !selected[program][semester][section.secId];
    setSelectedSections(selected);
    console.log(selected);
  };

  const selectAllSections = () => {
    const newSelectedSections = {};
    for (const program in sections) {
      if (!newSelectedSections[program]) {
        newSelectedSections[program] = {};
      }
      for (const semester of selectedSemesters[program]) {
        if (!newSelectedSections[program][semester]) {
          newSelectedSections[program][semester] = {};
        }
        sections[program][semester]?.forEach(section => {
          newSelectedSections[program][semester][section.secId] = !selectAll;
        });
      }
    }
    setSelectedSections(newSelectedSections);
    setSelectAll(!selectAll);
  };

  const navigateToNextScreen = () => {
    const isAnySectionSelected = Object.values(selectedSections).some(program =>
      Object.values(program).some(semester =>
        Object.values(semester).some(selected => selected),
      ),
    );

    if (!isAnySectionSelected) {
      Alert.alert('No item selected', 'Please select at least one Section.');
    } else {
      navigation.navigate('Chief Guest Details', {
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
      });
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#83f2cd', flex: 1}}>
      <Text style={styles.title}>Choose Section</Text>
      <TouchableOpacity
        onPress={selectAllSections}
        style={styles.selectAllButton}>
        <Text style={styles.selectAllButtonText}>
          {selectAll ? 'Deselect All' : 'Select All'}
        </Text>
      </TouchableOpacity>
      {selectedDiscipline &&
        selectedDiscipline.map(
          discipline =>
            selectedSemesters[discipline] &&
            selectedSemesters[discipline].map(semester => (
              <View key={`${discipline}_${semester}`}>
                <Text style={styles.selectedDisciplineText}>
                  Selected Discipline: {discipline}, Semester: {semester}
                </Text>
                <View style={styles.radioGroup}>
                  <RadioButton.Group
                    onValueChange={newValue => {
                      setGender(prev => ({
                        ...prev,
                        [`${discipline}_${semester}`]: newValue,
                      }));
                    }}
                    value={gender[`${discipline}_${semester}`] || 'both'}>
                    <View style={styles.radioButtonRow}>
                      <View style={styles.radioButtonContainer}>
                        <RadioButton value="male" />
                        <Text style={styles.radioText}>Male</Text>
                      </View>
                      <View style={styles.radioButtonContainer}>
                        <RadioButton value="female" />
                        <Text style={styles.radioText}>Female</Text>
                      </View>
                      <View style={styles.radioButtonContainer}>
                        <RadioButton value="both" />
                        <Text style={styles.radioText}>Both</Text>
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={styles.sectionContainer}>
                  {sections[discipline]?.[semester]?.map((section, index) => (
                    <TouchableOpacity
                      key={`${discipline}_${semester}_${section.secId}_${index}`}
                      onPress={() =>
                        toggleSection(discipline, semester, section)
                      }
                      style={styles.sectionButton}>
                      <CheckBox
                        style={styles.checkbox}
                        onClick={() =>
                          toggleSection(discipline, semester, section)
                        }
                        isChecked={
                          selectedSections[discipline]?.[semester]?.[
                            section.secId
                          ]
                        }
                      />
                      <Text style={styles.sectionName}>{section.secName}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )),
        )}

      <TouchableOpacity onPress={navigateToNextScreen} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp(2),
  },
  selectAllButton: {
    backgroundColor: '#b8605a',
    padding: hp(1),
    borderRadius: hp(1),
    margin: hp(1),
    alignItems: 'center',
  },
  selectAllButtonText: {
    color: 'white',
    fontSize: hp(2),
  },
  selectedDisciplineText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    marginTop: hp(1),
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp(1),
  },
  radioButtonRow: {
    flexDirection: 'row',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  radioText: {
    fontSize: hp(2),
    marginLeft: wp(1),
  },
  sectionContainer: {
    paddingHorizontal: wp(3),
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(1),
    padding: hp(1),
    backgroundColor: '#fff',
    borderRadius: hp(1),
  },
  sectionName: {
    fontSize: hp(2),
    marginLeft: wp(2),
    flex: 1,
  },
  checkbox: {
    marginRight: wp(2),
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

export default ChooseSection;
