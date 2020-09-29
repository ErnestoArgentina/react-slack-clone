import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"


  var firebaseConfig = {
    apiKey: "AIzaSyC0xxhAyal8KYYL5Fk_UJ-kWVsFQ7MQuQk",
    authDomain: "react-slack-clone-8264.firebaseapp.com",
    databaseURL: "https://react-slack-clone-8264.firebaseio.com",
    projectId: "react-slack-clone-8264",
    storageBucket: "react-slack-clone-8264.appspot.com",
    messagingSenderId: "252034045714",
    appId: "1:252034045714:web:ff6d208f70c2eaf9b345cb",
    measurementId: "G-7NXHQQB56E"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  export default firebase;