import { ContextMenuModule } from 'ngx-contextmenu';
import { routes } from './../routes/routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { SidenavComponent } from './partials/nav/sidenav/sidenav.component';
import { TopnavComponent } from './partials/nav/topnav/topnav.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { FileListviewComponent } from './components/file-explorer/file-listview/file-listview.component';
import { FileGridviewComponent } from './components/file-explorer/file-gridview/file-gridview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SidenavComponent,
    TopnavComponent,
    FileExplorerComponent,
    FileListviewComponent,
    FileGridviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
