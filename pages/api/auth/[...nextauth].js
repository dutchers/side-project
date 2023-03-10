import NextAuth from "next-auth";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import GoogleProvider from "next-auth/providers/google";
import { Sequelize, DataTypes } from "sequelize";
import db from "../../../db/models/index.js";

const { DB_NAME, DB_USER, DB_PASS, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
  process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "postgres",
});

export default NextAuth({
  events: {
    async signIn({ user, account, profile, isNewUser }) {},
    async createUser(user) {},
    async linkAccount(...args) {},
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return `/users/${user.id}`;
    // },
    async session({ session, token, user }) {
      session.user.role = user.role;
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define("user", {
        ...models.User,
        role: {
          type: DataTypes.STRING,
          defaultValue: "user",
        },
      }),
    },
  }),
});
