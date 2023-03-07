import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent } from 'src/main/components';
import { RobotComponent, RobotOldComponent } from 'src/main/components/cards';
import { BoardComponent, InputListComponent, InputItemComponent, AnimationComponent, InformationComponent, InputComponent } from 'src/main/components/common';
import { SelectorComponent, HomeComponent, PlayComponent, CreateComponent } from 'src/main/components/modes';
import { InputProvider, NetworkBuilder } from 'src/main/utils';
import { RobotOldLogic, BoardLogic, SnakeLogic, PubSubService, IdService, RobotLogic, BrainLogic, NeuronLogic, InputLogic } from 'src/main/services';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    HomeComponent,
    PlayComponent,
    CreateComponent,
    BoardComponent,
    RobotComponent,
    InformationComponent,
    RobotOldComponent,
    InputComponent,
    InputItemComponent,
    AnimationComponent,
    InputListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    NetworkBuilder,
    InputProvider,
    PubSubService,
    IdService,
    BoardLogic,
    SnakeLogic,
    RobotLogic,
    BrainLogic,
    NeuronLogic,
    InputLogic,
    RobotOldLogic,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
