import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    loadChildren: () =>
      import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'mensagem',
    loadChildren: () =>
      import('./mensagem/mensagem.module').then((m) => m.MensagemModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
