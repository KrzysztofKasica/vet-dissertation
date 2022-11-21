import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Doctor } from "./Doctor";
import { Medication } from "./Medication";
import { Pet } from "./Pet";
import { Visit } from "./Visit";

@Entity()
export class Prescription {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @ManyToMany(() => Medication)
    @JoinTable()
    medication: Medication[]

    @Column()
    quantity!: number;

    @ManyToOne(() => Pet, (pet) => pet.prescriptions, {
        onDelete: 'CASCADE',
    })
    pet: Pet;

    @ManyToOne(() => Doctor, (doctor) => doctor.prescriptions, {
        onDelete: 'CASCADE',
    })
    doctor: Doctor;

    @ManyToOne(() => Visit, (visit) => visit.prescriptions)
    visit: Visit;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}