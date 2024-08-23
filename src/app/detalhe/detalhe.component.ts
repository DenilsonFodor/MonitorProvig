import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MensagemService } from '../shared/service/mensagem.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})
export class DetalheComponent implements OnInit, AfterViewInit {
  
  @Input() rowid!:string;

  items$!: Observable<any>;
  data:any;

  tipoRegistro:any;
  dataIntegracao!:Date;

  constructor(private service: MensagemService) { }

  ngOnInit(): void {
    this.updateData();
  }

  ngAfterViewInit(): void {
    
  }
/*
  private updateData() {
    let obs$ = this.service.getOne(this.rowid);
    this.items$ = obs$.pipe(pluck('items'));
    this.items$.subscribe((result: any) => {
      this.data = result[0];
      this.dataIntegracao = new Date(this.data['dt-integracao']);
      this.tipoRegistro = this.data.tipo == 0 ? "Fatura" : "Adiantamento";
    });
  }
*/

  private updateData(): void {
    // Obtém os dados do serviço com base no rowid
    const response$ = this.service.getOne(this.rowid);
  
    // Processa a resposta e extrai os itens manualmente
    response$.subscribe((response: any) => {
      if (response && response.items && response.items.length > 0) {
        this.data = response.items[0];
        this.dataIntegracao = new Date(this.data['dt-integracao']);
        this.tipoRegistro = this.data.tipo === 0 ? "Fatura" : "Adiantamento";
      }
    });
  }





}
