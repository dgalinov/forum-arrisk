// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.2.10/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.2.10/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCeLTgkv5n1Coh3M9arrO_ZpS8G_iXGxi4",
    authDomain: "arrisk-cf965.firebaseapp.com",
    databaseURL: "https://arrisk-cf965-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "arrisk-cf965",
    storageBucket: "arrisk-cf965.appspot.com",
    messagingSenderId: "107930008172",
    appId: "1:107930008172:web:cc5729dad02a7dbb10f649",
    measurementId: "G-VSXLHJ67GN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const authFirebase = firebase.auth();
// const googleAuth = new firebase.auth.GoogleAuthProvider();
// export { authFirebase };
export default firebase;