import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, loginWithEmail, registerWithEmail, logoutUser, resetPassword } from '../firebase/auth';
import { getDocument, setDocument } from '../firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthChange(async (firebaseUser) => {

    console.log("FIREBASE USER:", firebaseUser);

    setUser(firebaseUser);

    if (firebaseUser) {

      try {
        const profile = await getDocument(
          'users',
          firebaseUser.uid
        );

        console.log("FIRESTORE PROFILE:", profile);

        setUserProfile(profile);

      } catch(error) {

        console.log("PROFILE ERROR:", error);
        setUserProfile(null);
      }

    } else {
      setUserProfile(null);
    }

    setLoading(false);
  });

  return unsubscribe;
}, []);

  const login = async (email, password) => {
  const firebaseUser = await loginWithEmail(email, password);

  const profile = await getDocument(
    'users',
    firebaseUser.uid
  );

  setUserProfile(profile);

  return {
    ...firebaseUser,
    profile
  };
};

  const register = async (email, password, displayName, phone = '') => {
    const firebaseUser = await registerWithEmail(email, password, displayName);

    // Create user document in Firestore
    await setDocument('users', firebaseUser.uid, {
      uid: firebaseUser.uid,
      name: displayName,
      email: firebaseUser.email,
      phone,
      role: 'user',
    });

    // Fetch the new profile
    const profile = await getDocument('users', firebaseUser.uid);
    setUserProfile(profile);

    return firebaseUser;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setUserProfile(null);
  };

  const sendResetEmail = async (email) => {
    await resetPassword(email);
  };

  const isAdmin = userProfile?.role === 'admin';

console.log("USER PROFILE:", userProfile);
console.log("IS ADMIN:", isAdmin);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAdmin,
        login,
        register,
        logout,
        sendResetEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
