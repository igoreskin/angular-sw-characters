import { Component, OnInit, OnDestroy } from '@angular/core';

import { CharacterService } from './character.service';
import { Character } from './character.model';
import { Movie } from './movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { rotateIn } from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  animations: [
    trigger('rotateIn', [transition('* => *', useAnimation(rotateIn))])
  ],
})

export class CharacterComponent implements OnInit, OnDestroy {
  rotateIn: any;
  id: string;
  character: Character;
  movies: Movie[];
  subRoute: Subscription;
  subChar: Subscription;
  subMovie: Subscription;
  subFork: Subscription;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private characterService: CharacterService) { }

  ngOnInit() {
    this.subRoute = this.activatedRoute.params
    .subscribe(params => {
      this.id = params['id'];
      this.subChar = this.characterService.characters
      .subscribe(char => {
        this.character = char[this.id];
        this.subMovie = this.characterService.fetchMovies(this.character.url)
        .subscribe(forkjoin => {
          this.subFork = forkjoin.subscribe(movies => {
            this.movies = movies;
          })
        })
      })
    })
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
    this.subChar.unsubscribe();
    this.subMovie.unsubscribe();
    this.subFork.unsubscribe();
  }

}
