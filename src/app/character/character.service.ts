import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from './character.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  character = new BehaviorSubject<Character[]>([])

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get('../assets/characters.json');
  }
}
