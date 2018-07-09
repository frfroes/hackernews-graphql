const info = () => 'This is the API of a Hackernews Replica'

const feed = (_, { filter, skip, first, orderBy }, context, info) =>{
    const where = filter &&
      {
        OR: [
          { url_contains: filter },
          { description_contains: filter },
        ],
      }
    
    return context.db.query.links({ where, skip, first, orderBy }, info)
} 

const link = (_, { id }, context, info) => context.db.query.link({where: { id }}, info)

export const Query = {
    info,
    feed,
    link
}