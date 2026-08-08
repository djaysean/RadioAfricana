import React, {
  useEffect,
  useState,
} from 'react';

import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ChevronRight,
  Globe,
  Info,
  Mail,
  Share2,
  Shield,
  Users,
} from 'lucide-react-native';

import Colors from '../../constants/colors';

import MiniPlayer from '../../components/MiniPlayer';

import {
  fetchNowPlaying,
  NowPlaying,
} from '../../services/nowPlaying';

const appVersion =
  require('../../../package.json').version;

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
        pressed && styles.menuItemPressed,
      ]}
    >
      <View style={styles.menuIcon}>
        {icon}
      </View>

      <Text style={styles.menuLabel}>
        {label}
      </Text>

      <ChevronRight
        size={20}
        strokeWidth={2}
        color={Colors.text}
      />
    </Pressable>
  );
}

export default function MoreScreen() {
  const [nowPlaying, setNowPlaying] =
    useState<NowPlaying>({
      artist: '',
      title: 'Loading...',
      picture: null,
    });

  useEffect(() => {
    let mounted = true;

    const loadNowPlaying = async () => {
      try {
        const data =
          await fetchNowPlaying();

        if (mounted) {
          setNowPlaying(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadNowPlaying();

    const interval = setInterval(
      loadNowPlaying,
      5000,
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const openUrl = async (
    url: string,
  ) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message:
          'Listen to Radio Africana — your home for African music, culture and stories.\n\nhttps://radioafricana.com/',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.body}>
            <Text style={styles.sectionTitle}>
              MORE
            </Text>

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
                  openUrl(
                    'https://radioafricana.com/contacts/',
                  )
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
                  openUrl(
                    'https://radioafricana.com/team-members/',
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
                onPress={() =>
                  openUrl(
                    'https://radioafricana.com/',
                  )
                }
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
                  openUrl(
                    'https://radioafricana.com/privacy-policy/',
                  )
                }
              />

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
        </View>

        <MiniPlayer
          title={nowPlaying.title}
          artist={nowPlaying.artist}
          picture={nowPlaying.picture}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
  },

  header: {
    backgroundColor: Colors.white,
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

  sectionTitle: {
    marginBottom: 12,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 1,
  },

  menu: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    overflow: 'hidden',
  },

  menuItem: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.background,
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
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
});