import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error logging out:", error);
    throw new Error(error.message);
  }
};

//code to allow only one gmail to change the db

// import { auth } from "./firebase";
// import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// // Define the allowed email
// const ALLOWED_EMAIL = "gdgiitmandi@gmail.com";

// export const signInWithGoogle = async () => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     // Check if the email matches the allowed one
//     if (user.email === ALLOWED_EMAIL) {
//       console.log("Login successful");
//       return user;
//     } else {
//       // If the email doesn't match, sign out and throw an error
//       await signOut(auth);
//       console.error("Access denied: Only the specified email can log in.");
//       throw new Error("Access denied: Only the specified email can log in.");
//     }
//   } catch (error: any) {
//     console.error("Error signing in with Google:", error);
//     throw new Error(error.message);
//   }
// };

// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (error: any) {
//     console.error("Error logging out:", error);
//     throw new Error(error.message);
//   }
// };
