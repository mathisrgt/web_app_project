import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    //this.cardService.getCards().subscribe(cards => { });
  }
}
