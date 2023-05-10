/**
 * @format
 */
import React, {useState, useEffect} from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';

export const VideoModel = props => {
  const {theme} = props;
  const [screenState, setScreenState] = useState({
    fullScreen: false,
    Width_Layout: '',
    Height_Layout: '',
    potraitMode: true,
  });

  useEffect(() => {
    Orientation.unlockAllOrientations();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  useEffect(() => {
    detectOrientation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenState.Width_Layout]);

  useEffect(() => {
    let {fullScreen, potraitMode} = screenState;
    !fullScreen && !potraitMode ? Orientation.lockToPortrait() : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenState.fullScreen]);

  const changeState = values => {
    setScreenState(prevState => {
      return {
        ...prevState,
        ...values,
      };
    });
  };

  const detectOrientation = () => {
    if (screenState.Width_Layout > screenState.Height_Layout) {
      // Write code here, which you want to execute on Landscape Mode.
      changeState({fullScreen: true, potraitMode: false});
    } else {
      // Write code here, which you want to execute on Portrait Mode.
      changeState({fullScreen: false, potraitMode: true});
    }
  };

  const modalScreenView = () => {
    return (
      <TouchableOpacity
        style={styles.ModalOutsideContainer}
        onPress={() =>
          props.toggleModal({
            isVisible: false,
            data: null,
          })
        }>
        <View style={styles.ModalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.ModalBox}>
              <View style={styles.VideoPlayerContainer}>
                {videoPlayerView()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    );
  };

  const videoPlayerView = () => {
    let {fullScreen} = screenState;
    return (
      <VideoPlayer
        source={{
          uri: props.videoDetail.url,
        }}
        onBack={() =>
          props.toggleModal({
            isVisible: false,
            data: null,
          })
        }
        resizeMode="contain"
        toggleResizeModeOnFullscreen={false}
        onEnterFullscreen={() => {
          changeState({fullScreen: !fullScreen});
        }}
      />
    );
  };

  return (
    <>
      {screenState?.fullScreen ? (
        <Modal
          animationType={'fade'}
          supportedOrientations={['portrait', 'landscape']}
          transparent={true}
          visible={props.isVisible}>
          <View
            style={styles.ModalWrapper}
            onLayout={event => {
              const {layout} = event.nativeEvent;
              changeState({
                Width_Layout: layout.width,
                Height_Layout: layout.height,
              });
            }}>
            {videoPlayerView()}
          </View>
        </Modal>
      ) : (
        <>{modalScreenView()}</>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ModalOutsideContainer: {
    flex: 1,
  },
  ModalContainer: {
    flex: 1,

    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ModalWrapper: {
    flex: 1,
    borderWidth: 1,
  },
  ModalBox: {
    height: 250,
  },
  VideoPlayerContainer: {
    // // width: '100%',
    // // height: '100%',
    flex: 1,
  },
  VideoTitle: {
    paddingVertical: 8,
    fontSize: 18,
    textAlign: 'center',
  },
});
