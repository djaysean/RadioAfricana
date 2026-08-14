import React, {
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {
  ArrowLeft,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import Colors from '../../constants/colors';

import AppText from '../../components/ui/AppText';

type Topic =
  | ''
  | 'General Enquiry'
  | 'Advertising'
  | 'Partnership'
  | 'News Tip'
  | 'Programme Feedback'
  | 'Technical Support'
  | 'Other';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  topic: Topic;
  subject: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  subject?: string;
  message?: string;
  privacyConsent?: string;
};

const TOPICS: Exclude<Topic, ''>[] = [
  'General Enquiry',
  'Advertising',
  'Partnership',
  'News Tip',
  'Programme Feedback',
  'Technical Support',
  'Other',
];

const CONTACT_FORM_ID = 6452;

const CONTACT_FORM_ENDPOINT =
  `https://radioafricana.com/wp-json/contact-form-7/v1/contact-forms/${CONTACT_FORM_ID}/feedback`;

const EMAIL_ADDRESS =
  'info@radioafricana.com';

const PHONE_NUMBER =
  '+44 74 11 55 5771';

const ADDRESS =
  'M6 5FW, Manchester, United Kingdom';

const WEBSITE_URL =
  'https://radioafricana.com/';

const MAP_URL =
  'https://maps.google.com/?q=M6+5FW';

export default function ContactUsScreen() {
  const navigation = useNavigation();

  const [values, setValues] =
    useState<FormValues>({
      name: '',
      email: '',
      phone: '',
      topic: '',
      subject: '',
      message: '',
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [privacyConsent, setPrivacyConsent] =
    useState(false);

  const [showTopics, setShowTopics] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const updateValue = (
    field: keyof FormValues,
    value: string,
  ) => {
    setValues(previous => ({
      ...previous,
      [field]:
        field === 'topic'
          ? (value as Topic)
          : value,
    }));

    setErrors(previous => {
      if (!previous[field]) {
        return previous;
      }

      const next = {
        ...previous,
      };

      delete next[field];

      return next;
    });

    if (submitted) {
      setSubmitted(false);
    }
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name =
        'Please enter your full name.';
    }

    if (!values.email.trim()) {
      nextErrors.email =
        'Please enter your email address.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        values.email.trim(),
      )
    ) {
      nextErrors.email =
        'Please enter a valid email address.';
    }

    if (!values.topic) {
      nextErrors.topic =
        'Please select a reason for contact.';
    }

    if (!values.subject.trim()) {
      nextErrors.subject =
        'Please enter a subject.';
    }

    const messageLength =
      values.message.trim().length;

    if (!messageLength) {
      nextErrors.message =
        'Please enter your message.';
    } else if (messageLength < 20) {
      nextErrors.message =
        'Your message must be at least 20 characters.';
    } else if (messageLength > 2000) {
      nextErrors.message =
        'Your message cannot exceed 2000 characters.';
    }

    if (!privacyConsent) {
      nextErrors.privacyConsent =
        'Please confirm that you agree to the privacy statement.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setSubmitted(false);

    try {
      const formData =
        new FormData();

      formData.append(
        '_wpcf7_unit_tag',
        `wpcf7-f${CONTACT_FORM_ID}`,
      );

      formData.append(
        'your-name',
        values.name.trim(),
      );

      formData.append(
        'your-email',
        values.email.trim(),
      );

      formData.append(
        'your-phone',
        values.phone.trim(),
      );

      formData.append(
        'your-topic',
        values.topic,
      );

      formData.append(
        'your-subject',
        values.subject.trim(),
      );

      formData.append(
        'your-message',
        values.message.trim(),
      );

      formData.append(
        'website',
        '',
      );

      formData.append(
        'privacy-consent',
        '1',
      );

      const response =
        await fetch(
          CONTACT_FORM_ENDPOINT,
          {
            method: 'POST',
            body: formData,
          },
        );

      const data =
        await response.json();

      if (
        response.ok &&
        data?.status ===
          'mail_sent'
      ) {
        setSubmitted(true);

        setValues({
          name: '',
          email: '',
          phone: '',
          topic: '',
          subject: '',
          message: '',
        });

        setPrivacyConsent(false);
        setErrors({});
        setShowTopics(false);

        return;
      }

      if (
        data?.status ===
        'validation_failed'
      ) {
        const serverErrors =
          data?.invalid_fields ?? [];

        const nextErrors: FormErrors =
          {};

        for (
          const field of serverErrors
        ) {
          const fieldName =
            field?.field;

          const message =
            field?.message;

          if (
            typeof fieldName !==
              'string' ||
            typeof message !==
              'string'
          ) {
            continue;
          }

          switch (fieldName) {
            case 'your-name':
              nextErrors.name =
                message;
              break;

            case 'your-email':
              nextErrors.email =
                message;
              break;

            case 'your-phone':
              nextErrors.phone =
                message;
              break;

            case 'your-topic':
              nextErrors.topic =
                message;
              break;

            case 'your-subject':
              nextErrors.subject =
                message;
              break;

            case 'your-message':
              nextErrors.message =
                message;
              break;

            case 'privacy-consent':
              nextErrors.privacyConsent =
                message;
              break;

            default:
              break;
          }
        }

        setErrors(nextErrors);

        Alert.alert(
          'Please check your details',
          data?.message ??
            'One or more fields need your attention.',
        );

        return;
      }

      if (
        data?.status === 'spam'
      ) {
        Alert.alert(
          'Message not sent',
          'The message was identified as spam. Please review your information and try again.',
        );

        return;
      }

      if (
        data?.status ===
        'mail_failed'
      ) {
        Alert.alert(
          'Message not sent',
          'Your message was received, but we could not send it right now. Please try again later.',
        );

        return;
      }

      Alert.alert(
        'Unable to send message',
        data?.message ??
          'We could not send your message right now. Please try again later.',
      );
    } catch (error) {
      console.error(
        'Failed to submit Contact Us form:',
        error,
      );

      Alert.alert(
        'Unable to send message',
        'We could not connect to Radio Africana right now. Please check your connection and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openLink = async (
    url: string,
  ) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error(
        'Failed to open external link:',
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
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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
              Contact Us
            </AppText>
          </View>

          <View style={styles.body}>
            <AppText
              variant="display"
              style={styles.title}
            >
              How can we help?
            </AppText>

            <AppText
              variant="body"
              style={styles.intro}
            >
              Whether you have a question,
              feedback, partnership opportunity
              or need technical support, we'd love
              to hear from you.
            </AppText>

            <View
              style={styles.contactCards}
            >
              <Pressable
                style={styles.contactCard}
                onPress={() =>
                  openLink(
                    `tel:${PHONE_NUMBER.replace(
                      /\s/g,
                      '',
                    )}`,
                  )
                }
              >
                <View
                  style={styles.contactIcon}
                >
                  <Phone
                    size={21}
                    color={Colors.gold}
                    strokeWidth={2}
                  />
                </View>

                <View
                  style={styles.contactInfo}
                >
                  <AppText
                    variant="meta"
                    style={
                      styles.contactLabel
                    }
                  >
                    PHONE
                  </AppText>

                  <AppText
                    variant="body"
                    style={
                      styles.contactValue
                    }
                  >
                    {PHONE_NUMBER}
                  </AppText>
                </View>
              </Pressable>

              <Pressable
                style={styles.contactCard}
                onPress={() =>
                  openLink(
                    `mailto:${EMAIL_ADDRESS}`,
                  )
                }
              >
                <View
                  style={styles.contactIcon}
                >
                  <Mail
                    size={21}
                    color={Colors.gold}
                    strokeWidth={2}
                  />
                </View>

                <View
                  style={styles.contactInfo}
                >
                  <AppText
                    variant="meta"
                    style={
                      styles.contactLabel
                    }
                  >
                    EMAIL
                  </AppText>

                  <AppText
                    variant="body"
                    style={
                      styles.contactValue
                    }
                  >
                    {EMAIL_ADDRESS}
                  </AppText>
                </View>
              </Pressable>

              <Pressable
                style={styles.contactCard}
                onPress={() =>
                  openLink(MAP_URL)
                }
              >
                <View
                  style={styles.contactIcon}
                >
                  <MapPin
                    size={21}
                    color={Colors.gold}
                    strokeWidth={2}
                  />
                </View>

                <View
                  style={styles.contactInfo}
                >
                  <AppText
                    variant="meta"
                    style={
                      styles.contactLabel
                    }
                  >
                    LOCATION
                  </AppText>

                  <AppText
                    variant="body"
                    style={
                      styles.contactValue
                    }
                  >
                    {ADDRESS}
                  </AppText>
                </View>
              </Pressable>
            </View>

            <View
              style={styles.formSection}
            >
              <AppText
                variant="body"
                style={styles.sectionTitle}
              >
                Send us a message
              </AppText>

              {submitted ? (
                <View
                  style={styles.successCard}
                >
                  <View
                    style={
                      styles.successIcon
                    }
                  >
                    <Check
                      size={24}
                      color={Colors.white}
                      strokeWidth={2.5}
                    />
                  </View>

                  <AppText
                    variant="body"
                    style={
                      styles.successTitle
                    }
                  >
                    Message sent
                  </AppText>

                  <AppText
                    variant="body"
                    style={
                      styles.successText
                    }
                  >
                    Thank you for contacting
                    Radio Africana. Your message
                    has been sent successfully.
                  </AppText>
                </View>
              ) : null}

              <Field
                label="Your Name"
                required
                value={values.name}
                placeholder="Enter your full name"
                autoComplete="name"
                error={errors.name}
                onChangeText={(
                  value: string,
                ) =>
                  updateValue(
                    'name',
                    value,
                  )
                }
              />

              <Field
                label="Your Email Address"
                required
                value={values.email}
                placeholder="example@email.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                error={errors.email}
                onChangeText={(
                  value: string,
                ) =>
                  updateValue(
                    'email',
                    value,
                  )
                }
              />

              <Field
                label="Phone Number"
                optional
                value={values.phone}
                placeholder="Phone number (include country code if outside your region)"
                keyboardType="phone-pad"
                autoComplete="tel"
                error={errors.phone}
                onChangeText={(
                  value: string,
                ) =>
                  updateValue(
                    'phone',
                    value,
                  )
                }
              />

              <View style={styles.field}>
                <FieldLabel
                  label="Reason for Contact"
                  required
                />

                <Pressable
                  style={[
                    styles.select,
                    errors.topic &&
                      styles.inputError,
                  ]}
                  onPress={() =>
                    setShowTopics(
                      previous =>
                        !previous,
                    )
                  }
                >
                  <AppText
                    variant="body"
                    style={[
                      styles.selectText,
                      !values.topic &&
                        styles.placeholder,
                    ]}
                  >
                    {values.topic ||
                      'Select a reason...'}
                  </AppText>

                  <ChevronDown
                    size={20}
                    color={
                      Colors.textSecondary
                    }
                    strokeWidth={2}
                  />
                </Pressable>

                {showTopics ? (
                  <View
                    style={styles.options}
                  >
                    {TOPICS.map(
                      topic => (
                        <Pressable
                          key={topic}
                          style={
                            styles.option
                          }
                          onPress={() => {
                            updateValue(
                              'topic',
                              topic,
                            );

                            setShowTopics(
                              false,
                            );
                          }}
                        >
                          <AppText
                            variant="body"
                            style={
                              styles.optionText
                            }
                          >
                            {topic}
                          </AppText>
                        </Pressable>
                      ),
                    )}
                  </View>
                ) : null}

                {errors.topic ? (
                  <FieldError
                    message={
                      errors.topic
                    }
                  />
                ) : null}
              </View>

              <Field
                label="Subject"
                required
                value={values.subject}
                placeholder="Briefly describe your enquiry"
                error={errors.subject}
                onChangeText={(
                  value: string,
                ) =>
                  updateValue(
                    'subject',
                    value,
                  )
                }
              />

              <Field
                label="Your Message"
                required
                value={values.message}
                placeholder="Please provide as much detail as possible."
                multiline
                numberOfLines={8}
                maxLength={2000}
                error={errors.message}
                onChangeText={(
                  value: string,
                ) =>
                  updateValue(
                    'message',
                    value,
                  )
                }
              />

              <AppText
                variant="meta"
                style={styles.characterCount}
              >
                {values.message.length}/2000
              </AppText>

              <Pressable
                style={styles.consentRow}
                onPress={() =>
                  setPrivacyConsent(
                    previous =>
                      !previous,
                  )
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    privacyConsent &&
                      styles.checkboxActive,
                    errors.privacyConsent &&
                      styles.checkboxError,
                  ]}
                >
                  {privacyConsent ? (
                    <Check
                      size={15}
                      color={Colors.white}
                      strokeWidth={2.5}
                    />
                  ) : null}
                </View>

                <AppText
                  variant="body"
                  style={
                    styles.consentText
                  }
                >
                  I agree that Radio Africana may
                  use my information to respond to
                  this enquiry.
                </AppText>
              </Pressable>

              {errors.privacyConsent ? (
                <FieldError
                  message={
                    errors.privacyConsent
                  }
                />
              ) : null}

              <Pressable
                style={[
                  styles.submitButton,
                  submitting &&
                    styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.white}
                  />
                ) : (
                  <AppText
                    variant="body"
                    style={styles.submitText}
                  >
                    Send Message
                  </AppText>
                )}
              </Pressable>
            </View>

            <View
              style={styles.aboutSection}
            >
              <AppText
                variant="body"
                style={styles.aboutTitle}
              >
                Radio Africana
              </AppText>

              <AppText
                variant="body"
                style={styles.aboutText}
              >
                Radio Africana is a Digital Audio
                Broadcasting (DAB) Radio Station
                located in Manchester. We are also
                an online radio station, playing the
                best in Afrobeats from around the
                world.
              </AppText>

              <Pressable
                onPress={() =>
                  openLink(
                    WEBSITE_URL,
                  )
                }
              >
                <AppText
                  variant="body"
                  style={styles.websiteLink}
                >
                  Visit radioafricana.com
                </AppText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function Field({
  label,
  required,
  optional,
  value,
  placeholder,
  error,
  onChangeText,
  keyboardType,
  autoComplete,
  autoCapitalize,
  multiline,
  numberOfLines,
  maxLength,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  placeholder: string;
  error?: string;
  onChangeText: (
    value: string,
  ) => void;
  keyboardType?: React.ComponentProps<
    typeof TextInput
  >['keyboardType'];
  autoComplete?: React.ComponentProps<
    typeof TextInput
  >['autoComplete'];
  autoCapitalize?: React.ComponentProps<
    typeof TextInput
  >['autoCapitalize'];
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
}) {
  return (
    <View style={styles.field}>
      <FieldLabel
        label={label}
        required={required}
        optional={optional}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          Colors.textSecondary
        }
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        autoCapitalize={
          autoCapitalize
        }
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        style={[
          styles.input,
          multiline &&
            styles.messageInput,
          error &&
            styles.inputError,
        ]}
        textAlignVertical={
          multiline
            ? 'top'
            : 'center'
        }
      />

      {error ? (
        <FieldError
          message={error}
        />
      ) : null}
    </View>
  );
}

function FieldLabel({
  label,
  required,
  optional,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <View style={styles.labelRow}>
      <AppText
        variant="body"
        style={styles.label}
      >
        {label}
        {required ? ' *' : ''}
      </AppText>

      {optional ? (
        <AppText
          variant="meta"
          style={styles.optional}
        >
          Optional
        </AppText>
      ) : null}
    </View>
  );
}

function FieldError({
  message,
}: {
  message: string;
}) {
  return (
    <AppText
      variant="meta"
      style={styles.errorText}
    >
      {message}
    </AppText>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    paddingBottom: 56,
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
    justifyContent: 'center',
    zIndex: 3,
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
    marginBottom: 12,
  },

  intro: {
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 27,
    marginBottom: 28,
  },

  contactCards: {
    gap: 10,
    marginBottom: 34,
  },

  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },

  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor:
      Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  contactInfo: {
    flex: 1,
  },

  contactLabel: {
    color: Colors.textSecondary,
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.1,
    marginBottom: 2,
  },

  contactValue: {
    color: Colors.text,
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    lineHeight: 22,
  },

  formSection: {
    marginBottom: 34,
  },

  sectionTitle: {
    color: Colors.text,
    fontFamily: 'Lora-Bold',
    fontSize: 27,
    lineHeight: 36,
    marginBottom: 22,
  },

  field: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  label: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },

  optional: {
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    lineHeight: 17,
  },

  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 14,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: Colors.text,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
  },

  messageInput: {
    minHeight: 180,
    paddingTop: 14,
  },

  inputError: {
    borderColor:
      Colors.gold,
  },

  errorText: {
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    lineHeight: 17,
    marginTop: 6,
  },

  select: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 14,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
  },

  selectText: {
    flex: 1,
    color: Colors.text,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
  },

  placeholder: {
    color: Colors.textSecondary,
    opacity: 0.7,
  },

  options: {
    marginTop: 6,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 14,
    overflow: 'hidden',
  },

  option: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomWidth:
      StyleSheet.hairlineWidth,
    borderBottomColor:
      Colors.divider,
  },

  optionText: {
    color: Colors.text,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
  },

  characterCount: {
    color: Colors.textSecondary,
    textAlign: 'right',
    marginTop: -12,
    marginBottom: 18,
  },

  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.divider,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },

  checkboxActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },

  checkboxError: {
    borderColor:
      Colors.gold,
  },

  consentText: {
    flex: 1,
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 20,
  },

  submitButton: {
    minHeight: 52,
    borderRadius: 26,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 22,
  },

  submitButtonDisabled: {
    opacity: 0.7,
  },

  submitText: {
    color: Colors.white,
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 21,
  },

  successCard: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 22,
  },

  successIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  successTitle: {
    color: Colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    lineHeight: 23,
    marginBottom: 5,
  },

  successText: {
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },

  aboutSection: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },

  aboutTitle: {
    color: Colors.text,
    fontFamily: 'Lora-Bold',
    fontSize: 22,
    lineHeight: 30,
    marginBottom: 10,
  },

  aboutText: {
    color: Colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 23,
    marginBottom: 12,
  },

  websiteLink: {
    color: Colors.gold,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 21,
  },
});