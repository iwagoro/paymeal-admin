import { toast } from "sonner";

// サインアップ時のエラーハンドリング
export const handleSignUpError = (error: any) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            toast("This email is already in use");
            break;
        case "auth/invalid-email":
            toast("Invalid email address");
            break;
        case "auth/operation-not-allowed":
            toast("Operation not allowed");
            break;
        case "auth/weak-password":
            toast("Weak password");
            break;
        default:
            toast("Unknown error occurred");
            break;
    }
};

// ログイン時のエラーハンドリング
export const handleLoginError = (error: any) => {
    switch (error.code) {
        case "auth/invalid-email":
            toast("Invalid email address");
            break;
        case "auth/user-disabled":
            toast("User disabled");
            break;
        case "auth/user-not-found":
            toast("User not found");
            break;
        case "auth/wrong-password":
            toast("Wrong password");
            break;
        default:
            toast("Unknown error occurred");
            break;
    }
};
