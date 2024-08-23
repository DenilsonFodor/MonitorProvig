import { Component, Input, OnInit } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { HistoricoService } from '../shared/service/historico.service';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

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

  constructor(private service: HistoricoService) { }

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

  /*
  private updateData() {
    let obs$ = this.service.getOne(this.rowid);
    this.items$ = obs$.pipe(pluck('items'));
    this.items$.subscribe((result) => {
      if (this.filterData.page == 1) {
        this.tableData = [];
      }

      if (result) {
        result.forEach((el: any) => {
          this.tableData.push(el);
        });
      }
    });

    this.hasMore$ = obs$.pipe(pluck('hasNext'));
  }
  */

  private updateData(): void {
    console.log(this.rowid)
    const obs$ = this.service.getOne(this.rowid);
  
    // Subscrição para manipular os dados da tabela
    obs$.subscribe((response) => {
      const { items, hasNext } = response;
  
      // Atualiza 'items$' com os itens recebidos
      this.items$ = items;
  
      if (this.filterData.page === 1) {
        this.tableData = []; // Reseta a tabela se estiver na primeira página
      }
  
      if (items && Array.isArray(items)) {
        // Adiciona cada item ao 'tableData'
        this.tableData.push(...items);
      }
  
      // Atualiza 'hasMore$' com o valor de 'hasNext'
      this.hasMore$ = hasNext;
    });
  }

}
