const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  // vertify auth token
  const googleUser = await verifyAuthtoken;
  // check if users exists
  const user = await checkIfUserExists(googleUser.email);
  // if user exits return them otherwise, creeate a new user in db
  return user ? user : createNewUser(user);
};

const verifyAuthtoken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (err) {
    console.error('Error verifying of token', err);
  }
};

const checkIfUserExists = async email => await User.findOne({ email }).exec;

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  return new User({ name, email, picture }).save();
};
