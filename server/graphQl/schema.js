import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Fruit{
_id: ID!
name: String!
category: Category,
price: String!
image: String!
}

type Category{
_id: ID!
name: String!
fruitCount: Int!
}

type FruitsResponse{
fruits: [Fruit]
total : Int
page : Int
totalPages: Int
}

type Query{
getFruits(
category : String
priceRange : String
search : String
page : Int
limit : Int
sort : String
): FruitsResponse

getCategories: [Category]
}

`;