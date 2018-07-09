const info = () => 'This is the API of a Hackernews Replica'

const feed = (_, __, context, info) => context.db.query.links({}, info)

const link = (_, { id }, context, info) => context.db.query.link({where: { id }}, info)

export const Query = {
    info,
    feed,
    link
}