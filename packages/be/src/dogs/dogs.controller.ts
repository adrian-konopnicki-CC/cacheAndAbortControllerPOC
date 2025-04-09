import {
  Controller,
  Get,
  Header,
  HttpStatus,
  NotFoundException,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { DogsService, Dog, DogsByBreed } from './dogs.service';
import { createHash } from 'crypto';
import { Request, Response } from 'express';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  private generateETag(content: any): string {
    const hash = createHash('md5');
    hash.update(JSON.stringify(content));
    return `"${hash.digest('hex')}"`;
  }

  @Get('/maxAge')
  @Header('Cache-Control', 'public, max-age=5')
  async getRandom(): Promise<Dog> {
    const dog = await this.dogsService.getRandom();
    if (!dog) {
      throw new NotFoundException(`Dog with not found`);
    }

    return dog;
  }

  // cached response must be validated with the origin
  @Get('/noCache')
  @Header('Cache-Control', 'public, no-cache')
  async getNoCache(): Promise<Dog> {
    const dog = await this.dogsService.getRandom();
    if (!dog) {
      throw new NotFoundException(`Dog with not found`);
    }

    return dog;
  }

  // don't store the response in cache
  @Get('/noStore')
  @Header('Cache-Control', 'public, no-store')
  async getNoStore(): Promise<Dog> {
    const dog = await this.dogsService.getRandom();
    if (!dog) {
      throw new NotFoundException(`Dog with not found`);
    }

    return dog;
  }

  @Get('/staleWhileRevalidate')
  @Header('Cache-Control', 'public, max-age=5, stale-while-revalidate=10')
  async getStaleWhileRevalidate(): Promise<Dog> {
    const dog = await this.dogsService.getRandom();
    if (!dog) {
      throw new NotFoundException(`Dog with not found`);
    }

    console.log(dog.message);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return dog;
  }

  @Get('/etag/:breed')
  @Header('Cache-Control', 'no-cache') // Use no-cache, to always check ETag
  @Header('Access-Control-Expose-Headers', 'ETag') // Expose ETag header to client
  async getETag(
    @Req() req: Request,
    @Res() res: Response,
    @Param('breed') breed: string,
  ): Promise<DogsByBreed | void> {
    const dogs = await this.dogsService.getImagesByBreed(breed);
    if (!dogs) {
      throw new NotFoundException(`Dogs not found`);
    }

    const etag = this.generateETag(dogs);

    const ifNoneMatch = req.headers['if-none-match'];

    if (ifNoneMatch === etag) {
      res.status(HttpStatus.NOT_MODIFIED).setHeader('ETag', etag).send();
      return;
    }

    res.status(HttpStatus.OK).header('ETag', etag).json(dogs).send();
    return;
  }

  @Get('/abortController')
  async getAbortController(): Promise<Dog> {
    const dog = await this.dogsService.getRandom();
    if (!dog) {
      throw new NotFoundException(`Dog with not found`);
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return dog;
  }
}
