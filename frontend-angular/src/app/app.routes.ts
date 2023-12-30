import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CardEditorComponent } from './card-editor/card-editor.component';

export const routes: Routes = [
    { path: '', redirectTo: '/cards', pathMatch: 'full' },
    { path: 'cards', component: CardListComponent },
    { path: 'cards/add', component: CardEditorComponent },
    { path: 'cards/edit/:id', component: CardEditorComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }