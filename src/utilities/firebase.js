import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut} from 'firebase/auth';
import { useState, useEffect } from 'react';

const firebaseConfig = {

    apiKey: "AIzaSyDcgz7UVbg2hlP2aZ0InATMbTD3p8K_oBg",
  
    authDomain: "scheduler-3b6cc.firebaseapp.com",
  
    databaseURL: "https://scheduler-3b6cc-default-rtdb.firebaseio.com",
  
    projectId: "scheduler-3b6cc",
  
    storageBucket: "scheduler-3b6cc.appspot.com",
  
    messagingSenderId: "730865423056",
  
    appId: "1:730865423056:web:c7b9d3b2eb90435a34c4d5",
  
    measurementId: "G-WNW284HH95"
  
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if(devMode){ console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export {firebaseSignOut as signOut};

export const useUserState = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        onIdTokenChanged(getAuth(firebase), setUser);
    }, []);

    return [user];
};

//export const useUserState = () => useAuthState(firebase.auth());