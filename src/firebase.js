import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore'

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

firebase.initializeApp(firebaseConfig);
export default firebase;