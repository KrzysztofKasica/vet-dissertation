import { Entity, OneToMany } from "typeorm";
import { Pet } from "./Pet";
import { User } from "./User";
import { Visit } from "./Visit";

@Entity()
export class Client extends User {

    @OneToMany(() => Pet, (pet) => pet.client, {
        cascade: true,
    })
    pets: Pet[]

    @OneToMany(() => Visit, (visits) => visits.client)
    visits: Visit[];
}