import React, { useState } from 'react';
import { signInWithGoogle } from './authservice';

const AuthForm: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
      setError(null);
    } catch (err: any) {
      console.error('Error during authentication:', err);
      setError('Authentication failed: ' + err.message); 
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        Switch to {isRegistering ? 'Login' : 'Register'}
      </button>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          {isRegistering ? 'Register with Google' : 'Login with Google'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthForm;
