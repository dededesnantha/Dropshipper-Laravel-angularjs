importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

firebase.initializeApp({
    // apiKey: 'AIzaSyCB9cRSSuM4DLc2SnhPTF1hIOgxbl81dQg',
    // projectId: 'dropshipper-e3d5a',
    // messagingSenderId: '381606643400',
    // appId: '1:381606643400:web:2bcdfa9f756b87467447fd',
    apiKey: "AIzaSyCKt8GgqNFhSsGY9tMd4mTbmPz22lJYBNQ",
    authDomain: "dropshipper2-e290c.firebaseapp.com",
    projectId: "dropshipper2-e290c",
    storageBucket: "dropshipper2-e290c.appspot.com",
    messagingSenderId: "3242400779",
    appId: "1:3242400779:web:acd9b1434bad4c0ff67b0e"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();