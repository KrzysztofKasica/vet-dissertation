import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client";
import { Prescription } from "./Prescription";
import { Species } from "./Species";
import { Visit } from "./Visit";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @ManyToOne(() => Species, (species) => species.pets)
    species: Species;

    @Column()
    dateOfBirth!: Date;

    @ManyToOne(() => Client, (client) => client.pets, {
        onDelete: 'CASCADE',
    })
    client: Client;

    @OneToMany(() => Prescription, (prescription) => prescription.pet, {
        cascade: true,
    })
    prescriptions: Prescription[];

    @OneToMany(() => Visit, (visits) => visits.pet)
    visits: Visit[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}