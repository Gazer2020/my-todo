import app from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// The app is automatically initialized by the native SDK when running on Android/iOS.
// Note: offline persistence is enabled by default in the native Firebase SDK.
const db = firestore();

export { app, db };

