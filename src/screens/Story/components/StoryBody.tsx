import React from 'react';

import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import RenderHtml from 'react-native-render-html';

import Colors from '../../../constants/colors';

type Props = {
  content: string;
};

const systemFonts = [
  'Inter-Regular',
  'Inter-Medium',
  'Inter-SemiBold',
  'Lora-Regular',
  'Lora-Bold',
];

export default function StoryBody({
  content,
}: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <RenderHtml
        contentWidth={width - 56}
        source={{
          html: content,
        }}
        systemFonts={systemFonts}
        tagsStyles={{
          p: {
            color: Colors.text,
            fontFamily: 'Inter-Regular',
            fontSize: 18,
            lineHeight: 35,
            marginBottom: 24,
          },

          h2: {
            color: Colors.text,
            fontFamily: 'Lora-Bold',
            fontSize: 28,
            lineHeight: 38,
            marginTop: 42,
            marginBottom: 20,
          },

          h3: {
            color: Colors.text,
            fontFamily: 'Lora-Bold',
            fontSize: 24,
            lineHeight: 34,
            marginTop: 36,
            marginBottom: 18,
          },

          strong: {
            color: Colors.text,
            fontFamily: 'Inter-SemiBold',
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
            lineHeight: 33,
            marginBottom: 10,
          },

          blockquote: {
            borderLeftWidth: 4,
            borderLeftColor: Colors.gold,
            paddingLeft: 18,
            marginVertical: 30,
          },

          a: {
            color: Colors.gold,
            fontFamily: 'Inter-Medium',
            textDecorationLine: 'none',
          },

          img: {
            marginVertical: 32,
          },
        }}
      />

      <View style={styles.endSection}>
        <View style={styles.endDivider} />

        <Text style={styles.endText}>
          End of Story
        </Text>

        <View style={styles.endDivider} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 48,
  },

  endSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },

  endDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },

  endText: {
    marginHorizontal: 16,
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});