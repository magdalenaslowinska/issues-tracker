import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { IssuesService } from './services/issues-service';
import { IssuesDataProvider } from './services/issues-data-provider-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    IssuesListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [IssuesService, IssuesDataProvider, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
