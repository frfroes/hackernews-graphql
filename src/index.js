import { GraphQLServer } from "graphql-yoga";

const links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Replica',
        feed: () => links.filter(link => link),
        link: (_, { id }) => links[id]
    },
    Mutation: {
        post: (_, args) => {
           const link = {
            id: `link-${links.length}`,
            ...args
          }
          links.push(link)
          return link
        },
        updateLink: (_, args) => {
            let linkToUpdate = links[args.id]
            if(linkToUpdate !== null)
                links[args.id] = {
                    ...linkToUpdate,
                    ...args,
                    id: linkToUpdate.id
                }
            return links[args.id]
         },
         deleteLink: (_, { id }) => {
           const removedLink = links[id]
           links[id] = null
           return removedLink
         },

    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => {
    console.log("Server is running on http://localhost:4000");
})