import { initializeApp } from "firebase/app";
import { 
    getFirestore
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAcfndydr74xxPDGeXslXXX7grmfVS5Jfg",
    authDomain: "govarpwdk.firebaseapp.com",
    projectId: "govarpwdk",
    storageBucket: "govarpwdk.appspot.com",
    messagingSenderId: "188861592648",
    appId: "1:188861592648:web:83343d249bf7798e60d47d"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)