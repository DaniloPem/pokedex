import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetratoPokemonComponent } from './retrato-pokemon.component';

describe('RetratoPokemonComponent', () => {
  let component: RetratoPokemonComponent;
  let fixture: ComponentFixture<RetratoPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetratoPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetratoPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
