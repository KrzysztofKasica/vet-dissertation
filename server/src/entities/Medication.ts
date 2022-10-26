import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Prescription } from "./Prescription";
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

    @ManyToOne(() => Prescription, (prescription) => prescription.medication)
    prescription: Prescription;
}