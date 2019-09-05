import firebase from "firebase";
import  "firebase/auth";
import  "firebase/database";
import  "firebase/storage";

const config = {
  apiKey: "AIzaSyAztjdmOmYxf05oHsnaCI282f6qBIG_EtU",
  authDomain: "resume-and-magazine.firebaseapp.com",
  databaseURL: "https://resume-and-magazine.firebaseio.com",
  projectId: "resume-and-magazine",
  storageBucket: "resume-and-magazine.appspot.com",
  messagingSenderId: "347344670559",
  appId: "1:347344670559:web:50dcc8212721bf40"
};

firebase.initializeApp(config)

export default firebase;

// apiKey: "AIzaSyD1R8xn2xkr86vzKFyVIzPAMIWkMW6FdjE",
// authDomain: "midterm-ece60.firebaseapp.com",
// databaseURL: "https://midterm-ece60.firebaseio.com",
// projectId: "midterm-ece60",
// storageBucket: "midterm-ece60.appspot.com",
// messagingSenderId: "938587432034",
// appId: "1:938587432034:web:db35f949db32aa8e"