import { AuthMiddleware } from "./auth.middleware";
import { LoggerMiddleware } from "./logger.middleware";
import { MorganMiddleware } from "./morgan.middleware";
import { QueryMongoMiddleware } from "./query-mongo.middleware";
import { QueryPostgresqlMiddleware } from "./query-postgresql.middleware";
// import { QueryPostgresqlMiddleware } from "./query-postgresql.middleware";


const queryMongoMiddleware = new QueryMongoMiddleware();
const queryPostgresqlMiddleware = new QueryPostgresqlMiddleware();
const loggerMiddleware = new LoggerMiddleware();
const morganMiddleware = new MorganMiddleware();
const authMiddleware = new AuthMiddleware();
export {
    queryPostgresqlMiddleware,
    queryMongoMiddleware,
    loggerMiddleware,
    morganMiddleware,
    authMiddleware
}