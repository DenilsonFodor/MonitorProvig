import { NgModule } from '@angular/core';

import { MensagemRoutingModule } from './mensagem-routing.module';
import { MensagemComponent } from './mensagem.component';
import { DetalheComponent } from '../detalhe/detalhe.component';
import { ErroComponent } from '../erro/erro.component';
import { HistoricoComponent } from '../historico/historico.component';
import { SharedModule } from '../shared/shared.module';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';


@NgModule({
  declarations: [
    MensagemComponent, 
    DetalheComponent, 
    ErroComponent, 
    HistoricoComponent
  ],
  imports: [
    SharedModule,
    MensagemRoutingModule,
    PoCodeEditorModule
    
  ]
})
export class MensagemModule { }
