import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCcX2T4SJuViLmHKcPvePuLck07RVS_4-w",
  authDomain: "basicchatapprn.firebaseapp.com",
  projectId: "basicchatapprn",
  storageBucket: "basicchatapprn.appspot.com",
  messagingSenderId: "854501760979",
  appId: "1:854501760979:web:fde7db49809197c59f5926"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


