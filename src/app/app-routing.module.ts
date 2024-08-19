import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main'},
  { path: 'main', 
      loadChildren: () => 
      import('./main/main.module').then ((module) => module.MainModule)},
  { path: 'mensagem',
    loadChildren: () => 
      import('./mensagem/mensagem.module').then ((module) => module.MensagemModule)},  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
