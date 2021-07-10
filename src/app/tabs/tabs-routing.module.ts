import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'ticket',
        loadChildren: () =>
          import('../ticket/ticket.module').then((m) => m.TicketPageModule),
      },

      {
        path: 'wallet',
        loadChildren: () =>
          import('../wallet/wallet.module').then((m) => m.WalletPageModule),
      },
      // {
      //   path: 'inbox',
      //   loadChildren: () =>
      //     import('../inbox/inbox.module').then((m) => m.InboxPageModule),
      // },
      {
        path: 'refer',
        loadChildren: () =>
          import('../refer/refer.module').then((m) => m.ReferPageModule),
      },

    ],
  },
  {
    path: 'data',
    loadChildren: () =>
      import('../data/data.module').then((m) => m.DataPageModule),
  },
  {
    path: 'airtime',
    loadChildren: () =>
      import('../airtime/airtime.module').then((m) => m.AirtimePageModule),
  },
  {
    path: 'convert',
    loadChildren: () =>
      import('../convert/convert.module').then((m) => m.ConvertPageModule),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('../history/history.module').then((m) => m.HistoryPageModule),
  },
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
