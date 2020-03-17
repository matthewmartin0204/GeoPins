const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const { findOrCreateUser } = require('./controllers/userController');

require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('db connected'))
  .catch(err => console.error('error occured', err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log('sup');
    let authToken = null;
    let currentUser = null;
    try {
      authtoken = req.headers.authorization;
      if (authToken) {
        // find user or create user in DB
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    console.log(currentUser);
    return { currentUser };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening in ${url}`);
});
