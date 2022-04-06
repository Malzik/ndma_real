/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
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
  const [text, setText] = useState('Initializing AR...');

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

  return (
    <ViroARScene onTrackingUpdated={this.onInitialized}>
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
    });
