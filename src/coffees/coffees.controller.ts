import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  Delete,
  Query,
  Inject,
} from '@nestjs/common'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { CoffeesService } from './coffees.service'

import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'

@Controller('coffees')
export class CoffeesController {
  // dependency injection
  constructor(private readonly coffeesService: CoffeesService) {
    console.log('CoffeesController is created')
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery)
    /* response.status(410).send(`Get Coffees limit: ${limit} offset: ${offset}`) */
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id)
    return this.coffeesService.findOne(id)
  }

  @Post()
  /* @HttpCode(HttpStatus.I_AM_A_TEAPOT) */
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto)
    return this.coffeesService.create(createCoffeeDto)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto)
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.coffeesService.remove(id)
  }
}
