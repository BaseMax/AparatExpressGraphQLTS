import { gql } from "apollo-server-core";

export const typeDefs= gql`


type UploadedFileResponse {
  filename: String!
  mimetype: String!
  encoding: String!
  url: String!
}

type Mutation {
uploadFile(file: Upload!): UploadedFileResponse!
}

`