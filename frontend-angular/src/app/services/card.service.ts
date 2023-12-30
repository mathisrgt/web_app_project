import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private baseUrl = '/api/cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addCard(card: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, card);
  }

  updateCard(id: string, card: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, card);
  }

  deleteCard(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}

