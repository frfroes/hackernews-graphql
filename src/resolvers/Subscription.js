//Links
const newVoteSubscribe = (_, __, context, info) => context.db.subscription.vote({ where: { mutation_in: ['CREATED'] } }, info)

const newLinkSubscribe = (_, __, context, info) => context.db.subscription.link({ where: { mutation_in: ['CREATED'] } }, info)

export const Subscription = {
    newVote: { subscribe: newVoteSubscribe },
    newLink: { subscribe: newLinkSubscribe },
}