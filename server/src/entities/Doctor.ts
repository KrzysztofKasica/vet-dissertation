import { Entity, OneToMany } from "typeorm";
import { Prescription } from "./Prescription";
import { User } from "./User";
import { Visit } from "./Visit";

@Entity()
export class Doctor extends User {
    
    @OneToMany(() => Prescription, (prescription) => prescription.doctor, {
        cascade: true,
    })
    prescriptions: Prescription[];

    @OneToMany(() => Visit, (visits) => visits.doctor)
    visits: Visit[];
}