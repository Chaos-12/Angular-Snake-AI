import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent } from 'src/main/components';
import { RobotComponent } from 'src/main/components/cards';
import { BoardComponent, InputListComponent, InputItemComponent, AnimationComponent } from 'src/main/components/common';
import { SelectorComponent, HomeComponent, PlayComponent, CreateComponent } from 'src/main/components/modes';
import { InputProvider, NetworkBuilder } from 'src/main/utils';
import { IdService, PubSubService } from 'src/main/services';
import { RobotLogic, BoardLogic, SnakeLogic } from 'src/main/logic';

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
    PubSubService,
    IdService,
    BoardLogic,
    SnakeLogic,
    RobotLogic,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
