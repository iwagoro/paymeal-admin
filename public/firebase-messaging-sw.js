// Use importScripts to load Firebase SDKs
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAizt7M5CyQqfJlyWTIKN2WFiZ5G5UqN3o",
    authDomain: "paymeal-424607.firebaseapp.com",
    projectId: "paymeal-424607",
    storageBucket: "paymeal-424607.appspot.com",
    messagingSenderId: "466058708922",
    appId: "1:466058708922:web:f45687c7bc258b7f24ff83",
    measurementId: "G-BD6614G7Q4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "./logo.png",
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
