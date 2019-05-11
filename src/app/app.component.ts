import { Component, OnInit, OnDestroy } from '@angular/core';

import { Character } from './character/character.model';
import { Subscription } from 'rxjs';
import { CharacterService } from './character/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-sw-characters';
  characters: Character[] = [];
  images: [
    '../images/luke.jpg', '../images/darth.jpg', '../images/obi.jpg', '../images/r2d2.jpg'
  ];
  
  private charSub: Subscription;

  constructor(private characterService: CharacterService){}

  ngOnInit() {
    this.charSub = this.characterService.getCharacters()
    .subscribe(res => {
      this.characters = res['characters'];
      console.log(res['characters'])
    });
  }

  ngOnDestroy() {
    this.charSub.unsubscribe();
  }
}
