import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    name!: string;

    @Column()
    spiecies!: string;

    @Column()
    dateOfBirth!: Date;

    @ManyToOne(() => User, (user) => user.pets)
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}