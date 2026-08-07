import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video, { VideoRef } from 'react-native-video';

const STREAM_URL = 'https://radioafricana.radioca.st/stream';

export default function PlayerTestScreen() {
  const playerRef = useRef<VideoRef>(null);

  const [paused, setPaused] = useState(true);
  const [status, setStatus] = useState('Idle');

  return (
    <SafeAreaView style={styles.container}>
      <Video
        ref={playerRef}
        source={{ uri: STREAM_URL }}
        paused={paused}
        
        playInBackground
        playWhenInactive
        ignoreSilentSwitch="ignore"
        onLoad={() => setStatus('Connected')}
        onBuffer={({ isBuffering }) =>
          setStatus(isBuffering ? 'Buffering…' : 'Playing')
        }
        onError={(error) => {
          console.log(error);
          setStatus('Playback Error');
        }}
        style={styles.hidden}
      />

      <Text style={styles.title}>Radio Africana Test Player</Text>

      <Text style={styles.status}>
        Status: {status}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setPaused(false)}
      >
        <Text style={styles.buttonText}>PLAY STREAM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.stop]}
        onPress={() => setPaused(true)}
      >
        <Text style={styles.buttonText}>STOP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  hidden: {
    width: 0,
    height: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  stop: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});