import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators  } from '@angular/forms'

@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.styl']
})
export class TransacaoComponent implements OnInit {
  transacaoForm: FormGroup;
  actions = ['Compra', 'Venda']
  transacaos = localStorage.getItem('transacaos') ? JSON.parse(localStorage.getItem('transacaos')) : []
  submitted = false
  totalpreco = 0
  constructor(private fb: FormBuilder) {}

  calculateTransacao() {
    this.totalpreco = this.transacaos.reduce((acc, elem, index, array) => {
      const preco = parseFloat(elem.preco.replace('.', ','))
      const operator = (elem.transacao === 'Compra' ? '-': '+')
      return (operator === '-') ? acc - preco : acc + preco
    }, 0)
  }

  ngOnInit() {  
    this.transacaoForm = this.fb.group({
      transacao: ['Compra', Validators.required],
      name:  ['', Validators.required],
      preco: ['', Validators.required]
    })
    localStorage.setItem('transacaos', JSON.stringify(this.transacaos))
    
    this.calculateTransacao()
  }
  
  get validate() { return this.transacaoForm.controls }
  
  onSubmit() {
    this.submitted = true
    if(this.transacaoForm.invalid) return;

    this.transacaos.unshift(this.transacaoForm.value)
    localStorage.setItem('transacaos', JSON.stringify(this.transacaos))
   
    this.calculateTransacao()
    this.transacaoForm.reset()
  }
}
