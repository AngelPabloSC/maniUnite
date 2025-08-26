import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface Message {
  user: string;
  text: string;
  role: 'moderator' | 'user';
}

@Component({
  selector: 'app-live-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-chat.html',
  styleUrl: './live-chat.scss',
})
export class LiveChat {
  auth = inject(AuthService);

  messages = signal<Message[]>([
    {
      user: 'Moderador',
      text: 'Recuerden que el próximo número sale en 2 minutos',
      role: 'moderator',
    },
    {
      user: 'Pedro Santos',
      text: 'Solo me falta el G-52 para BINGO! 🍒',
      role: 'user',
    },
    {
      user: 'Lucía Fernández',
      text: '¡Qué buena causa! Ya compré 3 tablas 💚',
      role: 'user',
    },
  ]);

  login() {
    this.auth.login();
  }

  sendMessage(event: Event) {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).elements.namedItem('message') as HTMLInputElement;
    const value = input.value.trim();
    if (value) {
      this.messages.update((msgs) => [
        ...msgs,
        {
          user: 'Tú',
          text: value,
          role: 'user',
        },
      ]);
      input.value = '';
    }
  }
}