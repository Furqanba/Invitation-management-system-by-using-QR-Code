/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Button, Text} from 'react-native-paper';
import Camera from 'react-native-vector-icons/FontAwesome';
import {url} from './URL';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {height} = Dimensions.get('window');

const QRScannerScreen = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedId, setScannedId] = useState(null);
  const [evData, setEvData] = useState([]);
  const [passStatus, setPassStatus] = useState('');
  //   const upcomingevents = require('./images/images.jpeg');

  let furqan;
  const [furqan2, setfurqan2] = useState('');

  const handleScan = async ({data}) => {
    console.log(data);
    setIsCameraOpen(false);
    setScannedId(data);
    const edata = {
      Std_Arid: data,
    };
    console.log(edata);
    const response = await fetch(url + 'GuardScanning/scanQr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edata),
    });
    if (response.ok) {
      var ans = await response.json();
      console.log('ans', ans);
      console.log(ans[0].iimage);
      if (ans[0].StdArid == '3627') {
        furqan = require('./images/Furqanpic.jpg');
      } else if (ans[0].StdArid == '3686') {
        furqan = require('./images/aliabbsipic.jpg');
      } else if (ans[0].StdArid == '3656') {
        furqan = require('./images/Huzaifapic.jpg');
      } else if (ans[0].StdArid == '1111') {
        furqan = require('./images/images.jpeg');
      } else {
        console.log(furqan);
      }
      console.log(furqan);
      setfurqan2(furqan);

      let status = ans[0].scan;
      console.log('Scan', status);
      if (status == 'True') {
        Alert.alert('Already Scanned');
      } else {
        setEvData(ans);
      }
    }
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    setScannedId(null);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const handleAllowPress = async eventId => {
    console.log(eventId);
    var data = {
      Event_id: eventId,
    };
    console.log(data);
    const response = await fetch(url + 'GuardScanning/updQr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      var ans = await response.json();
      console.log('ans', ans);
      Alert.alert(ans);
      setEvData([]);
    }
  };

  const renderEventItem = ({item}) => (
    <View style={styles.eventContainer}>
      <View>
        <Text style={styles.eventText}>Event ID: {item.EventID}</Text>

        <Text style={styles.eventText}>Student Name: {item.Student_Name}</Text>
        <Text style={styles.eventText}>Student Id: {item.Student_id}</Text>
        <Image
          source={furqan2}
          style={{
            width: wp(40),
            height: hp(40),
            alignItems: 'center',
          }}
        />

        <TouchableOpacity
          style={styles.allowButton}
          onPress={() => handleAllowPress(item.EventID)}>
          <Text style={styles.allowButtonText}>Allow</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isCameraOpen ? (
        <View>
          <TouchableOpacity onPress={openCamera} style={styles.scanButton}>
            <Camera name="camera" size={30} color={'black'} />
            <Text style={styles.scanText}>Scan QR:</Text>
          </TouchableOpacity>
          {scannedId && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Scanned Data: {scannedId}</Text>
            </View>
          )}
          <FlatList
            data={evData}
            keyExtractor={item => item.Std_Arid.toString()}
            renderItem={renderEventItem}
          />
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={handleScan}
          />
          <Button
            onPress={closeCamera}
            mode="contained-tonal"
            style={styles.closeButton}>
            Close Camera
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  scanText: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: height * 0.7,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
  },
  resultContainer: {
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Cochin',
  },
  eventContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventText: {
    fontSize: 16,
    color: 'black',
  },
  allowButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  allowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default QRScannerScreen;
