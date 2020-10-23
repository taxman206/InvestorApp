import React, { useState, useEffect } from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const AuthScreen = ( props ) => {
  const [login,setLogin] = useState(false)
  
  const [validEmail,setValidEmail] = useState(false)
  const [validPassword,setValidPassword] = useState(false)
  
  const [email,setEmail] = useState(null)
  const [password, setPassword ] = useState(null)

  const navigation = useNavigation()

  useEffect(() => {
    if( props.loggedIn ) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home"}]
      })
    }
  })

  const validateEmail = (email) => {
    if( email.indexOf('@') > 0 && email.indexOf('.') > 0 ) {
      setValidEmail( true )
      setEmail( email )
    }
    else {
      setValidEmail( false )
    }
  }

  const validatePassword = (password) => {
    if( password.length >= 8 ) {
      setValidPassword( true )
      setPassword(password)
    }
    else {
      setValidPassword( false )
    }
  }

  if (!login) {
    return (
      
      <View style={styles.container}>
        <Text style={styles.title}>Create An Account</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Email Address"
          onChangeText={ (email) => validateEmail(email) } 
        /> 
        <TextInput 
          style={styles.input}
          placeholder="Password" 
          secureTextEntry={true}
          onChangeText={ (password) => validatePassword(password) }
        />
        <TouchableOpacity 
          style={ !validEmail || !validPassword ? styles.buttonDisabled : styles.button }
          disabled={ !validEmail || !validPassword ? true : false }
          onPress={ () => { props.signup('register',email,password) } }
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.altText}>Already have an account?</Text>
        <TouchableOpacity 
          style={styles.altButton}
          onPress={ () => { 
            setLogin(true) 
            navigation.setOptions({title: 'Sign in'})
          } }
        >
          <Text style={styles.altButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
  else {
    return (
      // login view
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <TextInput 
          style={styles.input} placeholder="Email Address"
          onChangeText = { (email) => { setEmail(email) }} 
        /> 
        <TextInput 
          style={styles.input}
          placeholder="Password" 
          secureTextEntry={true}
          onChangeText={ (password) => { setPassword(password) } }
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={ () => { props.signup('login', email, password ) } }
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.altText}>Don't have an account?</Text>
        <TouchableOpacity 
          style={styles.altButton}
          onPress={ () => { 
            setLogin(false) 
            navigation.setOptions({title: 'Register'})
          } }
        >
          <Text style={styles.altButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#777777',
    marginVertical: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#444444',
  },
  buttonText: {
    color: '#eeeeee',
    textAlign: 'center',
  },
  buttonDisabled: {
    padding: 10,
    backgroundColor: '#888888',
  },
  altText : {
    textAlign: 'center',
    marginTop: 20,
  },
  altButton: {
    marginTop: 10,
    padding: 10,
  },
  altButtonText: {
    color: 'blue',
    textAlign: 'center',
  }
})