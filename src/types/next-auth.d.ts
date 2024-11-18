import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User{
        _id?: string;
        isVerified?: boolean;
        isAcceptingmessage?: boolean;
        username?: string
        restrictedKeywords?: string[]
    }
    interface Session{
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingmessage?: boolean;
            username?: string
            restrictedKeywords?: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAcceptingmessage?: boolean;
        username?: string
        restrictedKeywords?: string
    }
}