import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Doctor } from "./entities/Doctor";
import { Pet } from "./entities/Pet";

export const dataSourceConn = new DataSource({
        type: 'postgres',
        database: 'clinicDB',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [Client, Doctor, Pet]
    });


