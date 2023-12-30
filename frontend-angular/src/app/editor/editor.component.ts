import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-editor',
	standalone: true,
	imports: [],
	templateUrl: './editor.component.html',
	styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
	id: string = "";

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.id = params['id']; 
			console.log('id:', this.id);
		});
	}
}
