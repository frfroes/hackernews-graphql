const user = (root, _, context, info) => context.db.query.user({ where: { id: root.user.id } }, info)

export const AuthPayload = { 
    user,
}
