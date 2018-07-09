import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { APP_SECRET, getUserId } from "../utils";

//Auth
const signup = async (_, args, context) => {
    
    const password = await bcrypt.hash(args.password, 10)
    
    const user = await context.db.mutation.createUser({
      data: { ...args, password },
    }, `{ id }`)
    
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    return { token, user }
}
  
const login = async (_, { email, password }, context) => {

    const user = await context.db.query.user({ where: { email } }, ` { id password } `)
    if (!user) {
      throw new Error('No such user found')
    }
  
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    return { token, user }
}
  

// Links
const postLink = (_, { data }, context, info) => {
    const userId = getUserId(context)
    return context.db.mutation.createLink({ 
        data: {
            ...data,
            postedBy: { connect: { id: userId } }
        }
    }, info)
}

const updateLink = (_, { id, data }, context, info) => context.db.mutation.updateLink({ where: { id: id }, data }, info)

const deleteLink = (_, { id }, context, info) => context.db.mutation.deleteLink({ where: { id } }, info)

//Vote
const vote = async (parent, { linkId }, context, info) => {
    const userId = getUserId(context)
  
    const linkExists = await context.db.exists.Vote({
      user: { id: userId },
      link: { id: linkId },
    })

    if (linkExists) {
      throw new Error(`Already voted for link: ${linkId}`)
    }
  
    return context.db.mutation.createVote(
      {
        data: {
          user: { connect: { id: userId } },
          link: { connect: { id: linkId } },
        },
      },
      info,
    )
  }

export const Mutation = {
    signup,
    login,
    postLink,
    updateLink,
    deleteLink,
    vote,
}