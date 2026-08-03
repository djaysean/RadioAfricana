import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function MiniPlayer() {
  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.artwork}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text
          style={styles.song}
          numberOfLines={1}
        >
          Bless Me
        </Text>

        <Text
          style={styles.artist}
          numberOfLines={1}
        >
          Chinko Ekun
        </Text>

        <Text style={styles.live}>
          ● LIVE
        </Text>
      </View>

      <TouchableOpacity style={styles.playButton}>
        <Text style={styles.playIcon}>▶</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  artwork: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  song: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },

  artist: {
    marginTop: 2,
    fontSize: 14,
    color: '#666666',
  },

  live: {
    marginTop: 6,
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: '700',
  },

  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 2,
  },
});

export default MiniPlayer;