import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type BannerCardProps = {
  image: ImageSourcePropType | string;
  onPress?: () => void;
};

function BannerCard({
  image,
  onPress,
}: BannerCardProps) {
  const imageSource: ImageSourcePropType =
    typeof image === 'string'
      ? ({ uri: image } as ImageURISource)
      : image;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}
    >
      <Image
        source={imageSource}
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