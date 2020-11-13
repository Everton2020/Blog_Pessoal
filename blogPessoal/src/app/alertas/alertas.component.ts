import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  @Input() message: string
  @Input() type = 'success'

  constructor( public modal: BsModalService ) { }

  ngOnInit(): void {
  }
  onClose()
  {
    this.modal.hide()
  }
}
