import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroAmbientLight,
  Viro3DObject,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);

  }

  return (
      <ViroARScene onTrackingUpdated={this.onInitialized}>
        <ViroAmbientLight color="#FFFFFF" />
        <Viro3DObject source={require('./res/12140_Skull_v3_L2.obj')}
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
});
