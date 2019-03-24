import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ onButtonPress, data }) => {
  return (
    <TouchableOpacity style={styles.touchableStyle} onPress={onButtonPress}>
      <Text style={{ textAlign: 'center', fontWeight: '300', fontSize: 20 }} >{data}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  touchableStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgb(50,50,50)'
  }

};

export default Button;
