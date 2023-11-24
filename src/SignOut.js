import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function SignOut() {
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await auth.signOut();
      // The user is now signed out.
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setSigningOut(false);
    }
  }

  // Use an effect to check if the user is signed in (optional).
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in. You can redirect or show user-specific content here.
      } else {
        // User is signed out. You can show a sign-in form or a message.
      }
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts.
  }, []);

  return (
    <button onClick={handleSignOut} disabled={signingOut}>
      {signingOut ? 'Signing Out...' : 'Sign Out'}
    </button>
  );
}

export default SignOut;