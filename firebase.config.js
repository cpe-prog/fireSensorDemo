import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDf2iP8oudhjY2fVBXh5n5QiO6vYxvxdBo",
	authDomain: "firesensor-25af9.firebaseapp.com",
	databaseURL: "https://firesensor-25af9-default-rtdb.firebaseio.com",
	projectId: "firesensor-25af9",
	storageBucket: "firesensor-25af9.firebasestorage.app",
	messagingSenderId: "444138557302",
	appId: "1:444138557302:web:fd62c714b7b2eb55987457",
	measurementId: "G-873N8694J2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
