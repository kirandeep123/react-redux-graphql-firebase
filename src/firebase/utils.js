import {firebaseConfig} from './config';
import firebase from 'firebase/app';
import 'firebase/firestore'; // sotre i.e. database
import 'firebase/auth';      // for authentication

// connect to the database

firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const firestore= firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt:'select_account'}); 
export const signInwithGoogle = ()=>auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async(userAuth,additionalData)=>{
    if(!userAuth)return;
    const {uid}=userAuth;
    const userRef = firestore.doc(`users/${uid}`)
    const snapShot =await userRef.get();
    // create a new user if it doesnt exists in firebase collection
    if(!snapShot.exists){
        const {displayName,email}=userAuth;
        const timeStamp = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdDate:timeStamp,
                ...additionalData
            })
        }
        catch(err){
            console.log(err,"err")
        }
    }
    return userRef;
}

