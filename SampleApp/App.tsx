/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {Inquiry, Environment, PersonaInquiryView} from 'react-native-persona';

function App(): React.JSX.Element {
  const [text, onChangeText] = React.useState(null);
  const [inlineInquiry, setInlineInquiry] = React.useState<Inquiry | null>(null);

  if (inlineInquiry) {
    return (
      <SafeAreaView style={styles.container}>
        <PersonaInquiryView
          style={styles.inline}
          inquiry={inlineInquiry}
          onReady={() => {}}
          onComplete={(inquiryId, status) => {
            setInlineInquiry(null);
            Alert.alert(
              'Complete',
              `Inquiry ${inquiryId} completed with status "${status}."`,
            );
          }}
          onCanceled={inquiryId => {
            setInlineInquiry(null);
            Alert.alert('Canceled', `Inquiry ${inquiryId} was cancelled`);
          }}
          onError={error => {
            setInlineInquiry(null);
            Alert.alert('Error', error.message);
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scroll}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          autoCapitalize="none"
          placeholder={'Enter inquiry template id: itmpl_....'}
        />
        <Button
          title="Start Inquiry"
          onPress={() => {
            Inquiry.fromTemplate(text)
              .environment(Environment.SANDBOX)
              .onComplete((inquiryId, status, fields) =>
                Alert.alert(
                  'Complete',
                  `Inquiry ${inquiryId} completed with status "${status}."`,
                ),
              )
              .onCanceled((inquiryId, sessionToken) =>
                Alert.alert('Canceled', `Inquiry ${inquiryId} was cancelled`),
              )
              .onError(error => Alert.alert('Error', error.message))
              .build()
              .start();
          }}
        />
        <Button
          title="Launch in Inline Mode"
          onPress={() => {
            try {
              setInlineInquiry(
                Inquiry.fromTemplate(text)
                  .environment(Environment.SANDBOX)
                  .build(),
              );
            } catch (error) {
              Alert.alert('Error', (error as Error).message);
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inline: {
    flex: 1,
  },
});

export default App;
