import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type BannerCardProps = {
  image: any;
  onPress?: () => void;
};

function BannerCard({
  image,
  onPress,
}: BannerCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
},

  image: {
    width: '100%',
    height: '100%',
  },
});

export default BannerCard;