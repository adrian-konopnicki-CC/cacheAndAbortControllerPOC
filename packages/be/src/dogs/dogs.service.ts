import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs';

export interface Dog {
  message: string;
  status: string;
}

export interface DogsByBreed {
  message: string[];
  status: string;
}

@Injectable()
export class DogsService {
  private readonly logger = new Logger(DogsService.name);
  constructor(private readonly httpService: HttpService) {}

  async getRandom(): Promise<Dog> {
    return new Promise((resolve, reject) => {
      this.httpService
        .get<Dog>('https://dog.ceo/api/breeds/image/random')
        .pipe(
          map((response) => response.data),
          catchError((error: AxiosError) => {
            this.logger.error(
              `Error fetching dog: ${error.message || 'Unknown error'}`,
            );
            throw new Error('An error occurred while fetching dog data');
          }),
        )
        .subscribe({
          next: (data) => resolve(data),
          error: (err: Error) => reject(err),
        });
    });
  }

  async getImagesByBreed(breed: string): Promise<DogsByBreed> {
    return new Promise((resolve, reject) => {
      this.httpService
        .get<DogsByBreed>(`https://dog.ceo/api/breed/${breed}/images`)
        .pipe(
          map((response) => response.data),
          catchError((error: AxiosError) => {
            this.logger.error(
              `Error fetching hound images: ${error.message || 'Unknown error'}`,
            );
            reject(new Error('An error occurred while fetching hound images'));
            return [];
          }),
        )
        .subscribe({
          next: (data) => resolve(data),
          error: (err: Error) => reject(err),
        });
    });
  }
}
