const links = (root, _, context, info) => context.db.query.links({ where: { id_in: root.linkIds } }, info)
  
export const Feed = {
    links,
}