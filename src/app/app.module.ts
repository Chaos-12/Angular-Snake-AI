import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectorComponent } from './selector/selector.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { CreateComponent } from './create/create.component';
import { IaBuilder } from 'src/logic';

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
    AppRoutingModule
  ],
  providers: [
    IaBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
