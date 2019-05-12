import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from  './character/character.component';
import { LaunchComponent } from './launch/launch.component';

const routes: Routes = [
  { path: '', component: LaunchComponent },
  { path: ':id', component: CharacterComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
