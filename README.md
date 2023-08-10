# AparatExpressGraphQLTS - GraphQL Web Service for Aparat Clone

AparatExpressGraphQLTS is a TypeScript-based GraphQL web service designed to mimic the functionality of the popular video sharing platform Aparat (similar to YouTube). This project utilizes the Express framework to create a custom GraphQL API, providing users with features for uploading, viewing, and interacting with videos and other media content.

## Features

- User authentication and authorization.
- Video upload, storage, and retrieval.
- Video categorization and tagging.
- User interactions such as likes, comments, and views.
- Comprehensive search functionality.
- GraphQL API for flexible and efficient data retrieval.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated web framework for Node.js.
- **GraphQL**: A query language for APIs that enables more efficient and flexible data retrieval.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **MongoDB**: A NoSQL database for storing and managing data.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (https://nodejs.org/)
- MongoDB installed and running (https://www.mongodb.com/try/download/community)
- Git (optional) for cloning the repository

## Getting Started

**Clone the repository:**

```bash
git clone https://github.com/BaseMax/AparatExpressGraphQLTS.git
```

Or download the source code from: AparatExpressGraphQLTS

**Install dependencies:**

```bash
cd AparatExpressGraphQLTS
npm install
```

Set up your environment variables by creating a `.env` file at the root of the project. You can use the provided `.env.example` as a template.

**Start the server:**

```bash
npm start
```

The GraphQL playground will be accessible at `http://localhost:3000/graphql` by default. You can explore and test the API using this interface.

## Project Structure

The project structure is organized as follows:

```
AparatExpressGraphQLTS/
├── src/
│   ├── config/
│   │   ├── db.ts         # MongoDB configuration
│   │   └── ...
│   ├── controllers/
│   │   ├── user.ts       # User-related logic
│   │   ├── video.ts      # Video-related logic
│   │   └── ...
│   ├── models/
│   │   ├── user.ts       # User schema
│   │   ├── video.ts      # Video schema
│   │   └── ...
│   ├── routes/
│   │   ├── auth.ts       # Authentication routes
│   │   ├── video.ts      # Video-related routes
│   │   └── ...
│   ├── schema/
│   │   ├── index.ts      # GraphQL schema and resolvers
│   │   └── ...
│   ├── app.ts            # Express app configuration
│   └── ...
├── .env.example          # Example environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## GraphQL

| Query Name       | Description                                       | Example                                           |
| ---------------- | ------------------------------------------------- | ------------------------------------------------- |
| `getUser`        | Get user details by ID.                          | `getUser(id: ID!): User`                          |
| `getVideo`       | Get video details by ID.                         | `getVideo(id: ID!): Video`                        |
| `listVideos`     | List videos with optional filtering and sorting. | `listVideos(filter: VideoFilter, sort: VideoSort, pagination: PaginationInput): [Video]` |
| `searchVideos`   | Search videos by title or description.           | `searchVideos(query: String!): [Video]`           |
| `createUser`     | Create a new user.                               | `createUser(input: CreateUserInput!): User`       |
| `updateUser`     | Update user details by ID.                       | `updateUser(id: ID!, input: UpdateUserInput!): User` |
| `deleteUser`     | Delete a user by ID.                             | `deleteUser(id: ID!): Boolean`                    |
| `uploadVideo`    | Upload a new video.                              | `uploadVideo(input: UploadVideoInput!): Video`    |
| `updateVideo`    | Update video details by ID.                     | `updateVideo(id: ID!, input: UpdateVideoInput!): Video` |
| `deleteVideo`    | Delete a video by ID.                            | `deleteVideo(id: ID!): Boolean`                   |
| `addLike`        | Add a like to a video.                           | `addLike(videoId: ID!): Video`                   |
| `addComment`     | Add a comment to a video.                        | `addComment(videoId: ID!, input: CommentInput!): Comment` |
| `deleteComment`  | Delete a comment by ID.                          | `deleteComment(id: ID!): Boolean`                |


## Contributing

Contributions are welcome! If you find any issues or would like to suggest improvements, please open an issue or submit a pull request.

## License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

Copyright 2023, Max Base
