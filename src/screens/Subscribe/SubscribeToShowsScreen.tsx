import React, {
  useCallback,
  useEffect,
  useMemo,
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
  Switch,
  View,
} from 'react-native';

import {
  ChevronLeft,
  Bell,
  Clock3,
  Radio,
} from 'lucide-react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import AppText from '../../components/ui/AppText';
import Colors from '../../constants/colors';

import {
  fetchPrograms,
  RadioProgram,
} from '../../services/programs';

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

const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function formatTime(hour: number): string {
  const normalizedHour =
    Math.max(0, Math.min(23, hour));

  const period =
    normalizedHour >= 12
      ? 'PM'
      : 'AM';

  const displayHour =
    normalizedHour % 12 || 12;

  return `${displayHour}:00 ${period}`;
}

function formatDays(days: number[]): string {
  const validDays = days
    .filter(
      day =>
        Number.isInteger(day) &&
        day >= 0 &&
        day <= 6,
    )
    .sort((a, b) => a - b);

  if (validDays.length === 0) {
    return 'Schedule unavailable';
  }

  if (validDays.length === 7) {
    return 'Every day';
  }

  if (
    validDays.length === 5 &&
    validDays.every(
      (day, index) => day === index + 1,
    )
  ) {
    return 'Monday – Friday';
  }

  return validDays
    .map(day => DAY_NAMES[day].slice(0, 3))
    .join(' · ');
}

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

        <View style={styles.scheduleRow}>
          <Clock3
            size={14}
            strokeWidth={2}
            color={Colors.text}
          />

          <AppText
            variant="body"
            style={styles.scheduleText}
          >
            {formatDays(program.days)}
            {'  ·  '}
            {formatTime(program.time)}
          </AppText>
        </View>
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

export default function SubscribeToShowsScreen() {
  const navigation = useNavigation();

  const [programs, setPrograms] =
    useState<RadioProgram[]>([]);

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
        const data =
          await fetchPrograms();

        setPrograms(data);
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
        (a, b) => {
          const aDay =
            a.days.length > 0
              ? Math.min(...a.days)
              : 7;

          const bDay =
            b.days.length > 0
              ? Math.min(...b.days)
              : 7;

          if (aDay !== bDay) {
            return aDay - bDay;
          }

          if (a.time !== b.time) {
            return a.time - b.time;
          }

          return a.name.localeCompare(
            b.name,
          );
        },
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

          <Image
            source={require(
              '../../../assets/images/logo.png',
            )}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <ScrollView
          contentContainerStyle={
            styles.content
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.intro}>
            <View style={styles.introIcon}>
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
              Never miss your favourite
              programmes
            </AppText>

            <AppText
              variant="body"
              style={styles.description}
            >
              Subscribe to your favourite
              programmes and we'll notify
              you when they begin.
            </AppText>
          </View>

          <View style={styles.sectionHeader}>
            <AppText
              variant="body"
              style={styles.sectionTitle}
            >
              PROGRAMMES
            </AppText>
          </View>

          {loading ? (
            <View
              style={styles.stateContainer}
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
          ) : error ? (
            <View style={styles.stateCard}>
              <Radio
                size={28}
                strokeWidth={2}
                color={Colors.gold}
              />

              <AppText
                variant="body"
                style={styles.stateTitle}
              >
                Something went wrong
              </AppText>

              <AppText
                variant="body"
                style={styles.stateDescription}
              >
                {error}
              </AppText>

              <Pressable
                onPress={loadPrograms}
                style={styles.retryButton}
              >
                <AppText
                  variant="body"
                  style={styles.retryText}
                >
                  Try Again
                </AppText>
              </Pressable>
            </View>
          ) : sortedPrograms.length === 0 ? (
            <View style={styles.stateCard}>
              <Radio
                size={28}
                strokeWidth={2}
                color={Colors.gold}
              />

              <AppText
                variant="body"
                style={styles.stateTitle}
              >
                No programmes available
              </AppText>

              <AppText
                variant="body"
                style={styles.stateDescription}
              >
                There are currently no
                programmes available to
                subscribe to.
              </AppText>
            </View>
          ) : (
            <View style={styles.programList}>
              {sortedPrograms.map(
                program => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    subscribed={
                      subscriptions[
                        program.id
                      ] === true
                    }
                    processing={
                      processing[
                        program.id
                      ] === true
                    }
                    onToggle={() =>
                      handleToggle(
                        program,
                      )
                    }
                  />
                ),
              )}
            </View>
          )}

          <AppText
            variant="body"
            style={styles.footerNote}
          >
            Manage your subscriptions anytime.
          </AppText>
        </ScrollView>
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
    zIndex: 1,
  },

  logo: {
    width: 190,
    height: 65,
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
    marginBottom: 30,
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

  programList: {
    gap: 10,
  },

  programCard: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
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
    marginBottom: 5,
  },

  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  scheduleText: {
    color: Colors.text,
    opacity: 0.62,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 5,
  },

  switchContainer: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  stateContainer: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 24,
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