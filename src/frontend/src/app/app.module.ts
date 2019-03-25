import { ContextMenuModule } from 'ngx-contextmenu';
import { routes } from './../routes/routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { SidenavComponent } from './partials/nav/sidenav/sidenav.component';
import { TopnavComponent } from './partials/nav/topnav/topnav.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { FileListviewComponent } from './components/file-explorer/file-listview/file-listview.component';
import { FileGridviewComponent } from './components/file-explorer/file-gridview/file-gridview.component';
import { FileUploadModalComponent } from './partials/modals/file-upload-modal/file-upload-modal.component';
import { FolderUploadModalComponent } from './partials/modals/folder-upload-modal/folder-upload-modal.component';
import { CategoryPageComponent } from './pages/category/category-page/category-page.component';
import { PlaylistPageComponent } from './pages/playlist/playlist-page/playlist-page.component';
import { AddCategoryModalComponent } from './partials/modals/categories/add-category-modal/add-category-modal.component';
import { EditCategoryModalComponent } from './partials/modals/categories/edit-category-modal/edit-category-modal.component';
import { AddPlaylistModalComponent } from './partials/modals/playlists/add-playlist-modal/add-playlist-modal.component';
import { EditPlaylistModalComponent } from './partials/modals/playlists/edit-playlist-modal/edit-playlist-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SidenavComponent,
    TopnavComponent,
    FileExplorerComponent,
    FileListviewComponent,
    FileGridviewComponent,
    FileUploadModalComponent,
    FolderUploadModalComponent,
    CategoryPageComponent,
    PlaylistPageComponent,
    AddCategoryModalComponent,
    EditCategoryModalComponent,
    AddPlaylistModalComponent,
    EditPlaylistModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
