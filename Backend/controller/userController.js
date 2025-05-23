//db connection
const dbconnection = require("../db/config");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes"); // Importing the HTTP status codes
const jwt = require("jsonwebtoken");

// Registering a new user
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }
  try {
    // Query to check if the username or email already exists in the database
    const [existingUser] = await dbconnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    // If an existing user is found, send a 400 status with an error message
    if (existingUser.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }
    // Check if the password length is less than 8 characters
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters long" });
    }

    //Encrypt the password
    saltRounds = 10; // Higher values increase the security but take more time to compute
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Proceed to insert the new user if no existing record is found
    // Assuming dbconnection is a valid connection instance
    await dbconnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    // Successfully created the user
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "You have Registerd successfully" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating user:", error.message);

    // Send a more generic error message to the client
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

// Login
async function login(req, res) {
  const { email, password } = req.body;
  // Validate the email and password fields
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: " please enter all required fields" });
  }
  try {
    // Check if the user exists by email
    const [user] = await dbconnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    // If user is not found
    if (user.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect email or password. Please try again." });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect email or password. Please try again." });
    }
    // If login is successful, return a success message (or a JWT token for authentication)
    // Create and send a JWT
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRETKEY, {
      expiresIn: "1d",
    });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Login successful!", token, username });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

//  Check user validity
async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(StatusCodes.OK).json({ msg: "Valid user", username, userid });
}

module.exports = { register, login, checkUser };
