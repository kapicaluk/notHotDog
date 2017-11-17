import React from "react";
import { Scene, Router, TabBar, Icon } from "react-native-router-flux";
import Signin from './src/containers/auth/Signin';
import Signup from './src/containers/auth/Signup';
import requireAuth from './src/containers/auth/requireAuth';
import requireNotAuth from './src/containers/auth/requireNotAuth';

// Containers go here:
import LoggedInLanding from "./src/scenes/LoggedInLanding"; /* to navigate to camera or account home */
import AccountHome from "./src/scenes/AccountHome"; /* to display most recent meal */
import AccountSettings from "./src/scenes/AccountSettings"; /* to edit user account settings */
import History from "./src/scenes/History"; /* to see all past meal data */


const RouterComponent = () => (
  <Router
    sceneStyle={{ paddingTop: 65, backgroundColor: '#edecec' }}
    navigationBarStyle={styles.navigationBarStyle}
    titleStyle={{ color: '#4d4d4d' }}>
    <Scene key="root">
      <Scene key="auth">
        <Scene key="signup" component={requireNotAuth(Signup)}
               title="Please Sign up" />
        <Scene key="signin" component={requireNotAuth(Signin)}
               title="Please Sign in" />
      </Scene>
      {/*<Scene key="gallery" component={CameraGallery} title="Camera Roll" />*/}
      <Scene
        key="LoggedInLanding"
        component={LoggedInLanding}
        title="Welcome"
        direction="vertical"
      />
      <Scene key="tabbar" tabs={true} tabBarStyle={ {backgroundColor: "#d4d6d8"} }>
        <Scene key="AccountHome" title="Most Recent Meal" initial={true}>
          <Scene
            key="account"
            component={AccountHome}
            title="Account Home"
          />
        </Scene>
        <Scene key="history" labelStyle="fontSize: 12" title="Meal History">
          <Scene key="accountHistory" component={History} title="History" />
        </Scene>
      </Scene>
    </Scene>
  </Router>
);

const styles = {
  navigationBarStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
};

export default RouterComponent;
