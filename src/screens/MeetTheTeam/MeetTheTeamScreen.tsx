import React, {
  useCallback,
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
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import Colors from '../../constants/colors';

import AppText from '../../components/ui/AppText';

import {
  fetchMembers,
  MembersPage,
  TeamMember,
} from '../../services/members';

export default function MeetTheTeamScreen() {
  const navigation =
    useNavigation();

  const [members, setMembers] =
    useState<TeamMember[]>([]);

  const [page, setPage] =
    useState(1);

  const [hasNextPage, setHasNextPage] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadMembers =
    useCallback(
      async (
        requestedPage: number,
      ) => {
        setLoading(true);
        setError(null);

        try {
          const result:
            MembersPage =
            await fetchMembers(
              requestedPage,
            );

          setMembers(
            result.members,
          );

          setHasNextPage(
            result.hasNextPage,
          );

          setPage(
            requestedPage,
          );
        } catch (loadError) {
          console.error(
            'Failed to load Radio Africana team members:',
            loadError,
          );

          setError(
            'We could not load the team right now. Please try again.',
          );
        } finally {
          setLoading(false);
        }
      },
      [],
    );

  useEffect(() => {
    loadMembers(1);
  }, [loadMembers]);

  const goToPreviousPage =
    () => {
      if (
        loading ||
        page <= 1
      ) {
        return;
      }

      loadMembers(page - 1);
    };

  const goToNextPage =
    () => {
      if (
        loading ||
        !hasNextPage
      ) {
        return;
      }

      loadMembers(page + 1);
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
              hitSlop={10}
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

          <View style={styles.body}>
            <AppText
              variant="display"
              style={styles.title}
            >
              Meet the Team
            </AppText>

            <AppText
              variant="body"
              style={styles.intro}
            >
              Meet the people behind Radio
              Africana and the voices that keep
              Manchester's Afrobeats station
              moving.
            </AppText>

            {loading ? (
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
                  Loading our team...
                </AppText>
              </View>
            ) : error ? (
              <View
                style={styles.stateCard}
              >
                <Users
                  size={30}
                  color={Colors.gold}
                  strokeWidth={2}
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
                  onPress={() =>
                    loadMembers(page)
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
            ) : members.length ===
              0 ? (
              <View
                style={styles.stateCard}
              >
                <Users
                  size={30}
                  color={Colors.gold}
                  strokeWidth={2}
                />

                <AppText
                  variant="body"
                  style={
                    styles.stateTitle
                  }
                >
                  No team members found
                </AppText>

                <AppText
                  variant="body"
                  style={
                    styles.stateDescription
                  }
                >
                  There are currently no team
                  members available.
                </AppText>
              </View>
            ) : (
              <>
                <View
                  style={styles.memberList}
                >
                  {members.map(
                    member => (
                      <TeamMemberCard
                        key={
                          member.id
                        }
                        member={
                          member
                        }
                      />
                    ),
                  )}
                </View>

                <View
                  style={
                    styles.pagination
                  }
                >
                  <Pressable
                    onPress={
                      goToPreviousPage
                    }
                    disabled={
                      loading ||
                      page <= 1
                    }
                    style={[
                      styles.paginationButton,
                      (
                        loading ||
                        page <= 1
                      ) &&
                        styles.paginationButtonDisabled,
                    ]}
                  >
                    <ChevronLeft
                      size={19}
                      color={
                        page > 1
                          ? Colors.text
                          : Colors.textSecondary
                      }
                      strokeWidth={2}
                    />

                    <AppText
                      variant="body"
                      style={[
                        styles.paginationText,
                        page <= 1 &&
                          styles.paginationTextDisabled,
                      ]}
                    >
                      Previous
                    </AppText>
                  </Pressable>

                  <View
                    style={
                      styles.pageIndicator
                    }
                  >
                    <AppText
                      variant="body"
                      style={
                        styles.pageNumber
                      }
                    >
                      {page}
                    </AppText>
                  </View>

                  <Pressable
                    onPress={
                      goToNextPage
                    }
                    disabled={
                      loading ||
                      !hasNextPage
                    }
                    style={[
                      styles.paginationButton,
                      (
                        loading ||
                        !hasNextPage
                      ) &&
                        styles.paginationButtonDisabled,
                    ]}
                  >
                    <AppText
                      variant="body"
                      style={[
                        styles.paginationText,
                        !hasNextPage &&
                          styles.paginationTextDisabled,
                      ]}
                    >
                      Next
                    </AppText>

                    <ChevronRight
                      size={19}
                      color={
                        hasNextPage
                          ? Colors.text
                          : Colors.textSecondary
                      }
                      strokeWidth={2}
                    />
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function TeamMemberCard({
  member,
}: {
  member: TeamMember;
}) {
  return (
    <View
      style={styles.memberCard}
    >
      {member.image ? (
        <Image
          source={{
            uri: member.image,
          }}
          style={
            styles.memberImage
          }
          resizeMode="cover"
        />
      ) : (
        <View
          style={
            styles.memberImagePlaceholder
          }
        >
          <Users
            size={34}
            color={Colors.gold}
            strokeWidth={1.8}
          />
        </View>
      )}

      <View
        style={styles.memberBody}
      >
        <AppText
          variant="body"
          style={styles.memberName}
        >
          {member.name}
        </AppText>

        <AppText
          variant="meta"
          style={styles.memberRole}
        >
          {member.role}
        </AppText>

        {member.bio ? (
          <AppText
            variant="body"
            style={styles.memberBio}
          >
            {member.bio}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Colors.background,
    },

    content: {
      paddingBottom: 210,
    },

    header: {
      height: 101,
      backgroundColor:
        Colors.white,
      alignItems: 'center',
      justifyContent:
        'center',
      paddingTop: 18,
      paddingBottom: 18,
      position: 'relative',
      borderBottomWidth:
        StyleSheet.hairlineWidth,
      borderBottomColor:
        Colors.divider,
    },

    backButton: {
      position: 'absolute',
      left: 20,
      top: 26,
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent:
        'center',
      zIndex: 2,
    },

    logo: {
      width: 190,
      height: 65,
    },

    body: {
      paddingHorizontal: 28,
      paddingTop: 30,
    },

    title: {
      color: Colors.text,
      fontSize: 34,
      lineHeight: 44,
      marginBottom: 12,
    },

    intro: {
      color:
        Colors.textSecondary,
      fontFamily:
        'Inter-Regular',
      fontSize: 16,
      lineHeight: 27,
      marginBottom: 30,
    },

    memberList: {
      gap: 16,
    },

    memberCard: {
      backgroundColor:
        Colors.white,
      borderRadius: 20,
      overflow: 'hidden',
    },

    memberImage: {
      width: '100%',
      height: 260,
      backgroundColor:
        Colors.background,
    },

    memberImagePlaceholder: {
      width: '100%',
      height: 260,
      backgroundColor:
        Colors.background,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    memberBody: {
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 22,
    },

    memberName: {
      color: Colors.text,
      fontFamily:
        'Lora-Bold',
      fontSize: 23,
      lineHeight: 30,
      marginBottom: 5,
    },

    memberRole: {
      color: Colors.gold,
      fontFamily:
        'Inter-SemiBold',
      fontSize: 11,
      lineHeight: 17,
      letterSpacing: 1,
      textTransform:
        'uppercase',
      marginBottom: 12,
    },

    memberBio: {
      color:
        Colors.textSecondary,
      fontFamily:
        'Inter-Regular',
      fontSize: 14,
      lineHeight: 23,
    },

    pagination: {
      flexDirection:
        'row',
      alignItems:
        'center',
      justifyContent:
        'space-between',
      marginTop: 24,
      paddingHorizontal: 2,
    },

    paginationButton: {
      minHeight: 44,
      minWidth: 112,
      flexDirection:
        'row',
      alignItems:
        'center',
      justifyContent:
        'center',
      gap: 4,
      borderWidth: 1,
      borderColor:
        Colors.divider,
      borderRadius: 22,
      backgroundColor:
        Colors.white,
      paddingHorizontal: 14,
    },

    paginationButtonDisabled: {
      opacity: 0.5,
    },

    paginationText: {
      color: Colors.text,
      fontFamily:
        'Inter-SemiBold',
      fontSize: 13,
      lineHeight: 19,
    },

    paginationTextDisabled: {
      color:
        Colors.textSecondary,
    },

    pageIndicator: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor:
        Colors.gold,
      alignItems:
        'center',
      justifyContent:
        'center',
    },

    pageNumber: {
      color: Colors.white,
      fontFamily:
        'Inter-SemiBold',
      fontSize: 14,
      lineHeight: 20,
    },

    stateContainer: {
      minHeight: 240,
      alignItems:
        'center',
      justifyContent:
        'center',
      backgroundColor:
        Colors.white,
      borderRadius: 20,
      paddingHorizontal: 24,
    },

    stateText: {
      color:
        Colors.textSecondary,
      fontFamily:
        'Inter-Regular',
      fontSize: 14,
      lineHeight: 21,
      marginTop: 12,
    },

    stateCard: {
      alignItems:
        'center',
      backgroundColor:
        Colors.white,
      borderRadius: 20,
      paddingHorizontal: 24,
      paddingVertical: 34,
    },

    stateTitle: {
      color: Colors.text,
      fontFamily:
        'Inter-SemiBold',
      fontSize: 18,
      lineHeight: 24,
      marginTop: 14,
      marginBottom: 7,
    },

    stateDescription: {
      color:
        Colors.textSecondary,
      fontFamily:
        'Inter-Regular',
      fontSize: 14,
      lineHeight: 22,
      textAlign:
        'center',
      maxWidth: 320,
    },

    retryButton: {
      minWidth: 110,
      height: 42,
      borderRadius: 21,
      backgroundColor:
        Colors.gold,
      alignItems:
        'center',
      justifyContent:
        'center',
      paddingHorizontal: 22,
      marginTop: 20,
    },

    retryText: {
      color: Colors.white,
      fontFamily:
        'Inter-SemiBold',
      fontSize: 14,
      lineHeight: 20,
    },
  });