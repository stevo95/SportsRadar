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
    img_url: String!
    rating: Float!
    friends: [User]
    events: [Event]
  }
  type Event {
    _id: ID!
    description: String!
    datetime: String!
    latitude: Float!
    longitude: Float!
    sport: String!
    free: Boolean!
    creator_id: String!
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
    likes: [Like]!
    comments: [Comment]!
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
    user(_id: ID!): User
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
      img_url: String
      rating: Float
      friends: [ID]
      events: [ID]
    ): AddUserResponse

    updateUserRating(
      rating: Float!
    ): Float

    updateUserFriends(
      events: [ID]!
    ): [String]

    updateUserEvents(
      _id: ID!
      events: [ID]!
    ): [String]

    deleteUser(
      _id: ID!
    ): User

    #########################################
    ##############  EVENTS  #################
    #########################################

    addEvent(
      description: String!
      datetime: String!
      latitude: Float!
      longitude: Float!
      sport: String!
      free: Boolean!
      creator_id: String!
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
    event: Event
  }

  type AddUserResponse {
    success: Boolean!
    message: String!
    user: User
  }
`
module.exports = typeDefs;