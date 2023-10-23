const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const https = require('https');
var fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mapboxgl = require('mapbox-gl');
const mapboxSdk = require('@mapbox/mapbox-sdk/services/geocoding');
const { S3, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const mongoose = require('mongoose');

const Person = require('../models/person');
const User = require('../models/user');
const Listing = require('../models/listing');
const Geo = require('../models/geo');
const Transaction = require('../models/transaction');
const Business = require('../models/business');

require('dotenv').config();

const JWT_SECRET = 'secret';

const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URI = process.env.MONGO_URI;

const stripe = require('stripe')('sk_test_EFrmRFPILaUB8FnvtPg4dqbN');

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

const s3 = new S3({
  region: 'us-east-1',
  signatureVersion: 'v4',
  credentials: {
    accessKeyId: process.env.DO_ACCESS_ID,
    secretAccessKey: process.env.DO_SECRET_KEY,
  },
  forcePathStyle: false,
  endpoint: 'https://nyc3.digitaloceanspaces.com',
});

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

function sortFunction(a, b) {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA < dateB ? 1 : -1;
}

// type File {
//   ETag: String
//   Location: String
//   Key: String
//   Bucket: String
// }

//TODO: Move all of this out into schema dir

//TODO: get File lastModifiedDate when Date type
const typeDefs = gql`
  scalar Upload

  type File {
    name: String
    type: String
    size: Float
    path: String
    imageId: String
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Address {
    street: String!
    city: String!
  }

  enum YesNo {
    YES
    NO
  }

  type Business {
    business_name: String!
    email: String!
    cover_photo: String
    owner_id: User
    profile: String
    status: String
    address: String
    state: String
    city: String
    zipcode: String
    members: [User]
    stripe_id: String
    listings: [Listing]
    transactions: [Transaction]
    createdAt: String
    updatedAt: String
    id: ID!
  }

  type User {
    username: String!
    password: String!
    email: String!
    avatar: String
    firstname: String
    lastname: String
    about: String
    status: String
    user_type: String
    stripe_id: String
    business: [Business]
    friends: [Person!]!
    listings: [Listing!]!
    favorites: [Listing!]!
    transactions: [Transaction]
    createdAt: String
    updatedAt: String
    id: ID!
  }

  scalar Coordinates

  type PointGeometry {
    type: String
    coordinates: Coordinates
  }

  type Listing {
    ownerId: [User!]!
    name: String!
    description: String
    address: String
    city: String
    state: String
    instructor: String
    maxCount: String
    minCount: String
    equipment: String
    requirements: String
    restrictions: String
    duration: String
    courseType: String
    skillLevel: String
    rating: String
    price: String
    type: String
    date: String
    time: String
    listingPhoto: String
    lng: Float
    lat: Float
    location: PointGeometry
    score: Float
    createdAt: String
    updatedAt: String
    id: ID
    _id: ID
  }

  type Geo {
    city: String
    state_name: String
    state_id: String
    zips: String
    timezone: String
    lat: String
    lng: String
  }

  type Token {
    value: String!
  }

  type Transaction {
    clientSecret: String
    payment_intent: String
    name: String
    email: String
    payee_id: [User]
    receiver_id: String
    listing_id: String
    amount: String
    items: [Listing]
    price: String
    site_fees: String
    tickets: Int
    date: String
    refund: String
    coupon: String
    discount_amt: Float
    createdAt: String
    updatedAt: String
    status: String
    id: ID
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    allListings: [Listing!]!
    allListingsByUser: [Listing]
    getListingsByLngLat(
      swLat: Float
      swLng: Float
      neLat: Float
      neLng: Float
      filterType: [String]
    ): [Listing]
    findUser(id: ID!): User
    findListingById(id: String!): Listing
    findByLocation(city: String!): [Listing]
    findByType(type: String!): [Listing]
    searchListings(
      swLat: Float
      swLng: Float
      neLat: Float
      neLng: Float
      filterType: [String]
    ): [Listing]
    me: User
    allGeo: [Geo!]!
    getLocation(search: String, limit: Int): [Geo]
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    addFavorite(listingId: String): User
    addListing(
      name: String
      description: String
      address: String
      city: String
      state: String
      instructor: String
      maxCount: String
      minCount: String
      equipment: String
      requirements: String
      restrictions: String
      duration: String
      courseType: String
      skillLevel: String
      rating: String
      price: String
      type: String
      date: String
      time: String
      listingPhoto: String
    ): Listing
    editListing(
      id: String
      name: String
      description: String
      address: String
      city: String
      state: String
      instructor: String
      maxCount: String
      minCount: String
      equipment: String
      requirements: String
      restrictions: String
      duration: String
      courseType: String
      skillLevel: String
      rating: String
      price: String
      type: String
      date: String
      time: String
      listingPhoto: String
    ): Listing
    editNumber(name: String!, phone: String!): Person
    editUser(about: String, avatar: String): User
    createBusiness(
      business_name: String!
      email: String!
      cover_photo: String
    ): Business
    createUser(password: String!, email: String!): User
    createTransaction(
      name: String
      email: String
      receiver_id: String
      listing_id: String
      items: [String]
      clientSecret: String
      payment_intent: String
      amount: String
    ): Transaction
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
    uploadFile(name: String, type: String, size: Float, path: String): File
  }
`;

const resolvers = {
  Coordinates: new GraphQLScalarType({
    name: 'Coordinates',
    description: 'A set of coordinates. x, y',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      return ast.value;
    },
  }),
  PointGeometry: {
    type() {
      return 'Point';
    },
    coordinates(item) {
      return [item.lng, item.lat];
    },
  },
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      try {
        if (!args.phone) {
          return Person.find({});
        }
      } catch (error) {
        error;
      }

      return Person.find({ phone: { $exists: args.phone === 'YES' } });
    },
    allListings: async (root, args, context) => {
      return Listing.find({}).limit(14);
    },
    allListingsByUser: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      console.log(currentUser._id);
      const listings = await Listing.find({
        ownerId: currentUser._id,
      });

      const newListingsArray = [...listings];

      return newListingsArray.sort(sortFunction);
    },
    getListingsByLngLat: async (root, args) => {
      try {
        let listings;

        if (args.filterType.length >= 1) {
          listings = await Listing.find({ type: args.filterType });
        } else {
          listings = await Listing.find({});
        }

        if (!listings) {
          const error = new Error('Could not find product!');
          error.statusCode = 404;
          throw error;
        }
        var listingsInBounds = [];

        function withinBounds(lat, lng) {
          return (
            lat > args.swLat &&
            lat < args.neLat &&
            lng > args.swLng &&
            lng < args.neLng
          );
        }

        listings.map((l) => {
          if (withinBounds(l.lat, l.lng)) {
            return listingsInBounds.push(l);
          }
        });

        return listingsInBounds;
      } catch (err) {
        throw err;
      }
    },
    findUser: async (root, args) =>
      User.findOne({ _id: args.id }).populate('listings'),
    findListingById: async (root, args, context) => {
      return Listing.findOne({ _id: args.id });
    },
    findByLocation: async (root, args) => {
      try {
        if (!args.city) {
          return Listing.find({});
        }
      } catch (error) {
        error;
      }

      return Listing.find({ city: { $regex: args.city, $options: 'i' } });
    },
    findByType: async (root, args) => {
      try {
        if (!args.type) {
          return Listing.find({});
        }
      } catch (error) {
        error;
      }

      return Listing.find({ type: { $regex: args.type, $options: 'i' } });
    },
    me: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      if (currentUser.favorites && currentUser.listings) {
        let listings;
        let newListingsArray;

        if (currentUser.listings) {
          listings = await Listing.find({
            ownerId: currentUser.id,
          });

          newListingsArray = [...listings];

          newListingsArray.sort(sortFunction);
        }

        const theListings = await Listing.find({});

        const listingIds = theListings.map((listing) => listing._id.toString());

        const favoritesIds = currentUser.favorites.map((favorite) =>
          favorite.toString()
        );

        const favorites = favoritesIds.filter((favorite) =>
          listingIds.includes(favorite)
        );

        const favoriteListing = await Listing.find(
          {
            _id: favorites,
          },
          { _id: 1, name: 1 }
        );

        return {
          username: currentUser.username,
          avatar: currentUser.avatar,
          listings: newListingsArray,
          favorites: favoriteListing,
          about: currentUser.about,
        };
      }

      return {
        username: currentUser.username,
        avatar: currentUser.avatar,
        about: currentUser.about,
        listings: currentUser.listings,
      };
    },
    searchListings: async (root, args) => {
      let listings;

      if (args.filterType.length >= 1) {
        listings = await Listing.aggregate([
          {
            $search: {
              index: 'default',
              compound: {
                must: [
                  {
                    geoWithin: {
                      geometry: {
                        type: 'Polygon',
                        coordinates: [
                          [
                            [args.neLng, args.neLat],
                            [args.swLng, args.neLat],
                            [args.swLng, args.swLat],
                            [args.neLng, args.swLat],
                            [args.neLng, args.neLat],
                          ],
                        ],
                      },
                      path: 'location',
                    },
                  },
                ],
                filter: [
                  {
                    text: {
                      query: [...args.filterType],
                      path: 'type',
                    },
                  },
                ],
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              description: 1,
              rating: 1,
              date: 1,
              city: 1,
              state: 1,
              address: 1,
              price: 1,
              type: 1,
              lng: 1,
              lat: 1,
              listingPhoto: 1,
              score: { $meta: 'searchScore' },
            },
          },
          {
            $limit: 20,
          },
        ]);
      } else {
        try {
          listings = await Listing.aggregate([
            {
              $search: {
                index: 'default',
                compound: {
                  must: [
                    {
                      geoWithin: {
                        geometry: {
                          type: 'Polygon',
                          coordinates: [
                            [
                              [args.neLng, args.neLat],
                              [args.swLng, args.neLat],
                              [args.swLng, args.swLat],
                              [args.neLng, args.swLat],
                              [args.neLng, args.neLat],
                            ],
                          ],
                        },
                        path: 'location',
                      },
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
                name: 1,
                description: 1,
                rating: 1,
                date: 1,
                city: 1,
                state: 1,
                address: 1,
                price: 1,
                type: 1,
                lng: 1,
                lat: 1,
                listingPhoto: 1,
                score: { $meta: 'searchScore' },
              },
            },
            {
              $limit: 20,
            },
          ]);
        } catch (error) {
          error;
        }
      }

      if (!listings) {
        const error = new Error('Could not find listing.');
        error.statusCode = 400;
        throw error;
      }

      return listings;
    },
    allGeo: async (root, args) => {
      return Geo.find({});
    },
    getLocation: async (root, args) => {
      if (args.search) {
        const searchQuery = { city: { $regex: args.search, $options: 'i' } };
        return Geo.find(searchQuery).limit(5);
      }
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return person;
    },
    addFavorite: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const listing = await Listing.findOne({ _id: args.listingId });

      const found = currentUser.favorites.some(function (item, index) {
        return item == listing.id;
      });

      try {
        if (!currentUser.favorites) {
          currentUser['favorites'] = listing;

          await currentUser.save();
        }

        if (!found) {
          currentUser.favorites = currentUser.favorites.concat(listing);

          await currentUser.save();
        } else {
          currentUser.favorites.splice(
            currentUser.favorites.indexOf(listing),
            1
          );

          await currentUser.save();
        }
      } catch (error) {
        throw error;
      }

      return currentUser;
    },
    addListing: async (root, args, context) => {
      const listing = new Listing({ ...args });
      const currentUser = context.currentUser;
      let lat;
      let lng;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

      async function getLngLat() {
        const lngLat = await mapboxClient
          .forwardGeocode({
            query: listing.address,
            autocomplete: false,
            limit: 1,
          })
          .send()
          .then(function (response) {
            if (
              response &&
              response.body &&
              response.body.features &&
              response.body.features.length
            ) {
              return response.body.features[0].center;
            }
          });
        lng = lngLat[0];
        lat = lngLat[1];
      }

      try {
        listing.ownerId = currentUser.id;
        await getLngLat();
        listing.lat = lat;
        listing.lng = lng;

        listing.location = {
          type: 'Point',
          coordinates: [lng, lat],
        };
        await listing.save();
        currentUser.listings = currentUser.listings.concat(listing);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return listing;
    },
    editListing: async (root, args) => {
      const listing = await Listing.findOne({ _id: args.id });
      listing.name = args.name;
      listing.description = args.description;
      listing.address = args.address;
      listing.city = args.city;
      listing.state = args.state;
      listing.instructor = args.instructor;
      listing.maxCount = args.maxCount;
      listing.minCount = args.minCount;
      listing.equipment = args.equipment;
      listing.requirements = args.requirements;
      listing.restrictions = args.restrictions;
      listing.duration = args.duration;
      listing.courseType = args.courseType;
      listing.skillLevel = args.skillLevel;
      listing.rating = args.rating;
      listing.price = args.price;
      listing.type = args.type;
      listing.date = args.date;
      listing.time = args.time;
      listing.listingPhoto = args.listingPhoto;
      try {
        await listing.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return listing;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;

      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return person;
    },
    editUser: async (root, args, context) => {
      const currentUser = context.currentUser;
      const user = await User.findOne({ email: currentUser.email });

      args.avatar && (user.avatar = args.avatar);
      args.about && (user.about = args.about);
      args.email && (user.email = args.email);

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return user;
    },
    createBusiness: async (root, args, context) => {
      const business = new Business({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        await business.save();

        currentUser.business = currentUser.business.concat(business);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return business;
    },
    createTransaction: async (root, args, context) => {
      const currentUser = context.currentUser;
      let transaction;
      let paymentIntent;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      if (currentUser.stripe_id) {
        customer = await stripe.customers.retrieve(currentUser.stripe_id);
      } else {
        customer = await stripe.customers.create({
          name: args.name,
          email: args.email,
        });
      }

      const calculateOrderAmount = (items) => {
        if (items) {
          return items.length * 1400;
        } else {
          return 1000;
        }
      };

      if (!args.payment_intent) {
        transaction = new Transaction({
          name: args.name,
          email: args.email,
          payee_id: currentUser.id,
          receiver_id: args.receiver_id,
          listing_id: args.listing_id,
          amount: calculateOrderAmount(args.items),
        });

        paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(args.items),
          currency: 'usd',
          customer: customer.id,
        });

        console.log('newn', paymentIntent.id);

        transaction.payment_intent = paymentIntent.id;

        try {
          await transaction.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      } else {
        paymentIntent = await stripe.paymentIntents.update(
          args.payment_intent,
          { amount: calculateOrderAmount(args.items) }
        );
        console.log('old', paymentIntent.id);
      }

      const user = await User.findOne({ id: currentUser.id });
      user.stripe_id = customer.id;

      console.log(calculateOrderAmount(args.items));

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return {
        clientSecret: paymentIntent.client_secret,
        payment_intent: paymentIntent.id,
      };
    },
    createUser: async (root, args) => {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password, saltRounds);

      const user = new User({
        username: args.email,
        email: args.email,
        password: passwordHash,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      if (!(args.username && args.password)) {
        throw new UserInputError('You must enter a username and password.');
      }

      let user;
      try {
        user = await User.findOne({ username: args.username });
      } catch (error) {
        throw new UserInputError('Cannot find username.');
      }

      let password;
      try {
        password = await bcrypt.compare(args.password, user.password);
      } catch (error) {
        throw new UserInputError('Wrong username or password.');
      }

      if (!password) {
        throw new UserInputError("You've entered an invalid password.");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET),
      };
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) =>
        !currentUser.friends.map((f) => f._id).includes(person._id);

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const person = await Person.findOne({ name: args.name });
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    },
    uploadFile: async (root, args) => {
      const generateId = uuidv4();
      const imageId = generateId + '.' + args.path.split('.').pop();

      const mimeType = args.type;

      const bucketParams = {
        Bucket: 'gooutland',
        Key: imageId,
        ContentType: mimeType,
      };

      const url = await getSignedUrl(s3, new PutObjectCommand(bucketParams), {
        expiresIn: 15 * 60,
      });

      return { path: url, imageId: imageId };
    },
  },
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  let httpServer = '';
  let port = '';
  let message = '';

  if (process.env.NODE_ENV != 'development') {
    var options = {
      //privkey pem
      key: fs.readFileSync('hidden'),
      //fullchain pem
      cert: fs.readFileSync('hidden'),
    };

    httpServer = https.createServer(options, app);
    port = 443;
    //TODO: Add back domain
    message = `🚀 Server ready at https://api.hidden.com:443/graphql`;
  } else {
    httpServer = http.createServer(app);
    port = 4000;
    message = `🚀 Server ready at http://localhost:4000/graphql`;
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id).populate(
          'friends'
        );
        return { currentUser };
      }
    },
  });

  app.use(cors());
  app.use(express.json());

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
  console.log(message);
}

startApolloServer(typeDefs, resolvers);
