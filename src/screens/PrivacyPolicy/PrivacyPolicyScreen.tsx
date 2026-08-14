import React from 'react';

import {
  Linking,
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
  useNavigation,
} from '@react-navigation/native';

import Colors from '../../constants/colors';

import AppText from '../../components/ui/AppText';

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  const openWebsite = async () => {
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

  return (
    <>
      <StatusBar
        backgroundColor={Colors.white}
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
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

            <AppText
              variant="body"
              style={styles.headerTitle}
            >
              Privacy Policy
            </AppText>
          </View>

          <View style={styles.body}>
            <AppText
              variant="display"
              style={styles.title}
            >
              Privacy Policy
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Your privacy is very important to us.
              At Radio Africana, we have a few
              fundamental principles that we follow:
            </AppText>

            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />

                <AppText
                  variant="body"
                  style={styles.bulletText}
                >
                  We don’t ask you for personal
                  information – Radio Africana
                  (“Radio Africana”) operates on a
                  policy to respect your privacy regn
                  unless we truly need it. (We can’t
                  stand services that ask you for
                  things like your gender or income
                  level for no apparent reason.)
                </AppText>
              </View>

              <View style={styles.bulletItem}>
                <View style={styles.bullet} />

                <AppText
                  variant="body"
                  style={styles.bulletText}
                >
                  We don’t share your personal
                  information with anyone except to
                  comply with the law, develop our
                  products, or protect our rights.
                </AppText>
              </View>

              <View style={styles.bulletItem}>
                <View style={styles.bullet} />

                <AppText
                  variant="body"
                  style={styles.bulletText}
                >
                  We don’t store personal information
                  on our servers unless required for
                  the on-going operation of our site.
                </AppText>
              </View>
            </View>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Radio Africana (“Radio Africana”)
              operates on a policy to respect your
              privacy regarding any information we
              may collect while operating our
              websites.
            </AppText>

            <SectionTitle>
              Website Visitors
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Like most website operators, Radio
              Africana collects non-personally-
              identifying information of the sort
              that web browsers and servers typically
              make available, such as the browser
              type, language preference, referring
              site, and the date and time of each
              visitor request. Radio Africana’ purpose
              in collecting non-personally identifying
              information is to better understand how
              Radio Africana’ visitors use its website.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              From time to time, Radio Africana may
              release non-personally-identifying
              information in the aggregate, e.g., by
              publishing a report on trends in the
              usage of its website.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Radio Africana also collects potentially
              personally-identifying information like
              Internet Protocol (IP) addresses for
              logged in users and for users leaving
              comments on our website. Radio Africana
              only discloses logged in user and
              commenter IP addresses under the same
              circumstances that it uses and discloses
              personally-identifying information as
              described below, except that website
              commenter IP addresses are visible and
              disclosed to the administrators of the
              website where the comment was left.
            </AppText>

            <SectionTitle>
              Gathering of Personally-Identifying
              Information
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Certain visitors to Radio Africana’
              websites choose to interact with Radio
              Africana in ways that require Radio
              Africana to gather personally-identifying
              information. The amount and type of
              information that Radio Africana gathers
              depends on the nature of the interaction.
              For example, we ask visitors who comment
              on our website to provide a username and
              email address. Those who wish to receive
              Radio Africana’ updates via email, we
              collect their emails.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              In each case, Radio Africana collects such
              information only insofar as is necessary
              or appropriate to fulfill the purpose of
              the visitor’s interaction with Radio
              Africana. Radio Africana does not disclose
              personally-identifying information other
              than as described below. And visitors can
              always refuse to supply personally-
              identifying information, with the caveat
              that it may prevent them from engaging in
              certain website-related activities.
            </AppText>

            <SectionTitle>
              Aggregated Statistics
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Radio Africana may collect statistics
              about the behavior of visitors to its
              websites. For instance, Radio Africana
              may monitor the most popular pages on its
              website or use spam screened by the
              Akismet service to help identify spam.
              Radio Africana may display this
              information publicly or provide it to
              others. However, Radio Africana does not
              disclose personally-identifying
              information other than as described below.
            </AppText>

            <SectionTitle>
              Protection of Certain
              Personally-Identifying Information
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Radio Africana discloses potentially
              personally-identifying and personally-
              identifying information only to those of
              its employees, contractors and affiliated
              organizations that (i) need to know that
              information in order to process it on
              Radio Africana’ behalf or to provide
              services available at Radio Africana’
              website, and (ii) that have agreed not to
              disclose it to others.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Some of those employees, contractors and
              affiliated organizations may be located
              outside of your home country; by using
              Radio Africana’ website, you consent to
              the transfer of such information to them.
              Radio Africana will not rent or sell
              potentially personally-identifying and
              personally-identifying information to
              anyone.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Other than to its employees, contractors
              and affiliated organizations, as described
              above, Radio Africana discloses potentially
              personally-identifying and personally-
              identifying information only in response
              to a subpoena, court order or other
              governmental request, or when Radio
              Africana believes in good faith that
              disclosure is reasonably necessary to
              protect the property or rights of Radio
              Africana, third parties or the public at
              large.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              If you are a registered user of the Radio
              Africana website and have supplied your
              email address, Radio Africana may
              occasionally send you an email to tell
              you about new features, solicit your
              feedback, or just keep you up to date
              with what’s going on with Radio Africana
              and our products. We primarily use our
              various product website to communicate
              this type of information, so we expect to
              keep this type of email to a minimum.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              If you send us a request (for example via
              a support email or via one of our feedback
              mechanisms), we reserve the right to
              publish it in order to help us clarify or
              respond to your request or to help us
              support other users. Radio Africana takes
              all measures reasonably necessary to
              protect against the unauthorized access,
              use, alteration or destruction of
              potentially personally-identifying and
              personally-identifying information.
            </AppText>

            <SectionTitle>
              Cookies
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              A cookie is a string of information that
              a website stores on a visitor’s computer,
              and that the visitor’s browser provides
              to the website each time the visitor
              returns. Radio Africana uses cookies to
              help Radio Africana identify and track
              visitors, their usage of Radio Africana
              website, and their website access
              preferences.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Radio Africana visitors who do not wish
              to have cookies placed on their computers
              should set their browsers to refuse
              cookies before using Radio Africana,
              with the drawback that certain features
              of Radio Africana may not function
              properly without the aid of cookies.
            </AppText>

            <SectionTitle>
              Business Transfers
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              If Radio Africana, or substantially all of
              its assets were acquired, or in the
              unlikely event that Radio Africana goes
              out of business or enters bankruptcy,
              user information would be one of the
              assets that is transferred or acquired by
              a third party. You acknowledge that such
              transfers may occur, and that any acquirer
              of Radio Africana may continue to use your
              personal information as set forth in this
              policy.
            </AppText>

            <SectionTitle>
              Ads
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Ads appearing on our website may be
              delivered to users by advertising partners,
              who may set cookies. These cookies allow
              the ad server to recognize your computer
              each time they send you an online
              advertisement to compile information about
              you or others who use your computer. This
              information allows ad networks to, among
              other things, deliver targeted
              advertisements that they believe to be of
              most interest to you.
            </AppText>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              This Privacy Policy covers the use of
              cookies by Radio Africana and does not
              cover the use of cookies by any
              advertisers.
            </AppText>

            <SectionTitle>
              Comments
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Comments and other content submitted to
              Akismet anti-spam service are not saved
              on our servers unless they were marked as
              false positives, in which case we store
              them long enough to use them to improve
              the service to avoid future false
              positives.
            </AppText>

            <SectionTitle>
              Privacy Policy Changes
            </SectionTitle>

            <AppText
              variant="body"
              style={styles.paragraph}
            >
              Although most changes are likely to be
              minor, Radio Africana may change its
              Privacy Policy from time to time, and in
              Radio Africana’ sole discretion. Radio
              Africana encourages visitors to frequently
              check this page for any changes to its
              Privacy Policy. Your continued use of this
              site after any change in this Privacy
              Policy will constitute your acceptance of
              such change.
            </AppText>

            <View style={styles.aboutBox}>
              <AppText
                variant="body"
                style={styles.aboutText}
              >
                Radio Africana is a Digital Audio
                Broadcasting (DAB) Radio Station
                located in Manchester. We are also an
                online radio station. We play the best
                in Afrobeats songs from all over the
                world from our Salford radio station.
                We are your number one stop for the
                best in Afrobeats radio and songs be it
                new or old. You can also listen via our
                website or download our app ‘Radio
                Africana’ from the iOS AppStore,
                Android google play store and Amazon
                App Store.
              </AppText>

              <Pressable
                onPress={openWebsite}
                style={styles.websiteLink}
              >
                <AppText
                  variant="body"
                  style={styles.websiteLinkText}
                >
                  We are Manchester’s Afrobeats Station.
                </AppText>
              </Pressable>
            </View>

            <AppText
              variant="body"
              style={styles.footer}
            >
              © 2026 radioafricana.com. All rights
              reserved.
            </AppText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppText
      variant="body"
      style={styles.sectionTitle}
    >
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingBottom: 48,
  },

  header: {
    height: 101,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
    position: 'relative',
    borderBottomWidth:
      StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
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

  headerTitle: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    lineHeight: 23,
  },

  body: {
    paddingHorizontal: 28,
    paddingTop: 30,
  },

  title: {
    color: Colors.text,
    fontSize: 34,
    lineHeight: 44,
    marginBottom: 28,
  },

  paragraph: {
    color: Colors.text,
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    lineHeight: 30,
    marginBottom: 22,
  },

  bulletList: {
    marginBottom: 22,
  },

  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  bullet: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.gold,
    marginTop: 12,
    marginRight: 12,
  },

  bulletText: {
    flex: 1,
    color: Colors.text,
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    lineHeight: 30,
  },

  sectionTitle: {
    color: Colors.text,
    fontFamily: 'Lora-Bold',
    fontSize: 27,
    lineHeight: 36,
    marginTop: 26,
    marginBottom: 18,
  },

  aboutBox: {
    marginTop: 16,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 18,
    borderLeftWidth: 3,
    borderLeftColor: Colors.gold,
  },

  aboutText: {
    color: Colors.text,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 16,
  },

  websiteLink: {
    alignSelf: 'flex-start',
  },

  websiteLinkText: {
    color: Colors.gold,
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22,
  },

  footer: {
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 36,
  },
});