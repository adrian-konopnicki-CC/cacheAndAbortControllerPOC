import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [DogsService],
  controllers: [DogsController],
  imports: [HttpModule],
})
export class DogsModule {}
