import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-pokemon',
  templateUrl: './detalhe-pokemon.component.html',
  styleUrls: ['./detalhe-pokemon.component.scss'],
})
export class DetalhePokemonComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate() {
    this.router.navigate(['']);
  }
}
