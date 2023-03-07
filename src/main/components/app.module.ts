import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent } from 'src/main/components';
import { RobotComponent } from 'src/main/components/cards';
import { AnimationComponent } from 'src/main/components/actions';
import { SelectorComponent, HomeComponent, PlayComponent, CreateComponent } from 'src/main/components/modes';
import { BoardLogic, SnakeLogic, PubSubService, IdService, RobotLogic, BrainLogic, NeuronLogic, InputLogic } from 'src/main/services';
import { BoardViewComponent, InformationComponent, InputComponent } from './views';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    HomeComponent,
    PlayComponent,
    CreateComponent,
    BoardViewComponent,
    RobotComponent,
    InformationComponent,
    InputComponent,
    AnimationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    PubSubService,
    IdService,
    BoardLogic,
    SnakeLogic,
    RobotLogic,
    BrainLogic,
    NeuronLogic,
    InputLogic,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
