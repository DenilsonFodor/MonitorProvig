import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { MensagemService } from '../shared/service/mensagem.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.css'
})
export class MensagemComponent implements OnInit {

  items$!: Observable<any>;

  rowid!:string;
  data:any;
  json:any;

  pageActions : PoPageAction[] = [

  ];

  constructor(private service: MensagemService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { rowid } = params;
      this.rowid = rowid;
      this.updateData();
    });
        
  }

  private updateData() {
    /*
    let obs$ = this.service.getOne(this.rowid);
    this.items$ = obs$.pipe(pluck('items'));
    this.items$.subscribe((result: any) => {
      this.data = result[0];
      //this.json = JSON.stringify(JSON.parse(this.data.dados), null, '\t');
      //console.dir(this.json);
    });
    */

    // Obtém os dados do serviço com base no rowid
    const response$ = this.service.getOne(this.rowid);
  
    // Processa a resposta e extrai os itens manualmente
    response$.subscribe((response: any) => {
      
      if (response && response.items && response.items.length > 0) {
        this.data = response.items[0];
        
      }
    });
  }

  onBack() {
    window.history.back();
  }


}
