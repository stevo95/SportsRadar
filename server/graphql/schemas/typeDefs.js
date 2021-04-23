'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`

#########################################
########### types definitions ###########
#########################################

  type User {
    _id: ID!
    nickname: String!
    email: String!
    password: String!
    img_url: String
    rating: Float
    bio: String
    friends: [User]
    events_attending: [Event]
    events_hosting: [Event]
    posts: [Post]
  }
  type Event {
    _id: ID!
    description: String!
    date: String!
    time: String!
    latitude: Float!
    longitude: Float!
    sport: String!
    free: Boolean!
    creator_id: String!
    creator_username: String!
    price: String
    # comments: [Comment]!
    # title: String!
    # img_url: String!
  }

  type Place {
    _id: ID!
    name: String!
    description: String!
    public: Boolean!
    price: String!
  }

  type Post {
    _id: ID!
    author: User!
    content: String!
    likes: [Like]
    comments: [Comment]
    image: [String]
  }

  type Like {
    _id: ID!
    author: User!
  }

  type Comment {
    _id: ID!
    author: User!
  }

#########################################
########### Query definitions ###########
#########################################

  type Query {
    getUser(_id: ID!): User
    users: [User]!
    getAllEvents: [Event]! 
  }

#########################################
########### Mutation definitions ########
#########################################

  type Mutation {
    addUser(
      _id: ID
      nickname: String!
      email: String!
      password: String!
    ): AddUserResponse

    updateUserRating(
      rating: Float!
    ): Float

    updateUserFriends(
      events: [ID]!
    ): [String]

    userJoinedEvent(
      _id: String
      eventId: String
    ): UpdateResponse

    updateUserHosting(
      _id: String
      eventId: String
    ): UpdateResponse


    #########################################
    ##############  EVENTS  #################
    #########################################

    addEvent(
      description: String
      date: String
      time: String
      latitude: Float
      longitude: Float
      sport: String
      free: Boolean
      creator_id: String
      creator_username: String
      price: String
      # attending: [ID]
    ): AddEventResponse

  }

    #########################################
    ##########  RESPONSE TYPES  #############
    #########################################

  type AddEventResponse {
    success: Boolean!
    message: String!
    updatedList: [Event]
  }

  type AddUserResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type UpdateResponse {
    success: Boolean!
    message: String!
  }
`
module.exports = typeDefs;