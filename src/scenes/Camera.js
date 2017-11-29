import { Camera, Permissions, BarCodeScanner } from 'expo';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CameraGallery from '../components/CameraGallery';
import { Spinner } from '../components/common'
import { Icon } from 'react-native-elements';
import { cameraStyle as styles }  from '../assets/stylesheets';
import clarifaiCall from '../utilities/clarifaiCall';
import barcodeScanner from '../utilities/barcodeScanner'
import { connect } from 'react-redux';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'off'
};

export class AppCamera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      flash: 'auto',
      showGallery: false,
      showBarcode: false,
      loading: false
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleBarCode() {
    this.setState({
      showBarcode: !this.state.showBarcode
    })
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync({base64: true}).then(data => {
        this.setState({loading: true})
        clarifaiCall(data.base64).then(()=>this.setState({loading:false}))
      })
      .catch(e => {
        console.error(e, 'Photo error');;
      })
    }
  };

  renderGallery() {
    return <CameraGallery onPress={this.toggleView.bind(this)} />;
  }

  renderBarCode() {
    return (
      <BarCodeScanner 
        onBarCodeRead={data => {
          barcodeScanner(data.data,this.props.userId)
          this.setState({showBarcode: false, loading: true})
        }} 
        style={styles.scanner}>
        <View style={styles.barcode}>
            <Icon
              name="camera-alt"
              color="#ff7c61"
              size={60}
              onPress={this.toggleBarCode.bind(this)} />
          </View>
        </BarCodeScanner>
    )
  }
    
  renderCamera() {
    const { flash, hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (this.state.showBarcode) {
      return this.renderBarCode()
    } else {
      return (
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.camera}
          flashMode={flash}>
          <View style={styles.barcode}>
            <Icon
              name={`flash-${flash}`}
              size={45}
              color="white"
              onPress={this.toggleFlash.bind(this)}
              />
          </View>
          <View style={styles.controls}>
            <Icon
              raised
              name="barcode-scan"
              type="material-community"
              color="#00a587"
              size={26}
              reverse
              onPress={this.toggleBarCode.bind(this)}
               />
            <Icon
              raised
              name="camera"
              size={36}
              color="#ef4836"
              reverse
              onPress={this.takePicture.bind(this)} />
            <Icon
              raised
              name="image"
              size={26}
              color="#b5000c"
              reverse
              onPress={this.toggleView.bind(this)} />
          </View>
        </Camera>
      );
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
        <Spinner />
      </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.state.showGallery ? this.renderGallery() : this.renderCamera()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth && state.auth.user  ? state.auth.user.uid : ''
});

export default connect(mapStateToProps)(AppCamera)
