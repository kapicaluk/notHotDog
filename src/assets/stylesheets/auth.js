import { StyleSheet } from 'react-native';

const authStyle = StyleSheet.create({
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#e62117',
    paddingTop: 20,
    paddingBottom: 10,
  },
  loadingContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  questionContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  questionText: {
    textAlign: 'center',
    color: '#4d4d4d',
  },
  submit: {
    backgroundColor: '#ef4836'
  }
});

export { authStyle };
