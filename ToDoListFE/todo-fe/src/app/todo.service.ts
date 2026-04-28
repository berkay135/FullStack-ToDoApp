import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ToDoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://localhost:7026/api/ToDo'; 

  constructor(private http: HttpClient) {}

  // Tüm görevleri çek
  getTodos(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.apiUrl);
  }

  // Yeni görev ekle
  addTodo(newTodo: ToDoItem): Observable<ToDoItem> {
    return this.http.post<ToDoItem>(this.apiUrl, newTodo);
  }

  // Görevin tamamlanma durumunu güncelle
  updateTodo(id: number, updatedItem: ToDoItem): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(`${this.apiUrl}/${id}`, updatedItem);
  }

  // Görevi sil
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
