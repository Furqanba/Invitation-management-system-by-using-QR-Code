import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert  } from 'react-native';


import { useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const CreateBothevent = ({navigation}) => {

    const [selectedGender, setSelectedGender] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [inputText, setInputText] = useState('');


    const handlePaidToggle = () => {
        setIsPaid(!isPaid);
        // Reset input text when switching between paid and unpaid
        setInputText('');
      };
    
      const handleInputChange = (text) => {
        setInputText(text);
      };
    
      const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
      };
      const Nextbutton = () => {
        Alert.alert("successs")
      
        //   navigation.navigate('Chief Guest Details');
          
        };


  return (

<View style={{backgroundColor:'#83f2cd',flex:1,}}>
 
<View>
    <Text style={{fontSize:hp(4),color:'black',fontWeight:'bold', textAlign: 'center',}}>
      For
    </Text>
  </View>
<View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:hp(2)}}>
  <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
        onPress={() => handleGenderSelect('male')}
      >
        <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: 'black', marginRight: 8, backgroundColor: selectedGender === 'male' ? 'black' : 'transparent' }} />
        <Text style={{fontWeight:'bold',color:'black',fontSize:hp(2)}}>Male</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,

        }}
        onPress={() => handleGenderSelect('female')}
      >
        <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: 'black', marginRight: 8, backgroundColor: selectedGender === 'female' ? 'black' : 'transparent' }} />
        <Text style={{fontWeight:'bold',color:'black',fontSize:hp(2)}} >Female</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}
        onPress={() => handleGenderSelect('both')}
      >
        <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: 'black', marginRight: 8, backgroundColor: selectedGender === 'both' ? 'black' : 'transparent' }} />
        <Text style={{fontWeight:'bold',color:'black',fontSize:hp(2)}}>Both</Text>
      </TouchableOpacity>
      </View>


      <Text style={{fontSize:hp(3.5),color:'black',fontWeight:'bold', textAlign: 'center',}}>
      Event Type
    </Text>
    <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:hp(2)}} >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={handlePaidToggle}>
          <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: 'black', marginRight: 8, backgroundColor: isPaid ? 'black' : 'transparent' }} />
        </TouchableOpacity>
        <Text style={{fontWeight:'bold',color:'black',fontSize:hp(2)}}>Paid</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <TouchableOpacity onPress={handlePaidToggle}>
          <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: 'black', marginRight: 8, backgroundColor: !isPaid ? 'black' : 'transparent' }} />
        </TouchableOpacity>
        <Text style={{fontWeight:'bold',color:'black',fontSize:hp(2)}}>Unpaid</Text>
      </View>
       
      {isPaid && (
        
        <TextInput
          style={{  textAlign: 'center',fontWeight: '800',borderWidth: 2, borderColor: 'black', marginTop: 10, paddingHorizontal: 10,borderRadius:hp(2), }}
          placeholder="Enter payment details"
          value={inputText}
          onChangeText={handleInputChange}
        />
       
      )}
      
      </View>




        
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
            marginTop:hp(30),
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', marginLeft: hp(1), fontSize: hp(3)}}>
            Next{' '}
          </Text>
        </View>
      </TouchableOpacity>
</View>

  )
}

export default CreateBothevent;
