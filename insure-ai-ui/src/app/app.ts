import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environment/environment.prod';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  message = '';
  loading = false;
  healthStatus = 'Not checked';

  messages: { role: 'user' | 'assistant'; text: string }[] = [];

  checkHealth(): void {
    this.http.get<{ status: string }>(`${this.baseUrl}/health`).subscribe({
      next: (res) => {
        this.healthStatus = `Backend: ${res.status}`;
      },
      error: () => {
        this.healthStatus = 'Backend health check failed';
      }
    });
  }

  sendMessage(): void {
    const text = this.message.trim();
    if (!text || this.loading) return;

    this.messages.push({ role: 'user', text });
    this.message = '';
    this.loading = true;

    this.http
      .post<{ response?: string; error?: string }>(`${this.baseUrl}/chat`, {
        message: text
      })
      .subscribe({
        next: (res) => {
          this.messages.push({
            role: 'assistant',
            text: res.response || res.error || 'No response returned.'
          });
          this.loading = false;
        },
        error: () => {
          this.messages.push({
            role: 'assistant',
            text: 'Backend connection failed.'
          });
          this.loading = false;
        }
      });
  }
}