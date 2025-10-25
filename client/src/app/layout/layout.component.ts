import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { LanguageService } from '../services/language.service';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core'; // <-- Добавляем импорт

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuTrigger,
    UpperCasePipe,
    MatMenu,
    MatMenuItem,
    TranslatePipe,
    // <-- Добавляем в imports
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  collapsed = true;
  constructor(public languageService: LanguageService) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
