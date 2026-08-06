import React from 'react';

import {
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import RenderHtml from 'react-native-render-html';

import Colors from '../../../constants/colors';

type Props = {
  content: string;
};

export default function StoryBody({
  content,
}: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <RenderHtml
        contentWidth={width - 48}
        source={{
          html: content,
        }}
        tagsStyles={{
          p: {
            color: Colors.text,
            fontFamily: 'Inter-Regular',
            fontSize: 18,
            lineHeight: 34,
            marginBottom: 22,
          },

          h2: {
            color: Colors.text,
            fontFamily: 'Lora-Bold',
            fontSize: 28,
            lineHeight: 38,
            marginTop: 36,
            marginBottom: 18,
          },

          h3: {
            color: Colors.text,
            fontFamily: 'Lora-Bold',
            fontSize: 24,
            lineHeight: 34,
            marginTop: 32,
            marginBottom: 16,
          },

          strong: {
            fontFamily: 'Inter-SemiBold',
            color: Colors.text,
          },

          em: {
            fontStyle: 'italic',
          },

          ul: {
            marginBottom: 24,
          },

          ol: {
            marginBottom: 24,
          },

          li: {
            color: Colors.text,
            fontFamily: 'Inter-Regular',
            fontSize: 18,
            lineHeight: 32,
            marginBottom: 8,
          },

          blockquote: {
            borderLeftWidth: 4,
            borderLeftColor: Colors.gold,
            paddingLeft: 16,
            marginVertical: 28,
          },

          a: {
            color: Colors.gold,
            fontFamily: 'Inter-Medium',
            textDecorationLine: 'none',
          },

          img: {
            marginVertical: 28,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
});