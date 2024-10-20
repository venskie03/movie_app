import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useLocalSearchParams } from 'expo-router';

const EmbeddedVideo = () => {
  const webViewRef = useRef(null);
  const { id } = useLocalSearchParams();

  const onMessage = async (event) => {
    const message = event.nativeEvent.data;

    if (message === 'enterFullscreen') {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE); // Lock to landscape when video is fullscreen
    } else if (message === 'exitFullscreen') {
      await ScreenOrientation.unlockAsync(); // Unlock orientation when exiting fullscreen
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); // Optionally lock back to portrait
    }
  };

  // Intercept URL requests
  const onShouldStartLoadWithRequest = (request) => {
    Alert.alert("Blocked Redirect", "Navigation is not allowed."); // Optional: Show an alert
    return false; // Prevent all navigation
  };

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE); // Lock to landscape on mount
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync(); // Unlock orientation on unmount
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: `https://vidsrc.xyz/embed/movie/${id}` }} // Replace with your embedded URL
        style={styles.webview}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={onMessage}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} // Intercept URL requests
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: '100%',
    height: '100%',
  },
});

export default EmbeddedVideo;
