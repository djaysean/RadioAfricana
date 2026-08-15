import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  View,
} from 'react-native';

import {
  ChevronLeft,
  Bell,
  Radio,
} from 'lucide-react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import AppText from '../../components/ui/AppText';
import RadioHeader from '../../components/common/RadioHeader';
import Colors from '../../constants/colors';

import {
  fetchPrograms,
  RadioProgram,
} from '../../services/programs';

import {
  fetchProgramArtwork,
  ProgramArtwork,
} from '../../services/programArtwork';

import {
  subscribeToShow,
  unsubscribeFromShow,
} from '../../services/notifications';

type SubscriptionState = Record<
  string,
  boolean
>;

type ProcessingState = Record<
  string,
  boolean
>;

const ARTWORK_SIZE = 170;
const ARTWORK_SPACING = 12;

/*
 * Continuous marquee speed.
 * Higher value = faster movement.
 */
const ARTWORK_SPEED = 42;

function ProgramCard({
  program,
  subscribed,
  processing,
  onToggle,
}: {
  program: RadioProgram;
  subscribed: boolean;
  processing: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={styles.programCard}>
      <View style={styles.programIcon}>
        <Radio
          size={22}
          strokeWidth={2}
          color={
            subscribed
              ? Colors.gold
              : Colors.text
          }
        />
      </View>

      <View style={styles.programInfo}>
        <AppText
          variant="body"
          style={styles.programName}
        >
          {program.name}
        </AppText>
      </View>

      <View style={styles.switchContainer}>
        {processing ? (
          <ActivityIndicator
            size="small"
            color={Colors.gold}
          />
        ) : (
          <Switch
            value={subscribed}
            onValueChange={onToggle}
            trackColor={{
              false: Colors.divider,
              true: Colors.gold,
            }}
            thumbColor={Colors.white}
            ios_backgroundColor={
              Colors.divider
            }
          />
        )}
      </View>
    </View>
  );
}

function ArtworkCarousel({
  artwork,
}: {
  artwork: ProgramArtwork[];
}) {
  const translateX =
    useRef(new Animated.Value(0));

  const animationRef =
    useRef<Animated.CompositeAnimation | null>(
      null,
    );

  const [containerWidth, setContainerWidth] =
    useState(0);

  useEffect(() => {
    animationRef.current?.stop();

    translateX.current.setValue(0);

    if (
      artwork.length === 0 ||
      containerWidth === 0
    ) {
      return;
    }

    /*
     * We render the artwork sequence twice.
     *
     * Once the first sequence has completely
     * moved away, the second sequence is in
     * exactly the same position as the first
     * sequence was, allowing us to loop
     * seamlessly.
     */
    const cycleWidth =
      artwork.length *
        (ARTWORK_SIZE + ARTWORK_SPACING);

    const duration =
      (cycleWidth / ARTWORK_SPEED) *
      1000;

    const animation =
      Animated.loop(
        Animated.timing(
          translateX.current,
          {
            toValue: -cycleWidth,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          },
        ),
        {
          resetBeforeIteration: true,
        },
      );

    animationRef.current = animation;

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    artwork,
    containerWidth,
  ]);

  if (artwork.length === 0) {
    return null;
  }

  /*
   * Duplicate the artwork sequence so that
   * the transition from the final artwork back
   * to the first artwork is completely seamless.
   */
  const marqueeArtwork = [
    ...artwork,
    ...artwork,
  ];

  return (
    <View
      style={styles.artworkSection}
      onLayout={event => {
        setContainerWidth(
          event.nativeEvent.layout.width,
        );
      }}
    >
      <View
        style={styles.artworkViewport}
      >
        <Animated.View
          style={[
            styles.artworkTrack,
            {
              transform: [
                {
                  translateX:
                    translateX.current,
                },
              ],
            },
          ]}
        >
          {marqueeArtwork.map(
            (item, index) => (
              <View
                key={`${item.id}-${index}`}
                style={styles.artworkCard}
              >
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.artworkImage}
                  resizeMode="cover"
                />
              </View>
            ),
          )}
        </Animated.View>
      </View>
    </View>
  );
}

function ProgrammeFooter() {
  return (
    <AppText
      variant="body"
      style={styles.footerNote}
    >
      Manage your subscriptions anytime.
    </AppText>
  );
}

function ProgrammeSeparator() {
  return (
    <View
      style={styles.itemSeparator}
    />
  );
}

