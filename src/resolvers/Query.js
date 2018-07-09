const info = () => 'This is the API of a Hackernews Replica'

const feed = async (_, { filter, skip, first, orderBy }, context, info) =>{
    const where = filter &&
      {
        OR: [
          { url_contains: filter },
          { description_contains: filter },
        ],
      }
    
      const queriedLinks = await context.db.query.links({ where, skip, first, orderBy }, `{ id }`)

      const linksConnection = await context.db.query.linksConnection({}, `
        {
            aggregate {
                count
            }
        }
      `)

      return {
        count: linksConnection.aggregate.count,
        linkIds: queriedLinks.map(link => link.id),
      }

} 

const link = (_, { id }, context, info) => context.db.query.link({where: { id }}, info)

export const Query = {
    info,
    feed,
    link
}