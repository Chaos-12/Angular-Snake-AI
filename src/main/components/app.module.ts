import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent } from 'src/main/components';
import { SelectorComponent, HomeComponent, PlayComponent, CreateComponent } from 'src/main/components/modes';
import { BoardLogic, SnakeLogic, PubSubService, IdService, RobotLogic, BrainLogic, NeuronLogic, InputLogic, PositionLogic, PlayerLogic } from 'src/main/services';
import { RobotComponent } from 'src/main/components/cards/robot/robot.component';
import { AnimationComponent, BoardViewComponent, InformationComponent, InputComponent, UserControlsComponent } from 'src/main/components/views';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    HomeComponent,
    PlayComponent,
    CreateComponent,
    RobotComponent,
    BoardViewComponent,
    UserControlsComponent,
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
    PlayerLogic,
    BoardLogic,
    SnakeLogic,
    RobotLogic,
    BrainLogic,
    NeuronLogic,
    InputLogic,
    PositionLogic,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
