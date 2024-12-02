import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-app';
  books: Book[] = [
    new Book('Harry potter', true),
    new Book('1984', false),
    new Book('To Kill a Mockingbird', true)
  ];
}
