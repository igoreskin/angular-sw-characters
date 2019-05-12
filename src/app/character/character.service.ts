import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Character } from './character.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  characters = new BehaviorSubject<Character[]>([]);
  // forkjoin = new Observable<any>();

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('../assets/characters.json')
    .subscribe(res => {
      this.characters.next(res['characters']);
    });
  }

  getCharacters() {
    return this.http.get('../assets/characters.json');
  }

  fetchMovies(url: string) {
    let movies = [];
    return this.http.get(url).pipe(
      map(char => {
        char['films'].forEach(movieUrl => {
          movies.push(this.http.get(movieUrl));
        })
        return forkJoin(movies);
      })
    )
  }
}
