import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService, ToDoItem } from './todo.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-fe');

  todos = signal<ToDoItem[]>([]);

  newTaskTitle = signal<string>('');

  constructor(private todoService: TodoService) { }

  // Uygulama başlatıldığında verileri çek
  ngOnInit(): void {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        console.log("Veriler Çekildi:", data);
      },
      error: (error) => {
        console.error("Veriler Çekilemedi:", error);
      }
    });
  }

  addNewTodo(): void {
    if (!this.newTaskTitle().trim()) return;

    const newTask: ToDoItem = {
      id: 0, // ID, backend tarafından atanacak
      title: this.newTaskTitle(),
      isCompleted: false
    };

    this.todoService.addTodo(newTask).subscribe({
      next: (addedItem) => {
        this.todos.update((currentTodos) => [...currentTodos, addedItem]);
        this.newTaskTitle.set(''); // Giriş alanını temizle
      },
      error: (error) => {
        console.error("Görev eklenemedi:", error);
      }
    });
  }

  toggleCompletion(item: ToDoItem): void {
    const updatedItem = { ...item, isCompleted: !item.isCompleted };

    this.todoService.updateTodo(Number(item.id), updatedItem).subscribe({
      next: () => {
        this.todos.update((currentTodos) =>
          currentTodos.map((todo) =>
            todo.id === item.id ? updatedItem : todo
          )
        );
      },
      error: (error) => console.error("Görev güncellenemedi:", error)
    });
  }

    deleteTask(id: any): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos.update((currentTodos) =>
          currentTodos.filter((todo) => todo.id !== id)
        );
      },
      error: (error) => console.error("Görev silinemedi:", error)
    });
  }
}
