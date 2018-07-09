import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Replica',
        feed: (_, __, context, info) => context.db.query.links({}, info),
        link: (_, { id }, context, info) => {
            return context.db.query.link({where: { id }}, info)
        }
    },
    Mutation: {
        post: (_, { data }, context, info) => context.db.mutation.createLink({ data }, info),
        updateLink: (_, { id, data }, context, info) => {
            return context.db.mutation.updateLink({ where: { id: id }, data }, info)
        },
        deleteLink: (_, { id }, context, info) => {
            return context.db.mutation.deleteLink({ where: { id } }, info)
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: process.env.PRISMA_URL,
            debug: true,
        }),
    })
});

server.start(() => {
    console.log("Server is running on http://localhost:4000");
})