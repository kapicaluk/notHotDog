import React, { Component } from 'react';
import { Button, View, AlertIOS } from 'react-native';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput } from 'react-native-elements'
import firebase from 'firebase';
import store from '../../../configureStore'
import { GET_USER_PROFILE } from '../../store/auth'

class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      uid: this.props.uid,
      firstName: this.props.firstname || '',
      lastName: this.props.lastname || '',
      email: this.props.email || '',
      currentPass: '',
      newPass: ''
    }
  }

  componentWillReceiveProps(nextProps){
    this.props = nextProps ? nextProps : this.props
  }

  editFirstName(text){
    this.setState({firstName: text})
  }
  
  editLastName(text){
    this.setState({lastName: text})
  }

  editEmail(text){
    this.setState({user: {...this.state.user, email: text}})
  }

  editCurrentPass(text){
    this.setState({currentPass: text})
  }

  setNewPass(text){
    this.setState({newPass: text})
  }

  editAccount(){
    const usersName = {
      firstname: this.state.firstName,
      lastname: this.state.lastName
    }
    const email = this.state.email
    let user = firebase.auth().currentUser
    firebase.firestore().collection(`users`).doc(`${user.uid}`).set(usersName, { merge: true })
      .then(()=>{
      return user.updateEmail(email)
    })
    .then(() => {
      if (this.state.newPass && this.state.currentPass) {
        return firebase.auth()
          .signInWithEmailAndPassword(this.state.user.email, this.state.currentPass)
          .then((user) => user.updatePassword(this.state.newPass))
          .catch(console.error)
      } else if (this.state.newPass || this.state.currentPass) {
        AlertIOS.alert('Password Required', 'Please return to previous page and enter your current password')
      }
    })
    usersName.email = email
    store.dispatch({type:GET_USER_PROFILE, payload: usersName})
    Actions.popTo('settings');
  }

  render () {
    let user = this.state.user;
    return (
      <View>
        <View>
            <View>
              <View>
                <FormLabel>First Name:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editFirstName(text)} 
                  defaultValue={ this.state.firstName ? this.state.firstName : null} />
                <FormLabel>Last Name:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editLastName(text)} 
                  defaultValue={(this.state.lastName) ? this.state.lastName : null} />
                <FormLabel>Email:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editEmail(text)} 
                  defaultValue={this.state.email} />
                <FormLabel>Current Password:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.editCurrentPass(text)} 
                  defaultValue={'*'.repeat(this.state.currentPass.length)} />
                <FormLabel>New Password:</FormLabel>
                <FormInput 
                  onChangeText={(text) => this.setNewPass(text)} 
                  defaultValue={'*'.repeat(this.state.newPass.length)} />
              </View>
              <Button onPress={this.editAccount.bind(this)} title="Save Account Changes"/>
            </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  firstname: state.auth.firstname,
  lastname: state.auth.lastname,
  email: state.auth.user.email
})

export default connect( mapStateToProps )(UserInfo);