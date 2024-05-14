import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

interface MenuItems {
  section?: string;
  items: {
    label: string;
    icon: string;
    iconFill: string;
    routerLink: string;
    counter: number;
  }[];
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  @Output() shrink = new EventEmitter<boolean>();
  shrinkValue = false;
  hovered = false;
  topPosition = 0;
  activeIndex = 0;
  tooltipIndex = 0;
  topTooltip = '';
  user: any = {};

  menuItems: MenuItems[] = [
    {
      items: [
        {
          label: 'Dados Analíticos',
          icon: 'bx-bar-chart-square',
          iconFill: 'bxs-bar-chart-square',
          routerLink: 'dashboard',
          counter: 0
        },
        {
          label: 'Produtos',
          icon: 'bx-help-circle',
          iconFill: 'bxs-help-circle',
          routerLink: 'product',
          counter: 1
        },
      ]
    },
    {
      section: 'Administração',
      items: [
        {
          label: 'Categoria',
          icon: 'bx-layout',
          iconFill: 'bxs-layout',
          routerLink: 'category',
          counter: 2
        },
        {
          label: 'Marca',
          icon: 'bx-folder-open',
          iconFill: 'bxs-folder-open',
          routerLink: 'brand',
          counter: 3
        },
        {
          label: 'Modelo',
          icon: 'bx-notepad',
          iconFill: 'bxs-notepad',
          routerLink: 'model',
          counter: 4
        },
        {
          label: 'Usuários',
          icon: 'bx-notepad',
          iconFill: 'bxs-notepad',
          routerLink: 'user',
          counter: 5
        },
      ]
    },
    {
      section: 'Configurações',
      items: [
        {
          label: 'Conta',
          icon: 'bx-cog',
          iconFill: 'bxs-cog',
          routerLink: 'settings',
          counter: 6
        }
      ]
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getTokenPayload();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart || event instanceof NavigationEnd) {
        this.activeIndex = this.menuItems
          .map(section => section.items)
          .reduce((acc, val) => acc.concat(val), [])
          .findIndex(item => item.routerLink === this.activatedRoute.snapshot.firstChild!.routeConfig!.path);
        this.moveActiveTab();
      }
    });
  }

  ngOnInit() {
    setTimeout(() => this.moveActiveTab());
  }

  toggleShrink() {
    this.shrinkValue = !this.shrinkValue;
    this.shrink.emit(this.shrinkValue);
    setTimeout(() => this.moveActiveTab(), 400);
    this.hovered = true;
    setTimeout(() => this.hovered = false, 500);
  }

  moveActiveTab() {
    this.topPosition = this.activeIndex * 58 + 2.5;
    const shortcuts = document.querySelector(".sidebar-links h4");
    if (!shortcuts) return;
    if (this.activeIndex >= 2) this.topPosition += shortcuts!.clientHeight;
    if (this.activeIndex >= 6) this.topPosition += shortcuts!.clientHeight;
  }

  changeLink(index: number) {
    this.activeIndex = index;
    this.moveActiveTab();
  }

  showToolTip(tooltipIndex: number, length: number) {
    this.tooltipIndex = tooltipIndex;
    this.topTooltip = `${(100 / (length * 2)) * (tooltipIndex * 2 + 1)}%`;
  }

  async logOut() {
    this.authService.signOut();
    await this.router.navigate(['/auth/login']);
  }

}
