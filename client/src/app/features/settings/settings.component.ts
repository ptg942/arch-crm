import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: true,
})
export class SettingsComponent {
  visible = true;
}
