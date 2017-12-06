import React, { Component } from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';
import PieChart from '../components/PieChart';
import { getAllUserMeals } from '../store/food';
import { connect } from 'react-redux'
import { ButtonGroup } from 'react-native-elements';

class SingleHistoryView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  componentWillMount () {
     this.props.userId && this.props.fetchAllMeals(this.props.userId)
  }

  render() {
    const singleMeal = this.props.mealInstance;
    const { selectedIndex } = this.state
    let reduced = singleMeal ? singleMeal.reduce((acc, foodItem) => {
      acc.serving += foodItem.serving
      acc.data.protein += foodItem.data.protein
      acc.data.carbs += foodItem.data.carbs
      acc.data.fat += foodItem.data.fat
      return acc
    }, { serving: 0, data: { protein: 0, carbs: 0, fat: 0 }}) : null
    let buttons = ['meal']
    let meal = [reduced]
    singleMeal && singleMeal.map((food) => {
      buttons.push(food.food_name)
      meal.push(food)
    })
    return (
      <ScrollView style={styles.container}>
      <View style={styles.buttonView}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedTextStyle={{color: '#ef4836'}}
          textStyle={{}} />
        </View>
        <View>
          {
            singleMeal && <PieChart allFoods={meal[selectedIndex]} />
          }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonView: {
    marginBottom: 20,
    marginTop: 10,
    flex: 1
  }
})

const mapStateToProps = state => ({
  mostRecent: state.food.mostRecent,
  userId: state.auth && state.auth.user ? state.auth.user.uid : null
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllMeals: userId => dispatch(getAllUserMeals(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleHistoryView);