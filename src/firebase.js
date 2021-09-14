import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAHWPazsT_WjJLFNoPAo2x2vGxEzcrF9UY",
    authDomain: "whats-app-clone-78b58.firebaseapp.com",
    projectId: "whats-app-clone-78b58",
    storageBucket: "whats-app-clone-78b58.appspot.com",
    messagingSenderId: "407150532683",
    appId: "1:407150532683:web:55cba2c5bc158c9f22d5ce",
    measurementId: "G-F5C0LVRBY0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;