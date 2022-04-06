/* eslint-disable prettier/prettier */
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
} from 'react-native';

import {
  ViroARScene,
  ViroBox,
  ViroARSceneNavigator,
  ViroAmbientLight,
  Viro3DObject,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from '@viro-community/react-viro';


const HelloWorldSceneAR = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
  }

  ViroARTrackingTargets.createTargets({
    'targetOne': {
      source: require('./res/rhino.png'),
      orientation: 'Up',
      physicalWidth: 0.5, // real world width in meters
    },
  });

  const send = () => {
    fetch('https://api.hsforms.com/submissions/v3/integration/submit/25738943/5ef0b30c-9961-4af8-8251-8f4f5833dc3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        fields: [
          {
            firstname : firstName,
            email: email,
          },
  ],
  }),
  }).then((response) => {
      console.log(response);
    }).catch(e => console.log(e.responseText));
  };

 return (
    <ViroARScene onTrackingUpdated={this.onInitialized}>

        <Button
            onPress={() =>  setModalVisible(true) }
            title="Send"
            color="#841584"
        />

      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
      >
        <View>
          <SafeAreaView>
            <TextInput
                style={styles.input}
                placeholder="First name"
                onChangeText={setFirstName}
                value={firstName}
            />
            <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
            />
            <Button
                onPress={() =>  send() }
                title="Send"
                color="#841584"
            />
          </SafeAreaView>
        </View>
      </Modal>


      <ViroARImageMarker target={'targetOne'} onAnchorFound={()=> console.log('Trouvé !!')}>
      <ViroAmbientLight color="#FFFFFF" />
      <Viro3DObject
        source={require('./res/12140_Skull_v3_L2.obj')}
        resources={[
          require('./res/12140_Skull_v3_L2.mtl'),
          require('./res/Skull.jpg'),
        ]}
        highAccuracyEvents={true}
        position={[0, 2, -3]}
        scale={[0.05, 0.05, 0.05]}
        rotation={[-45, 0, 0]}
        type="OBJ"
        //transformBehaviors={["billboard"]}
      />
      </ViroARImageMarker>
    </ViroARScene>
    );
  };

  export default () => {
    return (
      <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
      />
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
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    });
