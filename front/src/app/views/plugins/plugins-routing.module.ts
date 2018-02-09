import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Plugins'
    },
    children: [
      {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarInitModule'
      },
      {
        path: 'draggable-cards',
        loadChildren: './draggable-cards/draggable-cards.module#DraggableCardsModule'
      },
      {
        path: 'spinners',
        loadChildren: './spinners/spinners.module#SpinnersModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule {}
