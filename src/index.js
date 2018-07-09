import { GraphQLServer } from "graphql-yoga";

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Replica',
        feed: () => links,
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => {
    console.log("Server is running on http://localhost:4000");
})