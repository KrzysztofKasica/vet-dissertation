import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Species } from "./Species";

@Entity()
export class Medication {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @Column()
    dosePerKg!: number; 

    @ManyToMany(() => Species)
    @JoinTable()
    species: Species[];

}