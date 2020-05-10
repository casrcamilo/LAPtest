  import firebase from 'firebase';
  
  // Web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyCELm442sNO3yiTlaoIdarsyG36OPC68eo",
    authDomain: "laptest-75798.firebaseapp.com",
    databaseURL: "https://laptest-75798.firebaseio.com",
    projectId: "laptest-75798",
    storageBucket: "laptest-75798.appspot.com",
    messagingSenderId: "1069532958708",
    appId: "1:1069532958708:web:ea76797d848bb4808c73a1",
    measurementId: "G-CZJBG7K7XR"
  };

  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase;