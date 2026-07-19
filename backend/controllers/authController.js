const db = require("../database/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "ajaja_document_editor_secret";

// Register
const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  db.get(
    "SELECT * FROM users WHERE email = ? OR username = ?",
    [email, username],
    async (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (user) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
          "INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json(err);
            }

            res.status(201).json({
              success: true,
              message: "Registration successful",
            });
          }
        );
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  );
};

// Login
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      try {
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return res.status(401).json({
            success: false,
            message: "Invalid password",
          });
        }

        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  );
};

// Get all users
const getUsers = (req, res) => {
  db.all(
    "SELECT id, username, email FROM users",
    [],
    (err, users) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(users);
    }
  );
};

module.exports = {
  register,
  login,
  getUsers,
};