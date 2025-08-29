import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/list.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = `${environment.apiUrl}/lists`;

  constructor(private http: HttpClient) {}

  getListsByBoard(boardId: number): Observable<List[]> {
    return this.http.get<List[]>(`${this.apiUrl}/board/${boardId}`);
  }

  createList(list: Partial<List>): Observable<List> {
    return this.http.post<List>(this.apiUrl, list);
  }

  updateList(id: number, list: Partial<List>): Observable<List> {
    return this.http.put<List>(`${this.apiUrl}/${id}`, list);
  }

  deleteList(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
