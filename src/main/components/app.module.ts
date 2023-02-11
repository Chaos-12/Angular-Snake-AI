import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent } from 'src/main/components';
import { SelectorComponent, HomeComponent, PlayComponent, CreateComponent } from 'src/main/components/modes';
import { BoardComponent, InputListComponent, InputItemComponent, AnimationComponent } from 'src/main/components/common';
import { DistanceCalculator, InputProvider, NetworkBuilder } from 'src/main/utils';
import { PubSubService } from 'src/main/utils';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    HomeComponent,
    PlayComponent,
    CreateComponent,
    BoardComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
