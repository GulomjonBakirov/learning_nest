import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CoffeesModule } from '../../src/coffees/coffees.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as request from 'supertest'
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto'

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'nest coffee',
    brand: 'nest coffee full',
    flavors: ['milk', 'sugar'],
  }
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'test',
          password: 'test',
          database: 'test',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile()

    app = moduleFixture.createNestApplication()

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    )

    await app.init()
  })

  it('Create [Post /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCoffee = jasmine.objectContaining({
          ...coffee,
          flavors: jasmine.arrayContaining(coffee.flavors.map((name) => jasmine.objectContaining({ name }))),
        })
        expect(body).toEqual(expectedCoffee)
      })
  })

  it.todo('Get all [GET /]')
  it.todo('Get one [GET /:id]')
  it.todo('Update one [Put /:id]')
  it.todo('Delete one [Delete /:id]')

  afterAll(async () => {
    await app.close()
  })
})
