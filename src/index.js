import { GraphQLServer } from "graphql-yoga";

const links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Replica',
        feed: () => links,
    },
    Mutation: {
        post: (root, args) => {
           const link = {
            id: `link-${links.length + 1}`,
            ...args
          }
          links.push(link)
          return link
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => {
    console.log("Server is running on http://localhost:4000");
})