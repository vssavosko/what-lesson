import * as firebase from 'firebase/app';
import 'firebase/messaging';

export const getUserToken = async (): Promise<string> => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();

    return token;
  } catch (error) {
    throw new Error(error);
  }
};
