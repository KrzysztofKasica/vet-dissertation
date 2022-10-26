import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Doctor } from "./entities/Doctor";
import { Medication } from "./entities/Medication";
import { Pet } from "./entities/Pet";
import { Prescription } from "./entities/Prescription";
import { Species } from "./entities/Species";
import { Visit } from "./entities/Visit";

export const dataSourceConn = new DataSource({
        type: 'postgres',
        database: 'clinicDB',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [Client, Doctor, Pet, Species, Medication, Prescription, Visit]
    });


