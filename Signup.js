import React from 'react'
import  { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

function Signup({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[email,setemail]=useState('');
  const[mobilenumber,setmobilenumber]=useState('');
  const[confmpass,setconfmpass]=useState('');
  const [loginConfig, setLoginConfig] = useState('');
  
    const[signup,setsignup]=useState('');

  function handlesignin() {
  //   if (username === '20-Arid-3627' && password === '12345') {
  //     setLoginConfig(Alert.alert("Succesfully Login"));
      
  //   } else {
  //     setLoginConfig(Alert.alert('Invalid login'));
     
  //   }
  // }
setLoginConfig(Alert.alert("Register Suceesfully"));
  }
 
  return (

    
    <ScrollView style={{backgroundColor:'#83f2cd',flex:1,}}>
      <View style={{marginTop:10,}}>
        <View style={{flexDirection:'row',  }}>
      

      </View>
      <Text style={{ fontSize: 40, color: 'black', fontWeight: 'bold', marginTop: 20,marginLeft:50}}>
        Sign Up
      </Text>
      <View style={{ alignSelf: 'center' }}>
        <TextInput
          style={{ borderWidth: 2, borderRadius: 20, width: 300, marginTop: 20 }}
          placeholder="User Name"
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={{ borderWidth: 2, borderRadius: 20, width: 300, marginTop: 20 }}
          placeholder="abc@gmail.com"
          
          onChangeText={(text) => setemail(text)}
        />
           <TextInput
          style={{ borderWidth: 2, borderRadius: 20, width: 300, marginTop: 20 }}
          placeholder="Mobile Number"
          
          onChangeText={(text) => setmobilenumber(text)}
        />
           <TextInput
          style={{ borderWidth: 2, borderRadius: 20, width: 300, marginTop: 20 }}
          placeholder="Pasword"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
           <TextInput
          style={{ borderWidth: 2, borderRadius: 20, width: 300, marginTop: 20 }}
          placeholder="confirm pasword"
          secureTextEntry={true}
          onChangeText={(text) => setconfmpass(text)}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity onPress={handlesignin}>
          <View
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 50,
              marginLeft: 70,
              marginRight: 70,
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Sign In</Text>

          </View>
        </TouchableOpacity>
        
        <Text>{loginConfig}</Text>
        <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold', marginTop: 10, textAlign: 'center',}}>OR</Text>
        <Text style={{fontSize: 25, color: 'black', fontWeight: 'bold', marginTop: 20,textAlign:'center'}}>Already have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("login")}>
          <View>
          
            <Text style={{fontSize: 25, color: 'blue', fontWeight: 'bold', marginTop: 20,textAlign:'center' }}>Sign In</Text>

          </View>
          </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    
      
    
  );
}


export default Signup;