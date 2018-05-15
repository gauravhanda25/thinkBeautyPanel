import { NgModule } from '@angular/core';
import { Routes, RouterModule , Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { FormsModule }   from '@angular/forms';
// Import your library
import { NgxPermissionsModule, NgxPermissionsGuard  } from 'ngx-permissions';
import * as $ from 'jquery';

// Import Containers
import {
  FullLayoutComponent,
  FullStaffLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'admin',
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
        path: 'admin',
        loadChildren: './views/login/login.module#LoginModule'
      },
      {
        path: 'artist',
        loadChildren: './views/login/login.module#LoginModule'
      },
      /* 
      {
        path: 'salon',
        loadChildren: './views/login/login.module#LoginModule'
      },  
      */
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
    path: 'managesalon',
    component: FullLayoutComponent,
    data: {
      title: 'Manage Salons'
    },
    children: [
      {
        path: 'registered',
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
        path: 'rejected',
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
        path: 'verified',
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
    path: 'manageusers',
    component: FullLayoutComponent,
    data: {
      title: 'Manage Users'
    },
    children: [
      {
        path: 'registered',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/users/users.module#UsersModule'
      },
      {
        path: 'blocked',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ADMIN'
          }
        },
        loadChildren: './views/users/users.module#UsersModule'
      }
    ]
  },
  {
    path: 'manageartist',
    component: FullLayoutComponent,
    data: {
      title: 'Manage Artists'
    },
    children: [
      {
        path: 'registered',
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
        path: 'rejected',
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
        path: 'verified',
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
  },
  {
    path: 'nailartists',
    component: FullLayoutComponent,
    data: {
      title: 'Nail Artists'
    },
    children: [
      {
        path: 'manage',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'SALON'
          }
        },
        loadChildren: './views/nailartist/nailartist.module#NailartistModule'
      },
      {
        path: 'addartist',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'SALON'
          }
        },
        loadChildren: './views/addnailartist/addnailartist.module#AddnailartistModule'
      },
      {
        path: 'editartist/:id',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'SALON'
          }
        },
        loadChildren: './views/addnailartist/addnailartist.module#AddnailartistModule'
      },
    ]
  },
  {
    path: 'bookings',
    component: FullLayoutComponent,
    data: {
      title: 'Manage Bookings'
    },
    children: [
      {
        path: 'upcoming',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON','ADMIN'],
            except: ['GUEST']
          }
        },
        loadChildren: './views/booking/booking.module#BookingModule'
      },
      {
        path: 'previous',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON','ADMIN'],
            except: ['GUEST']
          }
        },
        loadChildren: './views/booking/booking.module#BookingModule'
      },
      {
        path: 'cancelled',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON','ADMIN'],
            except: ['GUEST']
          }
        },
        loadChildren: './views/booking/booking.module#BookingModule'
      }
    ]
  },
  {
    path: 'updates',
    component: FullLayoutComponent,
    data: {
      title: "What's New"
    },
    children: [
      {
        path: 'manage',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ARTIST'
          }
        },
        loadChildren: './views/updates/updates.module#UpdatesModule'
      },
      {
        path: 'addupdates',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ARTIST'
          }
        },
        loadChildren: './views/addupdates/addupdates.module#AddupdatesModule'
      },
      {
        path: 'editupdates/:id',
        component: SimpleLayoutComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: 'ARTIST'
          }
        },
        loadChildren: './views/addupdates/addupdates.module#AddupdatesModule'
      },
    ]
  },
  {
        path: 'dashboard',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN','ARTIST','SALON'],
            except: 'GUEST'
          }
        },
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'profile',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN','ARTIST','SALON'],
            except: 'GUEST'
          }
        },
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
      {
        path: 'lifetimeRevenue',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON'],
            except: ['GUEST','ADMIN']
          }
        },
        loadChildren: './views/lifetimerevenue/lifetimerevenue.module#LifetimerevenueModule'
      },
      {
        path: 'commission',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN'],
            except: 'GUEST'
          }
        },
        loadChildren: './views/commission/commission.module#CommissionModule'
      },
      {
        path: 'fixedcharge',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON'],
            except: 'GUEST'
          }
        },
        loadChildren: './views/fixedcharge/fixedcharge.module#FixedchargeModule'
      },

      {
        path: 'makeup',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN']
          }
        },
        loadChildren: './views/makeup/makeup.module#MakeupModule'
      },
       {
        path: 'microblading',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN']
          }
        },
        loadChildren: './views/microblading/microblading.module#MicrobladingModule'
      },

      {
        path: 'hair',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN']
          }
        },
        loadChildren: './views/hair/hair.module#HairModule'
      },

      {
        path: 'nails',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ADMIN']
          }
        },
        loadChildren: './views/nails/nails.module#NailsModule'
      },

      {
        path: 'myservices',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON'],
            except: ['ADMIN','GUEST']
          }
        },
        loadChildren: './views/artistservices/artistservices.module#ArtistservicesModule'
      },

      {
        path: 'myservices/:service',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON'],
            except: ['ADMIN','GUEST']
          }
        },
        loadChildren: './views/artistservices/artistservices.module#ArtistservicesModule'
      },

      {
        path: 'schedule',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON'],
            except: ['ADMIN','GUEST']
          }
        },
        loadChildren: './views/artistavail/artistavail.module#ArtistavailModule'
      },

      {
        path: 'media',
        component: FullLayoutComponent,        
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: ['ARTIST','SALON'],
            except: ['ADMIN','GUEST']
          }
        },
        loadChildren: './views/media/media.module#MediaModule'
      }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpModule ],
  exports: [ RouterModule, 
        NgxPermissionsModule ]
})
export class AppRoutingModule {}
