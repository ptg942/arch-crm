import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients',
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  standalone: true,
})
export class ClientsComponent {
  visible = true;
}
