import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  SafeAreaView,
  TextInput,
  Button,
  Image
} from 'react-native';

import {
  ViroARScene,
  ViroBox,
  ViroARSceneNavigator,
  ViroAmbientLight,
  Viro3DObject,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroAnimations,
  ViroQuad,
  ViroARPlane,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [animateSkull, setAnimateSkull] = useState(false);

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
  }

  ViroARTrackingTargets.createTargets({
    targetOne: {
      source: require('./res/rhino.png'),
      orientation: 'Up',
      physicalWidth: 0.5, // real world width in meters
    },
  });

  ViroAnimations.registerAnimations({
    scaleSkull: {
      properties: {scaleX: 0.02, scaleY: 0.02, scaleZ: 0.02},
      duration: 500,
      easing: 'bounce',
    },
  });

  const _onAnchorFound = () => {
    setAnimateSkull(true);
  };

  return (
    <ViroARScene onTrackingUpdated={this.onInitialized}>
      <ViroARImageMarker target={'targetOne'} onAnchorFound={_onAnchorFound}>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroARPlane minHeight={0.1} minWidth={0.1} alignment={'Horizontal'}>
          <Viro3DObject
            source={require('./res/12140_Skull_v3_L2.obj')}
            resources={[
              require('./res/12140_Skull_v3_L2.mtl'),
              require('./res/Skull.jpg'),
            ]}
            scale={[0, 0, 0]}
            type="OBJ"
            animation={{name: 'scaleSkull', run: animateSkull}}
          />
        </ViroARPlane>
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const send = () => {
    fetch(
      'https://api.hsforms.com/submissions/v3/integration/submit/25738943/5ef0b30c-9961-4af8-8251-8f4f5833dc3e',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          fields: [
            {
              name: 'firstname',
              value: firstName,
            },
            {
              name: 'email',
              value: email,
            },
          ],
        }),
      },
    )
      .then(response => {
        console.log(response);
        setModalVisible(false);
      })
      .catch(e => console.log(e.responseText));
  };

  return (
    <View style={styles.f1}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
      />
      <View>
        <View style={styles.btn1}>
          <Button
              onPress={() => setModalVisible(true)}
              title="Share"
              color="#a4c0d6"
          />
        </View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.div}>
            <SafeAreaView>
              <Text style={styles.label}>
                First Name :
              </Text>
              <TextInput
                style={styles.input}
                placeHolder="First namee"
                label="First namee"
                onChangeText={setFirstName}
                value={firstName}
              />
              <Text style={styles.label}>
                Email :
              </Text>
              <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
              />
              <View style={styles.btn}>
                <Button onPress={() => send()} title="Send" style={styles.btn} color="#a4c0d6" />
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop : 10,
  },
  btn: {
    marginTop : 20,
    borderRadius: 10,
  },
  div: {
    padding: 20
  },
  label: {
    marginTop : 15,
  },
  btn1: {
    padding: 10,
    backgroundColor : "#5d87a8"
  }
});
