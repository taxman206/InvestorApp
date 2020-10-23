import React, {useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {Select} from './Select'



export const HomeScreen = (props) => {
  const selectItems = [
    {label: "Savings", value: "savings"},
    {label: "Allowance", value: "Allowance"},
    {label: "Investments", value: "Investments"},
    {label: "Assets", value: "Assets"},
    {label: "Forex ", value: "Forex"},
    
  ]
  const _amountInput = useRef()
  const _noteInput = useRef()

  const [category,setCategory] = useState(null)
  const [amount,setAmount] = useState(0)
  const [note,setNote] = useState(null)

  const [validAmount,setValidAmount] = useState(false)
  const [reset,setReset] = useState(false)

  const navigation = useNavigation()

  const renderList = ({item}) => (
    <ListItem 
    id={item.id} 
    amount={item.amount} 
    category={item.category} 
    clickHandler = {showDetail}
    item = {item}
    />
  )
  
  const showDetail = ( item ) => {
    navigation.navigate("Detail", item )
  }

  const validateAmount = (amount) => {
    if(parseFloat(amount)) {
      setValidAmount(true)
      setAmount(amount)
    }
    else{
      setValidAmount(false)
    }
  }

  const categorise = ( val ) => {
    setCategory(val)
  }

  const addItem = () => {
    const itemId = new Date().getTime()
    const itemAmount = amount
    const itemCategory = category
    const itemNote = note
    props.add({id: itemId, amount: itemAmount, category: itemCategory, note: itemNote })
  }

  useEffect( () => {
    
  })

  return (
    <View style={homeStyle.container}>
      <View>
        <TextInput 
          style={homeStyle.input} 
          placeholder="Input Amount" 
          onChangeText={ (amount) => validateAmount(amount) }
          inputRef = {_amountInput}
        />        
        <Select items={selectItems} onselect={categorise} reset={reset} />
        <TextInput 
          style={homeStyle.input} 
          placeholder="Date" 
          onChangeText={ (note) => setNote(note)}
          
        />
        <TouchableOpacity 
          style={ validAmount && category ? homeStyle.button : homeStyle.buttonDisabled }
          disabled={ validAmount && category ? false: true }
          onPress={ () => { addItem() }}
        >
          <Text style={homeStyle.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data = {props.data}
      renderItem = {renderList} 
      keyExtractor = { item => item.id }
      />
    </View>
  )
}

const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={ () => props.clickHandler(props.item) }>
      <View style={homeStyle.item}>
        <Text>{props.category}</Text>
        <Text>$ {props.amount}</Text>
      </View>
    </TouchableOpacity>
  )
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginVertical: 15,
  },
  button: {
    backgroundColor: 'lightgreen',
    padding: 13,
    borderRadius: 12,
  },
  buttonDisabled: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    opacity: 0.5,
  },
  buttonText: {
    textAlign: 'center',
  },
})