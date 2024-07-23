import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as Auth } from "@/lib/firebase";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions = {
    pages: {
        signIn: "/auth",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials): Promise<any> {
                return await signInWithEmailAndPassword(Auth, (credentials as any).email || "", (credentials as any).password || "")
                    .then(async (userCredential) => {
                        if (userCredential.user) {
                            const idToken = await userCredential.user.getIdToken();
                            return {
                                id: userCredential.user.uid,
                                name: userCredential.user.displayName,
                                email: userCredential.user.email,
                                idToken,
                            };
                        }
                        return null;
                    })
                    .catch((error) => {
                        console.error("Authentication error: ", error);
                        return null;
                    });
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: any }) {
            if (user) {
                token.idToken = user.idToken;
            }
            // Check if token is expired and refresh if needed
            if (typeof token.idToken === "string") {
                const currentTime = Math.floor(Date.now() / 1000);
                const tokenExpirationTime = JSON.parse(atob(token.idToken.split(".")[1])).exp;
                if (tokenExpirationTime < currentTime) {
                    const refreshedToken = await Auth.currentUser?.getIdToken(true);
                    token.idToken = refreshedToken;
                }
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.idToken = token.idToken as string;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};

declare module "next-auth" {
    interface Session {
        idToken: string;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
