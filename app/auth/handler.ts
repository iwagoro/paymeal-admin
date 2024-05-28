import { toast } from "sonner";

// サインアップ時のエラーハンドリング
export const handleSignUpError = (error: any) => {
    console.log(error.code);
    console.log(error.message);
    switch (error.code) {
        case "auth/email-already-in-use":
            return "This email is already in use";
            break;
        case "auth/invalid-email":
            return "Invalid email address";
            break;
        case "auth/operation-not-allowed":
            return "Operation not allowed";
            break;
        case "auth/weak-password":
            return "Weak password";
            break;
        default:
            return "Unknown error occurred";
            break;
    }
};

// ログイン時のエラーハンドリング
export const handleLoginError = (error: any) => {
    switch (error.code) {
        case "auth/invalid-email":
            return "Invalid email address";
            break;
        case "auth/user-disabled":
            return "User disabled";
            break;
        case "auth/user-not-found":
            return "User not found";
            break;
        case "auth/wrong-password":
            return "Wrong password";
            break;
        default:
            return "Unknown error occurred";
            break;
    }
};
