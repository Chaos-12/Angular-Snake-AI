import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent, SelectorComponent, HomeComponent, PlayComponent, CreateComponent, BoardComponent } from 'src/main/app';
import { InputProvider, ToleranceManager } from 'src/main/logic';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    HomeComponent,
    PlayComponent,
    CreateComponent,
    BoardComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ToleranceManager,
    InputProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
