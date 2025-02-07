import GoogleProvider from "next-auth/providers/google";
import { createUser, getUserByEmail } from '@/lib/dao/user';

export const authOptions = {
    secret: process.env.SECRET as string,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async session({ session }: any) {
            const sessionUser = await getUserByEmail(session.user.email);
            if (sessionUser) {
                session.user.id = sessionUser.id;
            } else {
                console.error('User not found in database:', session.user.email);
            }
            return session;
        },
        async signIn({ profile }: any) {
            console.log('Google profile:', profile)
            try {
                // Comprueba si el usuario ya existe en la base de datos
                const existingUser = await getUserByEmail(profile.email);

                // Si el usuario no existe, añádelo a la base de datos
                if (!existingUser) {
                    const user = await createUser(profile.email, profile.name, profile.image);
                    console.log("created user ", user)

                } else {
                    console.log("user already exists", existingUser)
                }

            } catch (error) {
                console.log(error)
                return false;
            }

            return true;
        }
    }
};