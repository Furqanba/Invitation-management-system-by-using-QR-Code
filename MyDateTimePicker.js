import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const MyDateTimePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    setSelectedDate(date);
    hideTimePicker();
  };

  return (
    <View>
      <Button onPress={showDatePicker} title="Show Date Picker" />
      <Button onPress={showTimePicker} title="Show Time Picker" />
      <Text>{selectedDate.toLocaleString()}</Text>

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Time Picker */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

export default MyDateTimePicker;
