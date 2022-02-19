import {Component, ViewChild, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NgxSnakeComponent} from 'ngx-snake';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';


@Component({
    selector: 'game-component',
    templateUrl: './game.component.html',  
    styleUrls: ['./game.component.css']
})



export class GameComponent {

    @Input() renderGame = false;
    @Input() playerName = "";
    @Input() playerEmail = "";

    @Output() exitScoreEmitter = new EventEmitter<string>();

    @ViewChild('game')

    private _snake: NgxSnakeComponent;
    private _gameIdle: boolean = true;

    timePlayedSec: number = 0;
    currentScore: number = 0;
    highScore: number = this.currentScore;
    timerInterval = setInterval(()=>{}, 0); // type?


    constructor(private _hotkeysService: HotkeysService) {
        this._addHotkeys();
    }

    //
    // game 
    //
    exitGame() {
        this.resetGame();
        this.exitScoreEmitter.emit(`user's ${this.playerName} best score was ${this.highScore} points`);
    } 

    resetGame() {
        this._snake.actionReset();
        this.resetTimer();
        this.updateHighscore(this.currentScore);
        this.currentScore = 0;
        this._gameIdle = true;
    }

    onGrow() {
        this.currentScore++;
    }

    onGameOver() {
        alert('Game over!');
        this.resetGame();
    }

    updateHighscore(score: number) {
        if (score > this.highScore) {
            this.highScore = score;
        }
    }

    //
    // controls
    //
    private _addHotkeys() {
        this._hotkeysService.add(new Hotkey('up', (event: KeyboardEvent): boolean => {
            this._snake.actionUp();
            return false; // Prevent bubbling
        }));

        this._hotkeysService.add(new Hotkey('left', (event: KeyboardEvent): boolean => {
            this._snake.actionLeft();
            return false; // Prevent bubbling
        }));

        this._hotkeysService.add(new Hotkey('down', (event: KeyboardEvent): boolean => {
            this._snake.actionDown();
            return false; // Prevent bubbling
        }));

        this._hotkeysService.add(new Hotkey('right', (event: KeyboardEvent): boolean => {
            this._snake.actionRight();
            return false; // Prevent bubbling
        }));
        this._hotkeysService.add(new Hotkey('space', (event: KeyboardEvent): boolean => {
            if (this._gameIdle) {
                this._snake.actionStart();
                this.startTimer();
                this._gameIdle = false;
            } else {
                this._snake.actionStop();
                this.pauseTimer();
                this._gameIdle = true;
            }
            return false;
        }));
    }

    //
    // timer functions 
    //
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timePlayedSec++;
        }, 1000) // miliseconds == 1 second
    }

    pauseTimer() {
        clearInterval(this.timerInterval);
    }

    resetTimer() {
        this.pauseTimer();
        this.timePlayedSec = 0;
    }
}
