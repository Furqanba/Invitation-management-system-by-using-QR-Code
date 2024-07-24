// DetailsofCompletedEvents.js
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailsofCompletedEvents = ({route}) => {
  const {event} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Event Details</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Event Name:</Text>
        <Text style={styles.value}>{event.event_name}</Text>
        <Text style={styles.label}>Event Venue:</Text>
        <Text style={styles.value}>{event.venuename}</Text>
        <Text style={styles.label}>Event Status:</Text>
        <Text style={styles.value}>{event.event_status}</Text>
        <Text style={styles.label}>Start Time:</Text>
        <Text style={styles.value}>{event.startTime}</Text>
        <Text style={styles.label}>End Time:</Text>
        <Text style={styles.value}>{event.endtime}</Text>
        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.value}>{event.startdate}</Text>
        {/* <Text style={styles.label}>End Date:</Text>
        <Text style={styles.value}>{event.enddate}</Text>
        <Text style={styles.label}>Event Type:</Text>
        <Text style={styles.value}>{event.eventType}</Text> */}
        {/* <Text style={styles.label}>Chief guest name</Text>
        <Text style={styles.value}>{event.CG_Name}</Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83f2cd',
    paddingVertical: hp('2.5%'), // Responsive padding vertical
    paddingHorizontal: wp('2.5%'), // Responsive padding horizontal
  },
  header: {
    fontSize: wp('7%'), // Responsive font size
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp('2.5%'), // Responsive margin bottom
    color: 'black',
  },
  detailItem: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'), // Responsive border radius
    padding: wp('4%'), // Responsive padding
    marginBottom: hp('2%'), // Responsive margin bottom
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: wp('0.5%'), // Responsive shadow radius
    elevation: 3,
  },
  label: {
    fontSize: wp('5%'), // Responsive font size
    fontWeight: '600',
    marginBottom: hp('0.5%'), // Responsive margin bottom
    color: 'green',
    textAlign: 'center',
  },
  value: {
    fontSize: wp('4.5%'), // Responsive font size
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailsofCompletedEvents;
