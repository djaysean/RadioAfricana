import React from 'react';

import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  Bell,
  ChevronRight,
  Globe,
  Info,
  Mail,
  Share2,
  Shield,
  Users,
} from 'lucide-react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Colors from '../../constants/colors';

import AppText from '../../components/ui/AppText';

import {Routes} from '../../navigation/routes';

import {
  MoreStackParamList,
} from '../../navigation/types';

const appVersion =
  require('../../../package.json').version;

type MoreNavigationProp =
  NativeStackNavigationProp<
    MoreStackParamList,
    typeof Routes.MORE
  >;

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
};

function MenuItem({
  icon,
  label,
  onPress,
}: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.menuItem,
        pressed &&
          styles.menuItemPressed,
      ]}
    >
      <View style={styles.menuIcon}>
        {icon}
      </View>

      <AppText
        variant="body"
        style={styles.menuLabel}
      >
        {label}
      </AppText>

      <ChevronRight
        size={20}
        strokeWidth={2}
        color={Colors.text}
      />
    </Pressable>
  );
}

export default function MoreScreen() {
  const navigation =
    useNavigation<MoreNavigationProp>();

  const openWebsite =
    async () => {
      try {
        await Linking.openURL(
          'https://radioafricana.com/',
        );
      } catch (error) {
        console.error(
          'Failed to open Radio Africana website:',
          error,
        );
      }
    };

  const openPage = (
    slug: string,
  ) => {
    navigation.navigate(
      Routes.PAGE,
      {slug},
    );
  };

  const shareApp =
    async () => {
      try {
        await Share.share({
          message:
            'Listen to Radio Africana — your home for African music, culture and stories.\n\nhttps://radioafricana.com/',
        });
      } catch (error) {
        console.error(
          'Failed to share Radio Africana:',
          error,
        );
      }
    };

  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={
            false
          }
        >
          <View style={styles.header}>
            <Image
              source={require(
                '../../../assets/images/logo.png',
              )}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.body}>
            <Pressable
              onPress={() =>
                navigation.navigate(
                  Routes.SUBSCRIBE_TO_SHOWS,
                )
              }
              style={({pressed}) => [
                styles.subscribeCard,
                pressed &&
                  styles.subscribeCardPressed,
              ]}
            >
              <View
                style={styles.subscribeIcon}
              >
                <Bell
                  size={24}
                  strokeWidth={2}
                  color={Colors.gold}
                />
              </View>

              <View
                style={styles.subscribeContent}
              >
                <AppText
                  variant="body"
                  style={
                    styles.subscribeTitle
                  }
                >
                  Subscribe to Shows
                </AppText>

                <AppText
                  variant="body"
                  style={
                    styles.subscribeDescription
                  }
                >
                  Get notified when your
                  favourite programmes
                  begin.
                </AppText>
              </View>

              <View
                style={styles.subscribeArrow}
              >
                <ChevronRight
                  size={22}
                  strokeWidth={2}
                  color={Colors.text}
                />
              </View>
            </Pressable>

            <AppText
              variant="label"
              style={styles.groupTitle}
            >
              EXPLORE
            </AppText>

            <View style={styles.menu}>
              <MenuItem
                icon={
                  <Mail
                    size={21}
                    strokeWidth={2}
                    color={Colors.text}
                  />
                }
                label="Contact Us"
                onPress={() =>
                  openPage('contacts')
                }
              />

              <MenuItem
                icon={
                  <Users
                    size={21}
                    strokeWidth={2}
                    color={Colors.text}
                  />
                }
                label="Meet the Team"
                onPress={() =>
                  openPage(
                    'team-members',
                  )
                }
              />

              <MenuItem
                icon={
                  <Globe
                    size={21}
                    strokeWidth={2}
                    color={Colors.text}
                  />
                }
                label="Visit Website"
                onPress={openWebsite}
              />
            </View>

            <AppText
              variant="label"
              style={styles.groupTitle}
            >
              APP
            </AppText>

            <View style={styles.menu}>
              <MenuItem
                icon={
                  <Share2
                    size={21}
                    strokeWidth={2}
                    color={Colors.text}
                  />
                }
                label="Share App"
                onPress={shareApp}
              />

              <MenuItem
                icon={
                  <Shield
                    size={21}
                    strokeWidth={2}
                    color={Colors.text}
                  />
                }
                label="Privacy Policy"
                onPress={() =>
                  openPage(
                    'privacy-policy',
                  )
                }
              />

              <MenuItem
                icon={
                  <Info
                    size={21}
                    strokeWidth={2}
                    color={Colors.text}
                  />
                }
                label={`App Version ${appVersion}`}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  header: {
    backgroundColor:
      Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
  },

  logo: {
    width: 190,
    height: 65,
  },

  body: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  subscribeCard: {
    minHeight: 118,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      Colors.white,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: Colors.gold,
  },

  subscribeCardPressed: {
    opacity: 0.72,
  },

  subscribeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      Colors.background,
    marginRight: 16,
  },

  subscribeContent: {
    flex: 1,
    paddingRight: 10,
  },

  subscribeTitle: {
    color: Colors.text,
    marginBottom: 5,
    fontFamily:
      'Inter-SemiBold',
    fontSize: 20,
    lineHeight: 26,
  },

  subscribeDescription: {
    color: Colors.text,
    opacity: 0.7,
    fontFamily:
      'Inter-Regular',
    fontSize: 16,
    lineHeight: 22,
  },

  subscribeArrow: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  groupTitle: {
    marginTop: 28,
    marginBottom: 10,
    color: Colors.text,
    letterSpacing: 1,
  },

  menu: {
    backgroundColor:
      Colors.white,
    borderRadius: 18,
    overflow: 'hidden',
  },

  menuItem: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderBottomWidth:
      StyleSheet.hairlineWidth,
    borderBottomColor:
      Colors.background,
  },

  menuItemPressed: {
    opacity: 0.65,
  },

  menuIcon: {
    width: 38,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  menuLabel: {
    flex: 1,
    color: Colors.text,
  },
});