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
  SetMetadata,
} from '@nestjs/common'
import { IS_PUBLIC_KEY, Public } from '../common/decorators/public.decorator'
import { PaginationQueryDto } from '../common/dto/pagination-query.dto'
import { CoffeesService } from './coffees.service'

import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { resolve } from 'path'
import { ParseIntPipe } from '../common/pipes/parse-int.pipe'
import { Protocol } from '../common/decorators/protocol.decorator'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Coffees')
@Controller('coffees')
export class CoffeesController {
  // dependency injection
  constructor(private readonly coffeesService: CoffeesService) {
    console.log('CoffeesController is created')
  }

  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Public()
  @Get()
  async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(protocol)
    return this.coffeesService.findAll(paginationQuery)
    /* response.status(410).send(`Get Coffees limit: ${limit} offset: ${offset}`) */
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id)
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