export default function SubscribeToShowsScreen() {
  const navigation = useNavigation();

  const [programs, setPrograms] =
    useState<RadioProgram[]>([]);

  const [artwork, setArtwork] =
    useState<ProgramArtwork[]>([]);

  const [subscriptions, setSubscriptions] =
    useState<SubscriptionState>({});

  const [processing, setProcessing] =
    useState<ProcessingState>({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadPrograms =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          programData,
          artworkData,
        ] = await Promise.all([
          fetchPrograms(),
          fetchProgramArtwork(),
        ]);

        setPrograms(programData);
        setArtwork(artworkData);
      } catch (loadError) {
        console.error(
          'Failed to load Radio Africana programmes:',
          loadError,
        );

        setError(
          'We could not load the programmes right now. Please try again.',
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  const sortedPrograms =
    useMemo(() => {
      return [...programs].sort(
        (a, b) =>
          a.name.localeCompare(
            b.name,
          ),
      );
    }, [programs]);

  const handleToggle =
    async (
      program: RadioProgram,
    ) => {
      if (processing[program.id]) {
        return;
      }

      const currentlySubscribed =
        subscriptions[program.id] === true;

      setProcessing(previous => ({
        ...previous,
        [program.id]: true,
      }));

      try {
        if (currentlySubscribed) {
          await unsubscribeFromShow(
            program.topic,
          );
        } else {
          await subscribeToShow(
            program.topic,
          );
        }

        setSubscriptions(previous => ({
          ...previous,
          [program.id]:
            !currentlySubscribed,
        }));
      } catch (toggleError) {
        console.error(
          `Failed to ${
            currentlySubscribed
              ? 'unsubscribe from'
              : 'subscribe to'
          } ${program.name}:`,
          toggleError,
        );
      } finally {
        setProcessing(previous => ({
          ...previous,
          [program.id]: false,
        }));
      }
    };

  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <RadioHeader />

          <Pressable
            onPress={() =>
              navigation.goBack()
            }
            style={styles.backButton}
            hitSlop={10}
          >
            <ChevronLeft
              size={26}
              strokeWidth={2}
              color={Colors.text}
            />
          </Pressable>
        </View>

        <FlatList
          data={sortedPrograms}
          keyExtractor={item =>
            item.id
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.content
          }
          ListHeaderComponent={
            <>
              <View style={styles.intro}>
                <View
                  style={
                    styles.introIcon
                  }
                >
                  <Bell
                    size={25}
                    strokeWidth={2}
                    color={Colors.gold}
                  />
                </View>

                <AppText
                  variant="body"
                  style={styles.title}
                >
                  Subscribe to Shows
                </AppText>

                <AppText
                  variant="body"
                  style={
                    styles.description
                  }
                >
                  Subscribe to your favourite
                  programmes and we'll
                  notify you when they begin.
                </AppText>
              </View>

              <ArtworkCarousel
                artwork={artwork}
              />

              <View
                style={
                  styles.sectionHeader
                }
              >
                <AppText
                  variant="body"
                  style={
                    styles.sectionTitle
                  }
                >
                  PROGRAMMES
                </AppText>
              </View>

              {loading && (
                <View
                  style={
                    styles.stateContainer
                  }
                >
                  <ActivityIndicator
                    size="large"
                    color={Colors.gold}
                  />

                  <AppText
                    variant="body"
                    style={styles.stateText}
                  >
                    Loading programmes...
                  </AppText>
                </View>
              )}

              {!loading &&
                error && (
                  <View
                    style={
                      styles.stateCard
                    }
                  >
                    <Radio
                      size={28}
                      strokeWidth={2}
                      color={Colors.gold}
                    />

                    <AppText
                      variant="body"
                      style={
                        styles.stateTitle
                      }
                    >
                      Something went wrong
                    </AppText>

                    <AppText
                      variant="body"
                      style={
                        styles.stateDescription
                      }
                    >
                      {error}
                    </AppText>

                    <Pressable
                      onPress={
                        loadPrograms
                      }
                      style={
                        styles.retryButton
                      }
                    >
                      <AppText
                        variant="body"
                        style={
                          styles.retryText
                        }
                      >
                        Try Again
                      </AppText>
                    </Pressable>
                  </View>
                )}

              {!loading &&
                !error &&
                sortedPrograms.length ===
                  0 && (
                  <View
                    style={
                      styles.stateCard
                    }
                  >
                    <Radio
                      size={28}
                      strokeWidth={2}
                      color={Colors.gold}
                    />

                    <AppText
                      variant="body"
                      style={
                        styles.stateTitle
                      }
                    >
                      No programmes available
                    </AppText>

                    <AppText
                      variant="body"
                      style={
                        styles.stateDescription
                      }
                    >
                      There are currently no
                      programmes available
                      to subscribe to.
                    </AppText>
                  </View>
                )}
            </>
          }
          renderItem={({item}) => (
            <ProgramCard
              program={item}
              subscribed={
                subscriptions[item.id] ===
                true
              }
              processing={
                processing[item.id] ===
                true
              }
              onToggle={() =>
                handleToggle(item)
              }
            />
          )}
          ItemSeparatorComponent={
            ProgrammeSeparator
          }
          ListFooterComponent={
            sortedPrograms.length > 0
              ? ProgrammeFooter
              : null
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E7CE',
  },

  header: {
    height: 82,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth:
      StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    left: 12,
    top: 20,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 96,
    backgroundColor: '#F7E7CE',
  },

  intro: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 22,
  },

  introIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gold,
    marginBottom: 16,
  },

  title: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 8,
  },

  description: {
    color: Colors.text,
    opacity: 0.68,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 340,
  },

  artworkSection: {
    marginHorizontal: -20,
    marginBottom: 26,
    overflow: 'hidden',
  },

  artworkViewport: {
    width: '100%',
    overflow: 'hidden',
  },

  artworkTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  artworkCard: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
    marginRight: ARTWORK_SPACING,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gold,
  },

  artworkImage: {
    width: '100%',
    height: '100%',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sectionTitle: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1.2,
  },

  programCard: {
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  programIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    marginRight: 13,
  },

  programInfo: {
    flex: 1,
    paddingRight: 8,
  },

  programName: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    lineHeight: 23,
  },

  switchContainer: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  itemSeparator: {
    height: 10,
  },

  stateContainer: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 24,
    marginBottom: 10,
  },

  stateText: {
    color: Colors.text,
    opacity: 0.6,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 12,
  },

  stateCard: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginBottom: 10,
  },

  stateTitle: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 6,
  },

  stateDescription: {
    color: Colors.text,
    opacity: 0.62,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 320,
  },

  retryButton: {
    marginTop: 18,
    minWidth: 110,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
    borderRadius: 21,
    paddingHorizontal: 22,
  },

  retryText: {
    color: Colors.white,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },

  footerNote: {
    color: Colors.text,
    opacity: 0.45,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});