/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Inquiry} from 'react-native-persona';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, onChangeText] = React.useState(null);

  const handleBeginInquiry = () => {
    if (text == null) {
      return;
    }
    Inquiry.fromTemplate(text)
      .onComplete((inquiryId, status, fields) => {})
      .onCanceled((inquiryId, session) => {})
      .onError(debugMessage => {})
      .build()
      .start();
  };

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleBeginInquiry} style={styles.button}>
            <Text style={styles.buttonText}>Create Inquiry</Text>
          </TouchableOpacity>
        </View>
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#631FFF',
  },
});

export default App;
