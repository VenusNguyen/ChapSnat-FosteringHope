
import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function VideoScreen() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://kidsinthespotlight.s3.us-west-1.amazonaws.com/kids.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLXdlc3QtMSJIMEYCIQDrzsIT5FjKR7mIhTBug7ZJsrpPce0%2Bg4GpFTxkHRVCsgIhANLJpndPv7xxxYNr6lq1WDZskUYBHhuGE%2BU4NfiCqdgwKvYCCDYQABoMMTE5NTMwMDcxMDc1IgyTBAc6RfSbyCdHAlEq0wIkEXXOo0GIPJSnsqCG5uAcex83ANq158iFSzspbxvsL%2Fw%2B36WgBvJxZkEPVOwJILU8wY%2FQh6g40tbJ%2Fm1Yr5JrW8KbdZDb10QKYFUeAuLE%2F9k4a4eHMhTkW6vJ%2FaBRL6Uravk5%2FAiFMaBp%2FjNgVkcXS63P6wTMdQ7Uy5%2Fi1TW6a%2Bvzw56hlzIE49hpfv0qh%2BIDJ%2F75eVooS0d%2FCVGH8YOTuSPfaVHWWmZG9Zq8IS26y3plHHWGTmpztqNpfXuZtTV614Kp7Ku9tyqNoiiwQPCj%2Fo%2BEStru8m0iQxGEB8olPrSd2bIcFVTtLJFUH8QvJ7KgJz9pgps9aFJbFmmCc1QH0IDD%2FHV8bvkMhHipfObPZ%2FAWPmkBbXuEuxemh%2FESNg6V01%2BkFK40oZo6Ijf7MxffFgpa9IAuND%2BDbFcnW%2BoW%2FvqSDfEJJfJgoPhPykeN3ZuT4zYwj%2FGriAY6sgLEZZhx7nCUr4oHifWi8NO%2B870Mq06%2FbUA8eHWJFWzJqDVxwb0YSfssrN9d3HwuQZ%2B7k0I2U96885zF8p6N%2BOHChDtTaS6i%2B%2FC19zN1iY44YGbKG357CcYZdGk8tmO3d4IcNkOHp%2BbhLlUM1YHl3dDxpO5Pop0ASkiRRjxoFCBxNLaEzljaPkl0fv%2FUH1huxhGQd13MZ3CBbzUkqhkzItw%2BHIX0ci7E9X%2FVStW4%2B3EibOdcJSN1GjfmsPCI5pzAYOaDs1UUMYE6ZNkzdFhNlNEIucXjj9%2F9kRzf%2BLRlUOJtkU5pImyXCxUTIBibN1xK1vRFSNkcd2Do3tQvyLkneXvG7Sz3WJ8TjQBkTCHrQKj7lg43%2B1GUctYerrmYcKF%2BhQlaSTNh5cKtbmCMgufC9LG2l8Y%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210804T205440Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIARXVEMEQRYMP4YW5S%2F20210804%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=124e5afea45732a40dc5f9a7419c028692c91baf6d60f6737299b72cbfcbf986',
        }}
        //http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
