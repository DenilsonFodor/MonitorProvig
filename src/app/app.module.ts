import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: getBaseHref()
    }
  ],
      
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseHref(): string {
  const path = window.location.pathname;
  const i = path.lastIndexOf('/');

  return i >= 0 ? path.substring(0, i + 1) : path;
}
