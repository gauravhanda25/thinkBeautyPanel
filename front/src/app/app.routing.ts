import { NgModule } from '@angular/core';
import { Routes, RouterModule , Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';
// Import your library
import { NgxPermissionsModule, NgxPermissionsGuard  } from 'ngx-permissions';

// Import Containers
import {
  FullLayoutComponent,
  FullStaffLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'PublicPages'
    },
    children: [
      {
        path: 'login',
        loadChildren: './views/login/login.module#LoginModule'
      },
      {
        path: 'forgot',
        loadChildren: './views/forgot/forgot.module#ForgotModule'
      },
      {
        path: 'resetpassword/:id/:token',
        loadChildren: './views/resetpwd/resetpwd.module#ResetpwdModule'
      },
      {
        path: 'verify-email/:id/:token',
        loadChildren: './views/verify/verify.module#VerifyModule'
      }
    ]
  },
  {
    path: '',
    data: {
      title: 'Home'
    },
    children: [
      
      {
        path: 'dashboard',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN','TRAINER'],
            except: 'GUEST'
          }
        },
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
          	  
      {
        path: 'emails',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/emails/emails.module#EmailsModule'
      },
      {
        path: 'invoices',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            except: 'ADMIN'
          }
        },
        loadChildren: './views/invoices/invoices.module#InvoicesModule'
      },

      {
        path: 'base',
        component: FullStaffLayoutComponent,
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      
      {
        path: 'editors',
        loadChildren: './views/editors/editors.module#EditorsModule'
      },
      {
        path: 'forms',
        loadChildren: './views/forms/forms.module#FormsModule'
      },
      {
        path: 'google-maps',
        loadChildren: './views/google-maps/google-maps.module#GoogleMapsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'plugins',
        loadChildren: './views/plugins/plugins.module#PluginsModule'
      },
      {
        path: 'tables',
        loadChildren: './views/tables/tables.module#TablesModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'uikits',
        loadChildren: './views/uikits/uikits.module#UIKitsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }


    ]
  },

    {
    path: 'salon',
    component: FullLayoutComponent,
    data: {
      title: 'Salon'
    },
    children: [
      {
        path: '',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/salon/salon.module#SalonModule'
      },{
        path: 'newrequests',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/salon/salon.module#SalonModule'
      },
      {
        path: 'addsalon',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
              loadChildren: './views/addsalon/addsalon.module#AddsalonModule'
      },
      {
        path: 'editsalon/:id',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addsalon/addsalon.module#AddsalonModule'
      },
    ]
  },
  {
    path: 'artist',
    component: FullLayoutComponent,
    data: {
      title: 'Artists'
    },
    children: [
      {
        path: '',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/artist/artist.module#ArtistModule'
      },{
        path: 'newrequests',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/artist/artist.module#ArtistModule'
      },
      {
        path: 'addartist',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addartist/addartist.module#AddartistModule'
      },
      {
        path: 'editartist/:id',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addartist/addartist.module#AddartistModule'
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpModule ],
  exports: [ RouterModule, 
        NgxPermissionsModule ]
})
export class AppRoutingModule {}
