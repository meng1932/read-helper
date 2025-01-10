import { Image, StyleSheet, Platform, TextInput } from 'react-native';

import { HelloWave } from '@/components/common/HelloWave';
import ParallaxScrollView from '@/components/common/ParallaxScrollView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { MultiStepForm } from '@/components/multi-step-form/MultiStepForm';
import BookSelector from '@/components/common/BookSelector';
import { TABS } from '@/types';

export default function HomeScreen() {

  const steps = [
    <ThemedView style={styles.step}>
      <ThemedText>Select a book</ThemedText>
      <BookSelector tab={TABS.PHYSICAL_BOOK}/>
    </ThemedView>,
    <ThemedView style={styles.step}>
      <ThemedText>Payment Details</ThemedText>
      <TextInput placeholder="Card Number" style={styles.input} />
      <TextInput placeholder="Secret" style={styles.input} />
      <TextInput placeholder="Expiration Date" style={styles.input} />
    </ThemedView>,
  ];

  const handleCancel = () => {
    console.log('Form canceled');
  };

  const handleSubmit = () => {
    console.log('Form submitted');
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Libby</ThemedText>
        <HelloWave />
      </ThemedView>
      <MultiStepForm steps={steps} onCancel={handleCancel} onSubmit={handleSubmit} />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  step: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
  },
});
