const newLinkSubscribe = (_, __, context, info) => {
    return context.db.subscription.link(
      { where: { mutation_in: ['CREATED'] } },
      info,
    )
}

const newLink = {
    subscribe: newLinkSubscribe
}

export const Subscription = {
    newLink,
}