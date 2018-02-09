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
        path: 'calendar',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN','TRAINER'],
            except: 'GUEST'
          }
        },
        loadChildren: './views/calendar/calendar.module#CalendarInitModule'
      },
      {
        path: 'events',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN','TRAINER'],
            except: 'GUEST'
          }
        },
        loadChildren: './views/events/events.module#EventsModule'
      },
      {
        path: 'dealers',
        component: FullLayoutComponent, 
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/dealers/dealers.module#DealersModule'
      },
      {
        path: 'adddealer',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/adddealer/adddealer.module#AdddealerModule'
      },
      {
        path: 'editdealer/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/adddealer/adddealer.module#AdddealerModule'
      },
      {
        path: 'deldealer/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/dealers/dealers.module#DealersModule'
      },
      {
        path: 'artist',
        component: FullLayoutComponent,
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
        component: FullLayoutComponent,
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
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addartist/addartist.module#AddartistModule'
      },
      {
        path: 'delartist/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/artist/artist.module#ArtistModule'
      },
	   {
        path: 'brand',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/brand/brand.module#BrandModule'
      },
       {
        path: 'addbrand',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addbrand/addbrand.module#AddbrandModule'
      },
      {
        path: 'editbrand/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addbrand/addbrand.module#AddbrandModule'
      },
      {
        path: 'delbrand/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/brand/brand.module#BrandModule'
      },
	  {
        path: 'oem',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/oem/oem.module#OemModule'
      },
       {
        path: 'addoem',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addoem/addoem.module#AddoemModule'
      }, 
      {
        path: 'editoem/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addoem/addoem.module#AddoemModule'
      },
      {
        path: 'deloem/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/oem/oem.module#OemModule'
      },{
        path: 'auto-group',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/autoGroup/autoGroup.module#AutoGroupModule'
      },
       {
        path: 'addautoGroup',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addautogroup/addautogroup.module#AddautogroupModule'
      }, 
      {
        path: 'editautoGroup/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addautogroup/addautogroup.module#AddautogroupModule'
      },
      {
        path: 'delautoGroup/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/autoGroup/autoGroup.module#AutoGroupModule'
      },
	  {
        path: 'center',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/center/center.module#CenterModule'
      },
         {
        path: 'addcenter',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addcenter/addcenter.module#AddcenterModule'
      },
      {
        path: 'editcenter/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addcenter/addcenter.module#AddcenterModule'
      },
      {
        path: 'delcenter/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/center/center.module#CenterModule'
      }, 
	  
	   {
        path: 'contactrole',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/contactrole/contactrole.module#ContactRoleModule'
      },
	  
		 {
        path: 'addcontactrole',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addcontactrole/addcontactrole.module#AddcontactroleModule'
      },
	  
      {
        path: 'editcontactrole/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addcontactrole/addcontactrole.module#AddcontactroleModule'
      },
	  
      {
        path: 'delcontactrole/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/contactrole/contactrole.module#ContactRoleModule'
      },
	   
	  
	  {
        path: 'mr',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/mr/mr.module#MrModule'
      },
	  
	   {
        path: 'addmr',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addmr/addmr.module#AddmrModule'
      },
      {
        path: 'editmr/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addmr/addmr.module#AddmrModule'
      },
      {
        path: 'delmr/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/mr/mr.module#MrModule'
      }, 
	  
	   {
        path: 'advertisingagency',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/advertisingagency/advertisingagency.module#AdvertisingAgencyModule'
      },
	     {
        path: 'addadvertisingagency',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addadvertisingagency/addadvertisingagency.module#AddadvertisingagencyModule'
      },
      {
        path: 'editadvertisingagency/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/addadvertisingagency/addadvertisingagency.module#AddadvertisingagencyModule'
      },
	  /* {
        path: 'delmr/:id',
        component: FullLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/mr/mr.module#MrModule'
      },  */
	  
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
        path: 'staffcalendar',
        component: FullStaffLayoutComponent,
        loadChildren: './views/calendar/calendar.module#CalendarInitModule'
      },
      {
        path: 'staffevents',
        component: FullStaffLayoutComponent,
        loadChildren: './views/events/events.module#EventsModule'
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
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpModule ],
  exports: [ RouterModule, 
        NgxPermissionsModule ]
})
export class AppRoutingModule {}
