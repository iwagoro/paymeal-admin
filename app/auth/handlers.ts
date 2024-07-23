import { auth } from "@/lib/firebase";
import modifier from "@/lib/modifier";
import { createUserWithEmailAndPassword, getIdToken, signInWithEmailAndPassword, signOut as LogOut, deleteUser } from "firebase/auth";

//! サインアップ時のエラーハンドリング
export const handleSignUpError = (error: any) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "This email is already in use";
        case "auth/invalid-email":
            return "Invalid email address";
        case "auth/operation-not-allowed":
            return "Operation not allowed";
        case "auth/weak-password":
            return "Weak password";
        default:
            return "Unknown error occurred";
    }
};

//! ログイン時のエラーハンドリング
export const handleLoginError = (error: any) => {
    switch (error.code) {
        case "auth/invalid-email":
            return "Invalid email address";
        case "auth/user-disabled":
            return "User disabled";
        case "auth/user-not-found":
            return "User not found";
        case "auth/wrong-password":
            return "Wrong password";
        default:
            return "Unknown error occurred";
    }
};

export const signIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
            return true;
        } else {
            throw new Error("User not found");
        }
    } catch (error: any) {
        throw new Error(handleLoginError(error));
    }
};

export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
            const token = await getIdToken(user);
            await modifier.post("/user", token);
            return true;
        } else {
            throw new Error("User not found");
        }
    } catch (error: any) {
        if (error.code) {
            throw new Error(handleSignUpError(error));
        } else {
            throw new Error("An unknown error occurred while creating user");
        }
    }
};

export const signOut = async () => {
    try {
        await LogOut(auth);
    } catch (error) {
        throw new Error("An error occurred while signing out: " + String(error));
    }
};

export type FormType = { email: string; password: string };
