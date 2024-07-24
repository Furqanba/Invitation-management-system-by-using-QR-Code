// Pending.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {url} from './URL';

const Pending = ({navigation}) => {
  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    const fetchPendingEvents = async () => {
      try {
        const response = await fetch(url + 'PendingEvents/Pendingevents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPendingEvents(data);
        }
      } catch (error) {
        console.error('Error fetching pending events:', error);
      }
    };

    fetchPendingEvents();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Pending Events</Text>
      {pendingEvents.map(item => (
        <TouchableOpacity
          key={item.efID}
          onPress={() =>
            navigation.navigate('Pendings Events Details', {event: item})
          }>
          <View style={styles.eventItem}>
            <Text style={styles.eventName}>{item.event_name}</Text>
            {/* <Text style={styles.eventStatus}>{item.event_status}</Text>
            <Text style={styles.eventStatus}>{item.startTime}</Text> */}
            <Text style={styles.viewdetail}>View Details</Text>
          </View>
        </TouchableOpacity>
      ))}
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
  eventItem: {
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
  eventName: {
    fontSize: wp('6%'), // Responsive font size
    fontWeight: '600',
    marginBottom: hp('0.5%'), // Responsive margin bottom
    color: 'black',
  },
  eventStatus: {
    fontSize: wp('4%'), // Responsive font size
    color: '#666',
  },
  viewdetail: {
    fontSize: hp(2),
    color: 'red',
  },
});

export default Pending;
