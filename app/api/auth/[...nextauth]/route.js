import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";


//every next js route is a serverless route
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //for storing in session 
    async session({ session, token }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    //sign user
    async signIn({ profile }) {
      // this is a lambda function
            try {
        await connectToDB();

        //check if the user is already exists
        // const userExist = await User.findOne({ email: profile.email });
        const userExist = await User.findOne({email: profile.email})
        //if not connect a new user and store it in the database
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "_").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
