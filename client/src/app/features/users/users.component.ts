import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: true,
})
export class UsersComponent {
  visible = true;
}
