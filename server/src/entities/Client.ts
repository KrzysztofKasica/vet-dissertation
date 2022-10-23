import { Column, Entity, OneToMany } from "typeorm";
import { Pet } from "./Pet";
import { User } from "./User";

@Entity()
export class Client extends User {

    @OneToMany(() => Pet, (pet) => pet.user, {
        cascade: true,
    })
    pets: Pet[]
}