import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService, IMessage } from './chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'WebSocketClient';

  constructor() {}

  ngOnInit(): void {}
}
