/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {Inquiry, Environment} from 'react-native-persona';

const App: () => Node = () => {
  const [text, onChangeText] = React.useState(null);

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
});

export default App;
