// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {GameComponent} from '../game/game.component'
import {NgxSnakeModule} from 'ngx-snake';
import {HotkeyModule} from 'angular2-hotkeys';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HotkeyModule.forRoot(),
    NgxSnakeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

