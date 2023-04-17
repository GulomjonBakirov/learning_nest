import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD, APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { ApiKeyGuard } from './guards/api-key.guard'
import { LoggingMiddleware } from './middleware/logging.middleware'

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: APP_GUARD, useClass: ApiKeyGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('coffees/:id') -> coffees route boshqa hammasida ishla
    consumer.apply(LoggingMiddleware).forRoutes({ path: 'coffees', method: RequestMethod.GET })
  }
}
