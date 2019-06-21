import { environment as defaultEnvironment } from './environment'

export const environment = {
  ...defaultEnvironment,
  production: true,
  firebase: {
    apiKey: 'AIzaSyBLpPcDdHOS4DJK-xRq_RNpTocTE5Xa30c',
    authDomain: 'sicredi-dragons.firebaseapp.com',
    databaseURL: 'https://sicredi-dragons.firebaseio.com',
    projectId: 'sicredi-dragons',
    storageBucket: 'sicredi-dragons.appspot.com',
    messagingSenderId: '1033616918012'
  },
};
