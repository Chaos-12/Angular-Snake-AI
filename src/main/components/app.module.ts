import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent } from 'src/main/components';
import { SelectorComponent, HomeComponent, PlayComponent, CreateComponent } from 'src/main/components/modes';
import { BoardComponent, InputListComponent, InputItemComponent, AnimationComponent } from 'src/main/components/common';
import { DistanceCalculator, InputProvider, NetworkBuilder } from 'src/main/utils';
import { IdService, PubSubService } from 'src/main/utils';
import { RobotLogicImpl, BoardLogicImpl, SnakeLogicImpl } from 'src/main/logicImpl';
import { RobotLogic, BoardLogic, SnakeLogic } from 'src/main/logic';
import { RobotComponent } from './cards';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    HomeComponent,
    PlayComponent,
    CreateComponent,
    BoardComponent,
    RobotComponent,
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
    DistanceCalculator,
    PubSubService,
    IdService,
    BoardLogicImpl,
    {provide: BoardLogic, useExisting: BoardLogicImpl},
    SnakeLogicImpl,
    {provide: SnakeLogic, useExisting: SnakeLogicImpl},
    RobotLogicImpl,
    {provide: RobotLogic, useExisting: RobotLogicImpl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
