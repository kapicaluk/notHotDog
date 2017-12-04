import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { signInUser, clearState } from "../../store/auth";
import { Actions } from "react-native-router-flux";
import { Field, reduxForm } from "redux-form";
import { Container, Input, Button, Item, Spinner } from "../../components/common/index";
import logo from '../../../logo.png';
import styles from "./authStyle";

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const background = require("../../../starwberry2.jpg");

class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    if (!this.props.userId) this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password } = props;

    this.props.signInUser({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Image source={background} style={styles.background} resizeMode="cover">
        <KeyboardAvoidingView>
        <View style={styles.container}>
          <Container>
            {/*<Image source={logo} style={styles.logoStyle} />*/}
            <Item>
              <Field
                name="email"
                component={Input}
                placeholder="Email"
                autoCapitalize={"none"}
              />
            </Item>
          </Container>
          <Container>
            <Item>
              <Field
                name="password"
                component={Input}
                secureTextEntry
                placeholder="Password"
              />
            </Item>
          </Container>
          {this.props.authError ? (
            <Text style={styles.error}>{this.props.authError}</Text>
          ) : (
            <View />
          )}
          <Container>
            {this.props.loading ? (
              <Item style={styles.loadingContainer}>
                <Spinner />
              </Item>
            ) : (


              <Button onPress={handleSubmit(this.handleFormSubmit)}>
                Log in
              </Button>


            )}

            <Button onPress={() => Actions.signup()}>
              Sign Up
            </Button>
          </Container>
        </View>
        </KeyboardAvoidingView>
      </Image>
    );
  }
}

const validate = props => {
  const errors = {};
  const fields = ["email", "password"];

  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  return errors;
};

Signin.propTypes = propTypes;
Signin = reduxForm({ form: "signin", validate })(Signin);

const mapStateToProps = ({ auth }) => ({
  authError: auth.error,
  loading: auth.loading,
  userId: auth && auth.user ? auth.user.uid : ""
});

export default connect(mapStateToProps, { signInUser, clearState })(Signin);
