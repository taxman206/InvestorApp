import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { DateFormat } from './DateFormat'

export const DetailScreen = ( props ) => {
  return (
    <View style={detailStyles.view}>
      <Text style={detailStyles.amount}> ${props.route.params.amount}</Text>
      <Text><DateFormat date={props.route.params.id} size={18} color="black" /></Text>
      <Text>category: {props.route.params.category}</Text>
      <Text>note: {props.route.params.note}</Text>
    </View>
  )
}

const detailStyles = StyleSheet.create({
  view: {
    marginTop: 15,
    flex: 1,
    paddingHorizontal: 10,
  },
  amount: {
    fontSize: 30,
    marginBottom: 20,
  },
})