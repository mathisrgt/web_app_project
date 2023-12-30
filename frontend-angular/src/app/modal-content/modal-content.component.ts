import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Fenêtre Modale</h4>
      <button type="button" class="close" (click)="activeModal.dismiss('Cross click')">
        <span>&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Contenu de la fenêtre modale pour {{ name }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Fermer</button>
    </div>
  `
})

export class ModalContentComponent {
  @Input() name: string = '';

  constructor(public activeModal: NgbActiveModal) {}
}
