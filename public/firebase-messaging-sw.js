// Use importScripts to load Firebase SDKs
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTgDHrUjbbOXf4VBpPjZ8GXs2gjgT3eN0",
    authDomain: "paymeal-fd828.firebaseapp.com",
    projectId: "paymeal-fd828",
    storageBucket: "paymeal-fd828.appspot.com",
    messagingSenderId: "423569473289",
    appId: "1:423569473289:web:9a4c22138c932db19bddd8",
    measurementId: "G-BY897T14QB",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ");
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
