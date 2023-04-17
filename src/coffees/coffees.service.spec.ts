import { Test, TestingModule } from '@nestjs/testing'
import { CoffeesService } from './coffees.service'
import { Connection, Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Flavor } from './entities/flavor.entity'
import { Coffee } from './entities/coffee.entity'
import { ConfigService } from '@nestjs/config'
import { NotFoundException } from '@nestjs/common'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
})

describe('CoffeesService', () => {
  let service: CoffeesService
  let coffeeRepository: MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: createMockRepository() },
        { provide: getRepositoryToken(Coffee), useValue: createMockRepository() },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile()

    // service = module.get<CoffeesService>(CoffeesService)
    service = await module.resolve(CoffeesService)
    coffeeRepository = await module.resolve(getRepositoryToken(Coffee))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeid = 1
        const expectedCoffee = {}

        coffeeRepository.findOne.mockReturnValue(expectedCoffee)
        const coffee = await service.findOne(coffeeid)
        expect(coffee).toEqual(expectedCoffee)
      })
    })

    describe('otherwise', () => {
      it('should return the "NotFoundException"', async () => {
        const coffeeid = '1'
        coffeeRepository.findOne.mockReturnValue(undefined)

        try {
          await service.findOne(+coffeeid)
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException)
          expect(error.message).toEqual(`Coffee #${coffeeid} not found`)
        }
      })
    })
  })
})
