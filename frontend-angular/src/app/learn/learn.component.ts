import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent {
  listId: string = "";
  cardId: string = "";

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			console.log('listId:', this.listId);
      console.log('cardId:', this.cardId);
		});
	}
}
