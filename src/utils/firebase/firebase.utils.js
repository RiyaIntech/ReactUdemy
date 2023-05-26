import { initializeApp } from "firebase/app";
import {
      getAuth,
      signInWithRedirect,
      signInWithPopup,
      GoogleAuthProvider,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
} from "firebase/auth";
import {
      getFirestore,
      doc,
      getDoc,
      getDocs,
      setDoc,
      collection,
      writeBatch,
      query,
} from "firebase/firestore";

const firebaseConfig = {
      apiKey: "AIzaSyDaKbBvsDUB6TqoJJ_8mDJ_lbSuPUaVv3o",
      authDomain: "riya-clothing-db.firebaseapp.com",
      projectId: "riya-clothing-db",
      storageBucket: "riya-clothing-db.appspot.com",
      messagingSenderId: "448539803426",
      appId: "1:448539803426:web:a1fbd78e1819c1b68b2f7b",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
      prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
      signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
      signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
      collectionKey,
      objectsToAdd,
      field
) => {
      const batch = writeBatch(db);
      const collectionRef = collection(db, collectionKey);

      objectsToAdd.forEach((object) => {
            const docRef = doc(collectionRef, object.title.toLowerCase());
            batch.set(docRef, object);
      });

      await batch.commit();
};
export const getCategoriesAndDocuments = async () => {
      const collectionRef = collection(db, "categories");
      const q = query(collectionRef);

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
};
export const createUseDocFromAuth = async (
      userAuth,
      additionalInformation = {}
) => {
      if (!userAuth) return;

      const userDocRef = doc(db, "users", userAuth.uid);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try {
                  await setDoc(userDocRef, {
                        displayName,
                        email,
                        createdAt,
                        ...additionalInformation,
                  });
            } catch (error) {
                  console.log("error creating the user", error.message);
            }
      }

      return userDocRef;
};
export const createUserDocumentFromAuth = async (
      userAuth,
      additionalInformation = {}
    ) => {
      if (!userAuth) return;
    
      const userDocRef = doc(db, 'users', userAuth.uid);
    
      const userSnapshot = await getDoc(userDocRef);
    
      if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    
        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
          });
        } catch (error) {
          console.log('error creating the user', error.message);
        }
      }
    
      return userSnapshot;
    };
    
export const createAuthUserWithEmailAndPassword = async (email, password) => {
      if (!email || !password) return;

      return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
      if (!email || !password) return;

      return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListner = (callback) => {
      onAuthStateChanged(auth, callback);
};
export const getCurrentUser = () => {
      return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(
                  auth,(userAuth)=> {
                        unsubscribe();
                        resolve(userAuth);
                  },reject
            );
      });
};
