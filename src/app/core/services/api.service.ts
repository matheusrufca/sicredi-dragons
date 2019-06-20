import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  protected abstract readonly API_URL;
  protected abstract readonly ENTITY_NAME;

  constructor(protected readonly httpClient: HttpClient) {}

  fetchAll(): Observable<T[]> {
    const apiEndpoint = `${this.API_URL}/${this.ENTITY_NAME}`;
    return this.httpClient.get<T[]>(apiEndpoint);
  }

  fetchById(id: number | string): Observable<T> {
    const apiEndpoint = `${this.API_URL}/${this.ENTITY_NAME}/${id}`;
    return this.httpClient.get<T>(apiEndpoint);
  }

  create(payload: T): Observable<T> {
    const apiEndpoint = `${this.API_URL}/${this.ENTITY_NAME}`;
    return this.httpClient.post<T>(apiEndpoint, payload);
  }

  edit(id: number | string, payload?: Partial<T>): Observable<T> {
    const apiEndpoint = `${this.API_URL}/${this.ENTITY_NAME}/${id}`;
    return this.httpClient.put<T>(apiEndpoint, payload);
  }

  remove(id: number | string): Observable<void> {
    const apiEndpoint = `${this.API_URL}/${this.ENTITY_NAME}/${id}`;
    return this.httpClient.delete<void>(apiEndpoint);
  }
}
