import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Res, Patch, Delete, Query } from '@nestjs/common'
import { CoffeesService } from './coffees.service'

@Controller('coffees')
export class CoffeesController {
  // dependency injection
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() queryParams, @Res() response) {
    const { offset, limit } = queryParams
    response.status(410).send(`Get Coffees limit: ${limit} offset: ${offset}`)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Get coffee #[${id}] `
  }

  @Post()
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  create(@Body() body) {
    return body
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    console.log(body)
    return `Update coffee #[${id}]`
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Delete coffee #[${id}]`
  }
}
