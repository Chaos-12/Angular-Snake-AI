import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectorComponent } from './selector/selector.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { CreateComponent } from './create/create.component';
import { BoardDrawer } from 'src/utils';
import { NetworkBuilder } from 'src/logic';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    HomeComponent,
    PlayComponent,
    CreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    NetworkBuilder,
    BoardDrawer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
