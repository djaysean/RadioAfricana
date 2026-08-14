import React, {
  useEffect,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  ArrowLeft,
} from 'lucide-react-native';

import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import Colors from '../../constants/colors';

import AppText from '../../components/ui/AppText';

import PageBody from './components/PageBody';

import {
  fetchPageBySlug,
  WordPressPage,
} from '../../services/pages';

import {Routes} from '../../navigation/routes';

import {
  MoreStackParamList,
} from '../../navigation/types';

type PageScreenRouteProp =
  RouteProp<
    MoreStackParamList,
    typeof Routes.PAGE
  >;

type PageNavigationProp =
  NativeStackNavigationProp<
    MoreStackParamList,
    typeof Routes.PAGE
  >;

export default function PageScreen() {
  const navigation =
    useNavigation<PageNavigationProp>();

  const route =
    useRoute<PageScreenRouteProp>();

  const {slug} =
    route.params;

  const [page, setPage] =
    useState<WordPressPage | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const loadPage =
      async () => {
        try {
          const data =
            await fetchPageBySlug(slug);

          if (mounted) {
            setPage(data);
          }
        } catch (error) {
          console.error(
            'Failed to load WordPress page:',
            error,
          );
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    loadPage();

    return () => {
      mounted = false;
    };
  }, [slug]);

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
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.content
          }
        >
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() =>
                navigation.goBack()
              }
            >
              <ArrowLeft
                size={24}
                color={Colors.gold}
                strokeWidth={2.25}
              />
            </Pressable>

            <Image
              source={require(
                '../../../assets/images/logo.png',
              )}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {loading ? (
            <View
              style={styles.pageLoading}
            >
              <ActivityIndicator
                size="large"
                color={Colors.gold}
              />
            </View>
          ) : !page ? (
            <View
              style={styles.errorContainer}
            >
              <AppText
                variant="body"
                style={styles.errorTitle}
              >
                Page could not be loaded.
              </AppText>

              <AppText
                variant="meta"
                style={styles.errorText}
              >
                Please try again later.
              </AppText>
            </View>
          ) : (
            <>
              <View
                style={styles.titleSection}
              >
                <AppText
                  variant="display"
                  style={styles.title}
                >
                  {page.title}
                </AppText>
              </View>

              <PageBody
                content={page.content}
              />
            </>
          )}
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
    paddingBottom: 24,
  },

  header: {
    height: 101,
    backgroundColor:
      Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
    position: 'relative',
  },

  logo: {
    width: 190,
    height: 65,
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 26,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  titleSection: {
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 4,
  },

  title: {
    color: Colors.text,
    fontSize: 34,
    lineHeight: 44,
  },

  pageLoading: {
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorContainer: {
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 80,
    alignItems: 'center',
  },

  errorTitle: {
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },

  errorText: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});