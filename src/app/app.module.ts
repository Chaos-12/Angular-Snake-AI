import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectorComponent } from './selector/selector.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { CreateComponent } from './create/create.component';
import { BoardDrawer, IaBuilder } from 'src/utils';

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
    IaBuilder,
    BoardDrawer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
