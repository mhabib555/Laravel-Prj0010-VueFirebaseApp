import firebase from "firebase/app";

// Import needed firebase modules
import "firebase/auth";

const config = {
  apiKey: process.env.MIX_FIREBASE_APP_API_KEY,
  authDomain: process.env.MIX_FIREBASE_APP_AUTH_DOMAIN,
  databaseURL: process.env.MIX_FIREBASE_APP_DATABASE_URL,
  projectId: process.env.MIX_FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.MIX_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.MIX_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.MIX_FIREBASE_APP_APP_ID
};

firebase.initializeApp(config);

window.firebase = firebase;
window.fbDb = firebase.firestore();

// Vue.prototype.$store = Vuex;
firebase.auth().onAuthStateChanged(user => {
  this.$store.dispatch("fetchUser", user);
});
