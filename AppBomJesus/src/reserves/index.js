import React from 'react';

import { View, StyleSheet } from 'react-native';
import ReserveList from './reserveList'



export default class Reserva extends React.Component{
  
    render(){
        return (
            <View style={styles.container}>
                <ReserveList></ReserveList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })