import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Flavor } from './flavor.entity'

// @Entity('coffees') // sql table == coffees
@Entity() // sql table == coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  brand: string

  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // [insert]
  })
  flavors: Flavor[]
}
