import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Dragon } from '../models/dragon';
import { of, Observable } from 'rxjs';

const PREDEFINED_DRAGONS_TYPES: Readonly<string[]> = [
  'Amphitere',
  'Drake',
  'Hydra',
  'Eastern',
  'Wyvern',
  'Anthropomorphic',
  'Dragon Beasts',
  'Western',
  'Lindworm',
  'Dragonnet',
  'Cockatrice',
];

const PREDEFINED_STORIES: Readonly<string[]> = [
  'Harry Potter',
  'LOTR',
  'Other',
];

@Injectable({
  providedIn: 'root',
})
export class DragonsService extends ApiService<Dragon> {
  // TODO: move to enviroment file
  protected readonly API_URL =
    'https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1';

  protected readonly ENTITY_NAME = 'dragon';

  constructor(protected readonly httpClient: HttpClient) {
    super(httpClient);
  }

  fetchDragonTypes(): Observable<string[]> {
    return of([...PREDEFINED_DRAGONS_TYPES]);
  }

  fetchHistories(): Observable<string[]> {
    return of([...PREDEFINED_STORIES]);
  }
}
