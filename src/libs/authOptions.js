import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import connectdb from './connectdb';
import User from '@/models/user';
import bcrypt from 'bcrypt';

const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials, req) {
        const { email, password, grant_type } = credentials;
        await connectdb();

        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error('User not found!');
        }

        // OTP verification  > auto login
        if (grant_type === 'otp_verified') {
          return user;
        }

        // check google Registered
        if (!user.password) {
          throw new Error(
            'This email is already use Registered with Google. Plase sign in with Google. ',
          );
        }

        const isMetch = await bcrypt.compare(password, user.password);
        if (!isMetch) {
          throw new Error('Incorrect Password! Plase try again later.');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (!user.email) return false;

      // login with google
      if (account.provider === 'google') {
        await connectdb();
        const exists = await User.findOne({ email: user.email });
        if (!exists) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            isVerified: true,
          });
        }
        return true;
      }

      // login with email and pass
      if (account.provider === 'credentials') {
        return true;
      }
    },

    jwt: async ({ token, user }) => {
      await connectdb();
      const email = user?.email || token.email || token.user?.email;

      if (!email) return token;

      const userByEmail = await User.findOne({ email: email });
      if (userByEmail) {
        userByEmail.password = undefined;
        token.user = userByEmail;
      }

      return token;
    },

    session: async ({ session, token }) => {
       session.user = token.user;
      session.token = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

export default authOptions;
