# hackernews-graphql

A sample project written in node that aims to implement a GraphQL server of a [hackernews](https://news.ycombinator.com/news) replica.

This project is fully based on the GraphQL Node [tutorial](https://www.howtographql.com/graphql-js/0-introduction/) written by [Maria Belllo](https://github.com/mairatma) for the [howtographql.com](https://www.howtographql.com/).

You can check out the final result [**here**](https://hackernews-graphql.herokuapp.com/) or download to your local machine and setting up manually.

## Manual Setup
First, clone the repo to your local machine, go to the root folder  and install the local dependencies with `npm install`.

### Setting up Prisma
Now you are able to configure the database GraphQL server using the  prisma CLI running `npm run deploy-prisma` from the root folder. After that the CLI will give some options to choose from. 
From this point you can setup Prisma in any way you like, but if you want this done quickly just do the fallowing: 

 - choose **Demo Server** from the CLI options
 - Authenticate to the [Prisma Cloud](https://www.prisma.io/cloud/) service
 - Choose the **region**, the **name** and the **stage** of your service (You can just leave all default options).
 - After the deploy finishes, run `prisma info` copy the **HTTP url** and assign it to a environment variable named **PRISMA_URL**. In unix based OS could be the fallowing command:
    
        export PRISMA_URL=<your-prisma-service-ulr>

Finally, if everything went well you can run the project with `npm start` and checkout the GraphQL endpoint at [localhost:4000](http://localhost:4000).


