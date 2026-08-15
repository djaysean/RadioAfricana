import React from 'react';

import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

import Colors from '../../constants/colors';

export default function RadioHeader() {
  return (
    <View style={styles.container}>
      {/* Subtle gold frame */}
      <View
        pointerEvents="none"
        style={styles.frame}
      />

      {/* Left broadcast accent */}
      <View
        pointerEvents="none"
        style={styles.leftAccent}
      >
        <Svg
          width={132}
          height={65}
          viewBox="0 0 132 65"
        >
          <Defs>
            <LinearGradient
              id="leftFade"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <Stop
                offset="0"
                stopColor={Colors.gold}
                stopOpacity="0"
              />
              <Stop
                offset="0.45"
                stopColor={Colors.gold}
                stopOpacity="0.16"
              />
              <Stop
                offset="1"
                stopColor={Colors.gold}
                stopOpacity="0.55"
              />
            </LinearGradient>
          </Defs>

          <Path
            d="M8 18C27 18 40 23 40 32.5C40 42 27 47 8 47"
            fill="none"
            stroke="url(#leftFade)"
            strokeWidth={1.25}
            strokeLinecap="round"
          />

          <Path
            d="M24 22C38 22 48 26 48 32.5C48 39 38 43 24 43"
            fill="none"
            stroke="url(#leftFade)"
            strokeWidth={1.25}
            strokeLinecap="round"
          />

          <Path
            d="M40 26C49 26 55 28.5 55 32.5C55 36.5 49 39 40 39"
            fill="none"
            stroke="url(#leftFade)"
            strokeWidth={1.25}
            strokeLinecap="round"
          />

          <Circle
            cx="66"
            cy="32.5"
            r="2"
            fill={Colors.gold}
            opacity={0.38}
          />
        </Svg>
      </View>

      {/* Right broadcast accent */}
      <View
        pointerEvents="none"
        style={styles.rightAccent}
      >
        <Svg
          width={132}
          height={65}
          viewBox="0 0 132 65"
        >
          <Defs>
            <LinearGradient
              id="rightFade"
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            >
              <Stop
                offset="0"
                stopColor={Colors.gold}
                stopOpacity="0"
              />
              <Stop
                offset="0.45"
                stopColor={Colors.gold}
                stopOpacity="0.16"
              />
              <Stop
                offset="1"
                stopColor={Colors.gold}
                stopOpacity="0.55"
              />
            </LinearGradient>
          </Defs>

          <Path
            d="M124 18C105 18 92 23 92 32.5C92 42 105 47 124 47"
            fill="none"
            stroke="url(#rightFade)"
            strokeWidth={1.25}
            strokeLinecap="round"
          />

          <Path
            d="M108 22C94 22 84 26 84 32.5C84 39 94 43 108 43"
            fill="none"
            stroke="url(#rightFade)"
            strokeWidth={1.25}
            strokeLinecap="round"
          />

          <Path
            d="M92 26C83 26 77 28.5 77 32.5C77 36.5 83 39 92 39"
            fill="none"
            stroke="url(#rightFade)"
            strokeWidth={1.25}
            strokeLinecap="round"
          />

          <Circle
            cx="66"
            cy="32.5"
            r="2"
            fill={Colors.gold}
            opacity={0.38}
          />
        </Svg>
      </View>

      {/* Subtle left edge texture */}
      <View
        pointerEvents="none"
        style={styles.leftDots}
      >
        <Svg
          width={72}
          height={65}
          viewBox="0 0 72 65"
        >
          <Circle
            cx="8"
            cy="13"
            r="1"
            fill={Colors.gold}
            opacity={0.06}
          />
          <Circle
            cx="20"
            cy="13"
            r="1"
            fill={Colors.gold}
            opacity={0.08}
          />
          <Circle
            cx="32"
            cy="13"
            r="1"
            fill={Colors.gold}
            opacity={0.1}
          />

          <Circle
            cx="8"
            cy="25"
            r="1"
            fill={Colors.gold}
            opacity={0.08}
          />
          <Circle
            cx="20"
            cy="25"
            r="1"
            fill={Colors.gold}
            opacity={0.1}
          />
          <Circle
            cx="32"
            cy="25"
            r="1"
            fill={Colors.gold}
            opacity={0.12}
          />

          <Circle
            cx="8"
            cy="37"
            r="1"
            fill={Colors.gold}
            opacity={0.08}
          />
          <Circle
            cx="20"
            cy="37"
            r="1"
            fill={Colors.gold}
            opacity={0.1}
          />
          <Circle
            cx="32"
            cy="37"
            r="1"
            fill={Colors.gold}
            opacity={0.12}
          />

          <Circle
            cx="8"
            cy="49"
            r="1"
            fill={Colors.gold}
            opacity={0.06}
          />
          <Circle
            cx="20"
            cy="49"
            r="1"
            fill={Colors.gold}
            opacity={0.08}
          />
          <Circle
            cx="32"
            cy="49"
            r="1"
            fill={Colors.gold}
            opacity={0.1}
          />
        </Svg>
      </View>

      {/* Subtle right edge texture */}
      <View
        pointerEvents="none"
        style={styles.rightDots}
      >
        <Svg
          width={72}
          height={65}
          viewBox="0 0 72 65"
        >
          <Circle
            cx="40"
            cy="13"
            r="1"
            fill={Colors.gold}
            opacity={0.1}
          />
          <Circle
            cx="52"
            cy="13"
            r="1"
            fill={Colors.gold}
            opacity={0.08}
          />
          <Circle
            cx="64"
            cy="13"
            r="1"
            fill={Colors.gold}
            opacity={0.06}
          />

          <Circle
            cx="40"
            cy="25"
            r="1"
            fill={Colors.gold}
            opacity={0.12}
          />
          <Circle
            cx="52"
            cy="25"
            r="1"
            fill={Colors.gold}
            opacity={0.1}
          />
          <Circle
            cx="64"
            cy="25"
            r="1"
            fill={Colors.gold}
            opacity={0.08}
          />

          <Circle
            cx="40"
            cy="37"
            r="1"
            fill={Colors.gold}
            opacity={0.12}
          />
          <Circle
            cx="52"
            cy="37"
            r="1"
            fill={Colors.gold}
            opacity={0.1}
          />
          <Circle
            cx="64"
            cy="37"
            r="1"
            fill={Colors.gold}
            opacity={0.08}
          />

          <Circle
            cx="40"
            cy="49"
            r="1"
            fill={Colors.gold}
            opacity={0.1}
          />
          <Circle
            cx="52"
            cy="49"
            r="1"
            fill={Colors.gold}
            opacity={0.08}
          />
          <Circle
            cx="64"
            cy="49"
            r="1"
            fill={Colors.gold}
            opacity={0.06}
          />
        </Svg>
      </View>

      {/* Existing Radio Africana logo */}
      <Image
        source={require(
          '../../../assets/images/logo.png',
        )}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  frame: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1.25,
    borderColor: Colors.gold,
    borderRadius: 14,
    opacity: 0.78,
  },

  logo: {
    width: 190,
    height: 65,
    zIndex: 3,
  },

  leftAccent: {
    position: 'absolute',
    left: 68,
    top: 0,
    zIndex: 1,
  },

  rightAccent: {
    position: 'absolute',
    right: 68,
    top: 0,
    zIndex: 1,
  },

  leftDots: {
    position: 'absolute',
    left: 0,
    top: 0,
  },

  rightDots: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});