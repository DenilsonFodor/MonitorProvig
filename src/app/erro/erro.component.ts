import { Component, Input, OnInit } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { ErroService } from '../shared/service/erro.service';


@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {

  @Input() rowid!:string;

  items$!: Observable<any>;
  hasMore$!: Observable<boolean>;

  tableData: any = [];

  tableColumns: PoTableColumn[] = [
    {
      label: 'Data',
      property: 'data',
      type: 'dateTime',
      width: '12%',
    },
    { label: 'Código', property: 'codigo' },
    { label: 'Mensagem', property: 'mensagem' },
  ];

  filterData: any = {
    page: 1,
    pageSize: 20
  };

  constructor(private service: ErroService) { }

  ngOnInit(): void {
    this.updateData();
  }

  onUpdate() {
    this.filterData.page = 1;
    this.updateData();
  }

  onShowMore() {
    this.filterData.page++;
    this.updateData();
  }

  private updateData() {
    this.service.getOne(this.rowid).pipe(
      tap((response: any) => {
        // Se for a primeira página, limpa os dados da tabela
        if (this.filterData.page === 1) {
          this.tableData = [];
        }
    
        // Adiciona os itens retornados à tabela
        if (response.items) {
          this.tableData.push(...response.items);
        }
      })
    ).subscribe((response: any) => {
      // Atualiza a variável de controle se há mais itens a serem carregados
      this.hasMore$ = response.hasNext;
    });
  }
    

}
