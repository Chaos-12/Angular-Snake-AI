import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AppComponent, SelectorComponent, HomeComponent, PlayComponent, CreateComponent } from 'src/main/app';
import { BoardDrawer } from 'src/main/utils';
import { InputProvider, ToleranceManager } from 'src/main/logic';

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
    ToleranceManager,
    BoardDrawer,
    InputProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
