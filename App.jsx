/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {VideoScreen} from './Screens/Video';


const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <VideoScreen/>
      </View>
    </SafeAreaView>
  );
};



export default App;
