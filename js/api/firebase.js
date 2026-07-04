const firebaseConfig = {
    apiKey: "AIzaSyBUqvuc46JNTXpw2O1NT13SCEnMayyh_tg",
    authDomain: "burgao-do-digao-experience.firebaseapp.com",
    projectId: "burgao-do-digao-experience",
    storageBucket: "burgao-do-digao-experience.firebasestorage.app",
    messagingSenderId: "100487147615",
    appId: "1:100487147615:web:f6a1ec5b0c934ee75a6bea"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log("🔥 Firebase conectado.");