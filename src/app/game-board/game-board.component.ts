import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { TimerComponent } from 'src/app/timer/timer.component';
import { TIMER, COLUMNS, NUMBER_OF_IMAGES, PENALTY_TIME } from 'src/configuration/config'

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  cards: Card[] = [];
  selectedCards: Card[] = [];
  timer: number = TIMER;
  timeFinishedGame: number = -1;
  gameStarted: boolean = false;
  gameFinished: boolean = false;
  columns = COLUMNS;
  endGameMessage: string = '';

  @ViewChild(TimerComponent) timerComponent: TimerComponent = new TimerComponent();

  ngOnInit() {
    this.initializeCards();
  }

  initializeCards() {
    const numberOfImages = NUMBER_OF_IMAGES;
    const cardDataA: Card[] = [];

    let idIndex = 1;
    let imageIndex = 1;

    while (idIndex <= numberOfImages * 2) {
      imageIndex = imageIndex > numberOfImages ? 1 : imageIndex;
      const imageUrl = `../../assets/card-images/${imageIndex}.svg`;
      cardDataA.push({ id: idIndex, image: imageUrl, isOpen: false, isPreviouslyOpened: false });
      idIndex++;
      imageIndex++;
    }

    this.cards = [...cardDataA];
    this.shuffleCards(this.cards);
  }

  shuffleCards(cards: Card[]) {
    let currentIndex = cards.length;
    let temporaryValue: Card;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
  }

  startGame() {
    this.gameStarted = true;
  }

  cardClicked(card: Card) {
    if (this.gameFinished || card.isOpen || this.selectedCards.length >= 2) {
      return;
    }

    this.startGame();

    if (card.isPreviouslyOpened) {
      this.timerComponent.reduceTimer(PENALTY_TIME);
      card.isPreviouslyOpened = false;
    } else {
      card.isPreviouslyOpened = true;
    }

    card.isOpen = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      const [firstCard, secondCard] = this.selectedCards;

      if (firstCard.image === secondCard.image) {
        this.selectedCards = [];

        if (this.cards.every((c) => c.isOpen)) {
          this.gameFinished = true;
          this.timerComponent.stopTimer();
          this.timeFinishedGame = this.timerComponent.timer;
        }
      } else {
        setTimeout(() => {
          this.selectedCards.forEach((c) => (c.isOpen = false));
          this.selectedCards = [];
        }, 1000);
      }
    }
  }

  resetGame() {
    this.gameStarted = false;
    this.gameFinished = false;
    this.timeFinishedGame = -1;
    this.timer = TIMER;
    this.initializeCards();
  }

  handleTimeOutEvent() {
    this.gameFinished = true;
  }
}
