import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent, SelectorComponent, HomeComponent, PlayComponent, CreateComponent, BoardComponent, InputComponent, AnimationComponent } from 'src/main/app';
import { InputProvider, ToleranceManager } from 'src/main/logic';
import { PubSubService } from 'src/main/utils';
import { AiComponent } from './ai/ai.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    HomeComponent,
    PlayComponent,
    CreateComponent,
    BoardComponent,
    InputComponent,
    AnimationComponent,
    AiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ToleranceManager,
    InputProvider,
    PubSubService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
