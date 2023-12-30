import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  // Injectez le service CardService dans le constructeur
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    // Utilisez les méthodes du service pour obtenir des cartes mémoire depuis le backend
    this.cardService.getCards().subscribe(cards => {
      // Faites quelque chose avec les cartes récupérées (par exemple, les stocker dans une variable du composant)
    });
  }
}
