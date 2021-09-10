import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { ArticleDate } from './articleDate';


@Entity()
export class User extends BaseEntity{

    @Column()
    username: string;

    @Column()
    password:string;

}
