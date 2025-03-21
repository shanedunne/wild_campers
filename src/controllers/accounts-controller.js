import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";

export const accountsController = {

  // render home page
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Wild Campers" });
    },
  },

  // render sign up form page
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Wild Campers" });
    },
  },

  // create new user
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const firstName = request.payload.firstName;
      const lastName = request.payload.lastName;
      const email = request.payload.email;
      const password = request.payload.password;
      await db.userStore.addUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: "USER"
      });
      return h.redirect("/");
    },
  },

  // render login form page
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Wild Campers" });
    },
  },

  // log user in
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  // log user out
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();

      return h.redirect("/");
    },
  },

  // valudate user session
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },

  // get user account info
  getAccountInfo: {
    handler: async function (request, h) {
      const user = request.auth.credentials;

      const viewData = {
        title: "Account Information",
        user: user,
      }
      return h.view("account-view", viewData);
      
    }
  }
};

