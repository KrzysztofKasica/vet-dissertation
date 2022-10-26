import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./Pet";

@Entity()
export class Species {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @OneToMany(() => Pet, (pets) => pets.species)
    pets: Pet[];
}