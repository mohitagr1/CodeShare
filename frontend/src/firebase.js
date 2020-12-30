import Firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqVcbtbhIp5nfEeheN2gkViktU9AWxZ_o",
    authDomain: "codeshare-ebf29.firebaseapp.com",
    projectId: "codeshare-ebf29",
    storageBucket: "codeshare-ebf29.appspot.com",
    messagingSenderId: "797593750908",
    appId: "1:797593750908:web:0c819e740ba3f37922e8f9",
    measurementId: "G-Z8K3QHHFBP"
};
// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);
Firebase.analytics();
const db = app.database();

export default db;
