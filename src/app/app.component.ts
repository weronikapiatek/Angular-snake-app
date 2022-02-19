import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',  
    styleUrls: ['./app.component.css']
})



export class AppComponent {

    toggleScreen = true;
    playerName: string
    playerEmail: string

    outputEmail: string;
    outputName: string;

    onSubmit(ngf: NgForm) {
      if (!ngf.valid) {
          alert("Please input valid values to start the game");
      } else {
        this.toggleScreen = !this.toggleScreen;
        this.outputEmail = this.playerEmail;        // save this to other var otherwise gets resetted
        this.outputName = this.playerName;          // save this to other var otherwise gets resetted
      }
      ngf.resetForm();
    }

    exitGameWithLastScore(userScore: string) {
        this.toggleScreen = !this.toggleScreen;
        console.log("Congratz:", userScore);
    }
}
