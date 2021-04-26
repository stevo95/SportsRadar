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
    num_of_ratings: Int
    bio: String
    friends: [User]
    events_attending: [String]
    events_hosting: [String]
    posts: [String]
  }
  type Event {
    _id: ID!
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
    attendance: [String]
    # comments: [Comment]!
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
    logIn(email: String!, password: String!): AuthResponse
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
    ): AuthResponse

    updateUserRating(
      rating: Float!
    ): Float

    updateUserFriends(
      events: [ID]!
    ): [String]

    updateUserHosting(
      _id: String
      eventId: String
    ): UpdateResponse

    userJoinedEvent(
      _id: String
      eventId: String
    ): UpdateResponse

    userLeftEvent(
      _id: String
      eventId: String
    ): UpdateResponse

    deleteEvent(
      _id: String
      eventId: String
    ): EventResponse

    addPost(
      _id: String
      post: String
    ): PostResponse



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

  type EventResponse {
    success: Boolean!
    message: String!
    updatedList: [Event]!
  }

  type PostResponse {
    success: Boolean!
    message: String!
    updatedList: [String]!
  }

  type AddEventResponse {
    success: Boolean!
    message: String!
    event: Event!
  }

  type AuthResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type UpdateResponse {
    success: Boolean!
    message: String!
    updatedList: [Event]
  }

`
module.exports = typeDefs;