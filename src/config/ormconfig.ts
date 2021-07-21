import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { StoryEntity } from '../entities/story.entity';

dotenv.config();

const config: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [ StoryEntity, '../src/entities/*.ts', '../build/entities/*.js', ],
    //entities: [ StoryEntity ],
    migrations: [__dirname + '/../src/migrations/**/*.ts'],
    subscribers: [__dirname + '/../src/subscriber/**/*.ts']
};

export = config
