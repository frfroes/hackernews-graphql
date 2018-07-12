const links = (root, _, context, info) => context.db.query.links({ where: { id_in: root.linkIds }, orderBy: root.orderBy }, info)
  
export const Feed = {
    links,
}