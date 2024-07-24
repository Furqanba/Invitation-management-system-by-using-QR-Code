import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {url} from './URL';

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginConfig, setLoginConfig] = useState('');
  const [signup, setsignup] = useState('');
  const [usertype, setusertype] = useState('');

  const handleLogin = async () => {
    try {
      console.log(usertype);
      if (usertype == 'student') {
        let stdData = {
          Std_Arid: username,
          Password: password,
        };
        console.log(stdData);
        const stdresponse = await fetch(url + 'EventInfo/validUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stdData),
        });
        if (stdresponse.ok) {
          setUsername('');
          setPassword('');
          let ans = await stdresponse.json();
          console.log('ANS', ans);
          let stdDetails = ans[0];
          console.log('userDetails', stdDetails);
          setLoginConfig(Alert.alert('Succesfully Login as Student'));
          navigation.navigate('Student Dashboard', {stdDetails: stdDetails});
        }
      } else if (usertype == 'admin') {
        let data = {
          Us_id: username,
          Uspassword: password,
        };
        console.log(data);
        const response = await fetch(url + 'login/validUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          setUsername('');
          setPassword('');
          console.log('ANS');
          let ans = await response.json();
          let userDetails = ans[0];
          console.log('userDetails', userDetails);
          setLoginConfig(Alert.alert('Succesfully Login as Admin'));
          navigation.navigate('Home', {userDetails: userDetails});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  function signuphandle() {
    navigation.navigate('signup');
  }

  return (
    <ImageBackground
      source={require('./images/back.jpg')}
      style={{flex: 1, alignItems: 'center'}}>
      <View style={{marginTop: 50}}>
        <View style={{flexDirection: 'row', alignItems: ''}}>
          <Text
            style={{
              fontSize: hp(7),
              color: 'black',
              fontWeight: 'bold',
              marginTop: 5,
              textAlign: 'center',
            }}>
            Invito--
          </Text>
          <Text
            style={{
              fontSize: hp(7),
              color: 'green',
              fontWeight: 'bold',
              marginTop: 5,
              textAlign: 'center',
            }}>
            Pro
          </Text>
        </View>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontWeight: 'bold',
            marginTop: 20,
            marginLeft: 10,
          }}>
          Sign In
        </Text>
        <View style={{alignSelf: 'center', width: wp(70)}}>
          <TextInput
            style={{
              borderWidth: 2,
              borderRadius: 20,
              marginTop: 20,
              color: 'black',
              fontSize: hp(2),
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            placeholder="User Arid number"
            onChangeText={text => setUsername(text)}
          />

          <TextInput
            style={{
              borderWidth: 2,
              borderRadius: 20,
              marginTop: 20,
              color: 'black',
              fontSize: hp(2),
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View>
          <Picker
            selectedValue={usertype}
            style={styles.picker}
            onValueChange={itemValue => setusertype(itemValue)}>
            <Picker.Item label="Select Role" value="Select Role" />
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>
        <View style={{marginTop: 30}}>
          <TouchableOpacity onPress={handleLogin}>
            <View
              style={{
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 50,
                marginLeft: 50,

                width: wp(50),
                height: hp(5),
              }}>
              <Text
                style={{color: 'white', textAlign: 'center', fontSize: hp(2)}}>
                Sign In
              </Text>
            </View>
          </TouchableOpacity>

          <Text>{loginConfig}</Text>
          <Text
            style={{
              fontSize: 30,
              color: 'black',
              fontWeight: 'bold',
              marginTop: 10,
              textAlign: 'center',
            }}>
            OR
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              fontWeight: 'bold',
              marginTop: 20,
              textAlign: 'center',
            }}>
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={signuphandle}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: 'blue',
                  fontWeight: 'bold',
                  marginTop: 20,
                  textAlign: 'center',
                }}>
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  picker: {
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    paddingVertical: hp(1),
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: hp(4),
  },
});

export default Login;
