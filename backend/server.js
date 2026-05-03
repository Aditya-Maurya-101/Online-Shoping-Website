const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:3000,https://online-shoping-website-mye4.vercel.app,https://online-shoping-website-car6.vercel.app,https://online-shoping-website-mye4-6txrk18to.vercel.app")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const localhostOriginRegex = /^https?:\/\/localhost(:\d+)?$/i;
const vercelOriginRegex = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    if (
      allowedOrigins.includes(origin) ||
      localhostOriginRegex.test(origin) ||
      vercelOriginRegex.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy: Origin ${origin} is not allowed.`));
  },
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// Passport setup
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value
            });
            await user.save();
          }
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  ));
} else {
  console.warn("Google OAuth disabled: GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET not set.");
}

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use(passport.initialize());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));

app.get("/", (req, res) => {
  res.json({ message: "Online Shopping backend is running" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://adityamaurya3366_db_user:Adi1234@cluster0.dn2n3qb.mongodb.net/ECommerce-web?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    if (MONGO_URI.includes("mongodb+srv://")) {
      console.error(
        "If you are using MongoDB Atlas, make sure your current IP address is added to Atlas Network Access."
      );
    }
    process.exit(1);
  });

