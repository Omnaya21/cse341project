// prettier-ignore
import {
  universalErrorHandler,
  addUniversalResponseHeaders,
  fourOhFour
} from './middleware';
import express, { Express } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import connectDB from './db/db';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
// import * as swaggerDocProd from './swagger.json';
// import * as swaggerDocDev from './swagger-dev.json';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
// import './passport';

const PORT = process.env.PORT;
const app: Express = express();

// let swaggerDoc = swaggerDocProd;
// if (process.env.NODE_ENV === 'dev') {
//   swaggerDoc = swaggerDocDev;
// }

(async () => {
  await connectDB();
  app
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    // .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
    // .use(
    //   session({
    //     secret: process.env.SESSION_SECRET!,
    //     resave: false,
    //     saveUninitialized: false,
    //     store: MongoStore.create({ client: mongoose.connection.getClient() }),
    //   })
    // )
    // .use(passport.initialize())
    // .use(passport.session())
    .use(addUniversalResponseHeaders)
    .use('/', routes)
    .use(fourOhFour)
    .use(universalErrorHandler);

  const createServerMessage = () => {
    let logMessage = `⚡️[server]: Server is listening on port ${PORT}.`;
    if (process.env.NODE_ENV === 'dev') {
      const url = `http://localhost:${PORT}/api-docs`;
      const link = `\u001b]8;;${url}\u001b\\${url}\u001b]8;;\u001b\\`;
      logMessage += ` | ${chalk.blue(link)}`;
    }
    return logMessage;
  };

  app.listen(PORT, () => console.log(createServerMessage()));
})();
