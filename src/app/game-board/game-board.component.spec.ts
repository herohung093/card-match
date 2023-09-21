import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';
import { CardComponent } from 'src/app/card/card.component';
import { NUMBER_OF_IMAGES } from 'src/configuration/config'
import { Card } from '../models/card.model';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardComponent, CardComponent]
    });
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cards correctly', () => {
    expect(component.cards.length).toBe(NUMBER_OF_IMAGES * 2);
    expect(component.cards[1].isOpen).toBeFalse();
    expect(component.cards.filter(card => card.id === 1).length).toBe(1);
  });

  it('should shuffle cards', () => {
    const initialCards = [...component.cards];
    component.shuffleCards(component.cards);
    expect(component.cards).not.toEqual(initialCards);
  });

  it('should handle card click', () => {
    const card: Card = { id: 1, image: 'image-url', isOpen: false, isPreviouslyOpened: false };
    component.cardClicked(card);
    expect(card.isOpen).toBeTrue();
    expect(card.isPreviouslyOpened).toBeTrue();
  });

});
