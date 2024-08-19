import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    PoTemplatesModule
  ],
  providers: [
    {provide: APP_BASE_HREF,
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
