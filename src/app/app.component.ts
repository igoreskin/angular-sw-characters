import { Component, OnInit, OnDestroy } from '@angular/core';
import { Howl } from 'howler';

import { Character } from './character/character.model';
import { Subscription } from 'rxjs';
import { CharacterService } from './character/character.service';
import { SourceNode } from 'source-list-map';

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

  sound = new Howl({src: ['../assets/Battles_Endor_Fight_Theme_Loop.mp3'], volume: 0.4})

  ngOnInit() {
    this.charSub = this.characterService.getCharacters()
    .subscribe(res => {
      this.characters = res['characters'];
      console.log(res['characters'])
    });
    this.sound.play();
    this.sound.on('end', () => this.sound.play()); // this line makes it play indefinitely 
  }

  ngOnDestroy() {
    this.charSub.unsubscribe();
  }
}
