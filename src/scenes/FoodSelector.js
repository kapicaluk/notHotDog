import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux'
import axios from 'axios';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Button } from 'react-native-elements';
import { updateMostRecentMeal } from '../modules/food'
import fullNutrientParser from '../utilities/nutrientParser';

class FoodSelector extends Component {
    constructor (props){
        super(props);
        this.state = {
          foodArr: props.foodArr,
          foodInput:''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentD(nextProps){
      if (nextProps) this.state.foodInput = ''
    }

    deleteFromFoodArr = item => {
      let newStateArr = this.state.foodArr.slice()
      newStateArr.splice(newStateArr.indexOf(item), 1)
      this.setState({foodArr: newStateArr})
    }

    addToFoodArr = item => {
      let newStateArr = this.state.foodArr.slice()
      newStateArr.push(item)
      this.setState({ foodArr: newStateArr, foodInput: '' })
    }

    handleSubmit(userId) {
      axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        query: this.state.foodArr.join(", ")
      }, {
        headers: {
          "x-app-id": "da40e3ba",
          "x-app-key": "9039730dc95644122941bec700a3ebe4",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.data)
        .then(data => {
          console.log('data', data)
          let mealInstance = [];
          if (data) {
            fullNutrientParser(data)
            data.foods.forEach(food => {
              let foodItem = {};
              foodItem.food_name = food.food_name;
              foodItem.serving = food.serving_weight_grams;
              foodItem.data = {};
              foodItem.data.protein = food.nf_protein;
              foodItem.data.carbs = food.nf_total_carbohydrate;
              foodItem.data.fat = food.nf_total_fat;
              foodItem.nutrients = food.parsed_nutrients
              mealInstance.push(foodItem);
            });
          }
          const timestamp = firebase.firestore.FieldValue.serverTimestamp()
          return firebase.firestore().collection(`users`).doc(`${userId}`).collection('meals').add({ mealInstance, timestamp})
            .then(()=> {
            Actions.AccountHome(mealInstance)
            })
        })
    }

    render () {
      const { userId } = this.props
      const { foodArr } = this.state

        return(
            <View style={styles.tabContainer}>
              <ScrollView>
                <List>
                    {
                    foodArr && foodArr.map((item, i) => {
                      return <ListItem
                        key={i} title={item}
                        rightIcon={{name: 'clear'}}
                        onPressRightIcon={ ()=> this.deleteFromFoodArr(item)} />
                    })
                    }
                    <ListItem
                      textInput={true}
                      textInputValue={this.state.foodInput}
                      textInputOnChangeText={(text)=>{
                        this.setState({foodInput:text})
                      }}
                      textInputPlaceholder={'Add other foods...'}
                      rightIcon={{ name: 'add'}}
                      textInputAutoCorrect={true}
                      textInputAutoCapitalize={"none"}
                      onPressRightIcon={()=> this.addToFoodArr(this.state.foodInput)} />
                    <ListItem
                      onPress={()=>this.handleSubmit(userId)}
                      title="Click here to submit!"
                      hideChevron={true} 
                      />

                </List>
              </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});

const mapStateToProps = state => ({
  userId: state.auth.user.uid
});

export default connect(mapStateToProps)(FoodSelector);