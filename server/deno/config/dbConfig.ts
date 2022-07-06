import {Database, MongoDBConnector} from 'https://deno.land/x/denodb/mod.ts';
import {config} from 'https://deno.land/x/dotenv/mod.ts';

const {USER, PASSWORD} = config();

const connector = new MongoDBConnector({
   db: 'green-diet',
   tls: true,
   servers: [
      {
         host: 'greendiet-shard-00-02.rm4uq.mongodb.net',
         port: 27017,
      },
   ],
   credential: {
      username: USER,
      password: PASSWORD,
      mechanism: 'SCRAM-SHA-1',
   }
});

const db = new Database(connector);

export default db;