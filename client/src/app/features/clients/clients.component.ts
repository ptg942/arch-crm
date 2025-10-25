import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clients',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  standalone: true,
})
export class ClientsComponent {
  visible = true;
}
