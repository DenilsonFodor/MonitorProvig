import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoSelectOption, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { MensagemService } from '../shared/service/mensagem.service';
import { Router } from '@angular/router';
import { Observable, pluck, tap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  @ViewChild(PoModalComponent) poModal!: PoModalComponent


  constructor(private service: MensagemService, 
              private router: Router) {}

  textarea:any;
  objAtual:any;
  tpSituacao:any;

  filterData: any = {
    startDate: new Date(),
    endDate: new Date(),
    tipoRegistro: '',
    situacao: '',
    chaveRm: '',
    chaveIris: '',
    page: 1,
    pageSize: 10,
  };

  tipoRegistroOptions: PoSelectOption[] = [
    { label: 'Todos', value: '' },
    { label: 'Adiantamento', value: '1' },
    { label: 'Fatura', value: '0' },
  ];
  
  situacaoOptions: PoSelectOption[] = [
    { label: 'Todas', value: '' },
    { label: 'Pendente', value: 'Pendente' },
    { label: 'Com erros', value: 'Com erros' },
    { label: 'Aguardando Observação', value: 'Aguardando' },
    { label: 'Processado', value: 'Processado' },
    { label: 'Concluido', value: 'Concluido' },
  ];

  tableColumns: PoTableColumn[] = [
    { label: 'Data',
      property: 'dt-integracao',
      type: 'dateTime',
      width: '12%',
    },
    { label: 'Chave RM', property: 'referencia' },
    { label: '#', property: 'sequencia' },
    { label: 'ID Iris', property: 'id-iris' },
    {
      label: 'Tipo',
      property: 'tipo',
      width: '10%',
      type: 'label',
      labels: [
        { label: 'Adiantamento', value: 1 },
        { label: 'Fatura', value: 0 },
      ],
    },
     {
      label: 'Situação',
      property: 'situacao',
      width: '10%',
      type: 'label',
      labels: [
        { label: 'Aguardando Observação', value: 'Aguardando', color: 'color-11' },
        { label: 'Pendente', value: 'Pendente', color: 'color-08' },
        { label: 'Com erros', value: 'Com erros', color: 'color-07' },
        { label: 'Processado', value: 'Processado', color: 'color-11' },
        { label: 'Concluido', value: 'Concluido', color: 'color-11' },
      ],
    },
  ];

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Fechar',
    danger: true
  };

  confirm: PoModalAction = {
    action: this.setObservacao.bind(this),
    label: 'Confirmar'
  };

  tableActions: PoTableAction[] = [
    { label: 'Alterar Observação', action: this.onAtuObs.bind(this) },
    { label: 'Detalhes', action: this.onDetail.bind(this) },
  ];

  tableData: any = [];


  items$!: Observable<any>;
  hasMore$!: Observable<boolean>;
  success$!: Observable<boolean>;

  ngOnInit(): void {
    const savedFilter = localStorage.getItem("filter");
    if (savedFilter) {
      this.filterData = JSON.parse(savedFilter);
    }
    
    const savedTableData = localStorage.getItem("tableData");
    if (savedTableData) {
      this.tableData = JSON.parse(savedTableData);
    }
    
    // Verifica se `tableData` existe e se está vazio
    if (!this.tableData || this.tableData.length === 0) {
      this.updateData();
    }
    
  }

  onUpdate() {
    this.filterData.page = 1;
    this.updateData();
  }

  onAtuObs(args: any) { //DMF
    this.filterData.page = 1;
    this.textarea = args['observacao'];
    this.objAtual = args;
    this.tpSituacao = args['situacao']
    if (this.tpSituacao === 'Aguardando') {
      this.poModal.open();
    };
  }
  
  closeModal() {
    this.poModal.close();
  }

  onShowMore() {
    this.filterData.page++;
    this.updateData();
  }

  private updateData() {

    localStorage.setItem("filter", JSON.stringify(this.filterData));

    this.service.getAll(this.filterData).pipe(
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
    

  onDetail(args: any) {
    localStorage.setItem("tableData", JSON.stringify(this.tableData));
    this.router.navigate(['/mensagem', args['rowid']]);
  }

  setObservacao() {
    this.objAtual['observacao'] = this.textarea; 
    
    let objEntrada:any = {};
    objEntrada["r-rowid"] = this.objAtual.rowid;
    objEntrada["observacao"] = this.textarea;
    
    this.service.setObservacao(objEntrada).subscribe((result) => {
      if(result.sucesso == true) {
        this.onUpdate(); 
      }
      if (result.sucesso == false) {
        alert('Erro no processamento da observação')
      } 
    });
    this.closeModal();

  }

}
