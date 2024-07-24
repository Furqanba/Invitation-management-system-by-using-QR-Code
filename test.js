import  { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  DrawerLayoutAndroid,
} from 'react-native';

const test = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <Image
          source={require('./images/icons8-menu-50.png')}
          style={{width: 20, height: 20, marginRight: 10}}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textDecorationColor: '#000000',
          }}>
          Admin
        </Text>
      </View>
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => {
          /* Handle Todays Events click */
        }}>
        <Text>Todays Events</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => {
          /* Handle Upcoming Events click */
        }}>
        <Text>Upcoming Events</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => {
          /* Handle Complete Event click */
        }}>
        <Text>Complete Event</Text>
      </TouchableOpacity>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <Image
          source={require('./images/icons8-menu-50.png')}
          style={{width: 20, height: 20, marginRight: 10}}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            flex: 1,
            padding: 5,
          }}>
          {/* Implement Picker component with options View All Users and New Requests */}
        </View>
      </View>
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => {
          /* Handle Wallet click */
        }}>
        <Text>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => {
          /* Handle Contact Us click */
        }}>
        <Text>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginBottom: 10}}
        onPress={() => {
          /* Handle Sign Out click */
        }}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      drawerWidth={250}
      drawerPosition={'left'}
      renderNavigationView={() => navigationView}
      drawerOpen={drawerOpen}
      onDrawerOpen={() => setDrawerOpen(true)}
      onDrawerClose={() => setDrawerOpen(false)}>
      <View style={styles.container}>
        {/* Your Test screen content goes here */}
        <Text>Test Screen</Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawerImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  drawerHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerItem: {
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    padding: 5,
  },
});

export default test;
