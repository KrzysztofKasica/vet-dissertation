import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const dataSourceConn = new DataSource({
        type: 'postgres',
        database: 'clinicDB',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [User]
    });


