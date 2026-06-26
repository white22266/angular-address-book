import { Component } from '@angular/core';
import { ListComponent } from './list/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}