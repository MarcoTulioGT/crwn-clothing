import  { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider , createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9OdtpD6Hg_Fgd5316Fm8Xi5ApxkNaqTU",
    authDomain: "crwn-clothing-db-e9b0e.firebaseapp.com",
    projectId: "crwn-clothing-db-e9b0e",
    storageBucket: "crwn-clothing-db-e9b0e.appspot.com",
    messagingSenderId: "775343700891",
    appId: "1:775343700891:web:91a879e03529d1dbcaff3e"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const Googleprovider = new GoogleAuthProvider();

  Googleprovider.setCustomParameters({
    prompt: "select_account"
  })

export const auth = getAuth();
export const signInWithGooglePopup  = () => signInWithPopup(auth, Googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, Googleprovider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;
    console.log(userAuth.uid);
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
        return userDocRef;
    };
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);

}


export const asignInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);

}