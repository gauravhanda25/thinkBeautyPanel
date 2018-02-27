import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

// Import navigation elements
import { artistnavigation } from './../../_nav';

@Component({
  selector: 'app-artistsidebar-nav',
  template: `
    <nav class="sidebar-nav">
      <ul class="nav">
        <ng-template ngFor let-navitem [ngForOf]="artistnavigation">
          <li *ngIf="isDivider(navitem)" class="nav-divider"></li>
          <ng-template [ngIf]="isTitle(navitem)">
            <app-artistsidebar-nav-title [title]='navitem'></app-artistsidebar-nav-title>
          </ng-template>
          <ng-template [ngIf]="!isDivider(navitem)&&!isTitle(navitem)">
            <app-artistsidebar-nav-item [item]='navitem'></app-artistsidebar-nav-item>
          </ng-template>
        </ng-template>
      </ul>
    </nav>`
})
export class AppStaffsidebarNavComponent {

  public artistnavigation = artistnavigation;

  public isDivider(item) {
    return item.divider ? true : false
  }

  public isTitle(item) {
    return item.title ? true : false
  }

  constructor() { }
}

import { Router } from '@angular/router';

@Component({
  selector: 'app-artistsidebar-nav-item',
  template: `
    <li *ngIf="!isDropdown(); else dropdown" [ngClass]="hasClass() ? 'nav-item ' + item.class : 'nav-item'">
      <app-artistsidebar-nav-link [link]='item'></app-artistsidebar-nav-link>
    </li>
    <ng-template #dropdown>
      <li [ngClass]="hasClass() ? 'nav-item nav-dropdown ' + item.class : 'nav-item nav-dropdown'"
          [class.open]="isActive()"
          routerLinkActive="open"
          appNavDropdown>
        <app-artistsidebar-nav-dropdown [link]='item'></app-artistsidebar-nav-dropdown>
      </li>
    </ng-template>
    `
})
export class AppStaffsidebarNavItemComponent {
  @Input() item: any;

  public hasClass() {
    return this.item.class ? true : false
  }

  public isDropdown() {
    return this.item.children ? true : false
  }

  public thisUrl() {
    return this.item.url
  }

  public isActive() {
    return this.router.isActive(this.thisUrl(), false)
  }

  constructor( private router: Router )  { }

}

@Component({
  selector: 'app-artistsidebar-nav-link',
  template: `
    <a *ngIf="!isExternalLink(); else external"
      [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'"
      routerLinkActive="active"
      [routerLink]="[link.url]"
      (click)="hideMobile()">
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      {{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ng-template #external>
      <a [ngClass]="hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'" href="{{link.url}}">
        <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
        {{ link.name }}
        <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
      </a>
    </ng-template>
  `
})
export class AppStaffsidebarNavLinkComponent {
  @Input() link: any;

  public hasVariant() {
    return this.link.variant ? true : false
  }

  public isBadge() {
    return this.link.badge ? true : false
  }

  public isExternalLink() {
    return this.link.url.substring(0, 4) === 'http' ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  public hideMobile() {
    if (document.body.classList.contains('sidebar-mobile-show')) {
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }

  constructor() { }
}

@Component({
  selector: 'app-artistsidebar-nav-dropdown',
  template: `
    <a class="nav-link nav-dropdown-toggle" appNavDropdownToggle>
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      {{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ul class="nav-dropdown-items">
      <ng-template ngFor let-child [ngForOf]="link.children">
        <app-artistsidebar-nav-item [item]='child'></app-artistsidebar-nav-item>
      </ng-template>
    </ul>
  `
})
export class AppStaffsidebarNavDropdownComponent {
  @Input() link: any;

  public isBadge() {
    return this.link.badge ? true : false
  }

  public isIcon() {
    return this.link.icon ? true : false
  }

  constructor() { }
}

@Component({
  selector: 'app-artistsidebar-nav-title',
  template: ''
})
export class AppStaffsidebarNavTitleComponent implements OnInit {
  @Input() title: any;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const li = this.renderer.createElement('li');
    const name = this.renderer.createText(this.title.name);

    this.renderer.addClass(li, 'nav-title');

    if ( this.title.class ) {
      const classes = this.title.class;
      this.renderer.addClass(li, classes);
    }

    if ( this.title.wrapper ) {
      const wrapper = this.renderer.createElement(this.title.wrapper.element);

      this.renderer.appendChild(wrapper, name);
      this.renderer.appendChild(li, wrapper);
    } else {
      this.renderer.appendChild(li, name);
    }
    this.renderer.appendChild(nativeElement, li)
  }
}

export const APP_STAFFSIDEBAR_NAV = [
  AppStaffsidebarNavComponent,
  AppStaffsidebarNavDropdownComponent,
  AppStaffsidebarNavItemComponent,
  AppStaffsidebarNavLinkComponent,
  AppStaffsidebarNavTitleComponent
];
