const postLink = (_, { data }, context, info) => context.db.mutation.createLink({ data }, info)

const updateLink = (_, { id, data }, context, info) => context.db.mutation.updateLink({ where: { id: id }, data }, info)

const deleteLink = (_, { id }, context, info) => context.db.mutation.deleteLink({ where: { id } }, info)

export const Mutation = {
    postLink,
    updateLink,
    deleteLink
}