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
import { FileSaverComponent } from './partials/functionality/file-saver/file-saver.component';
import { ViewMediaFileModalComponent } from './partials/modals/media-file/view-media-file-modal/view-media-file-modal.component';
import { EditMediaFileModalComponent } from './partials/modals/media-file/edit-media-file-modal/edit-media-file-modal.component';
import { RootPageComponent } from './pages/root/root-page/root-page.component';
import { PlaylistShowPageComponent } from './pages/playlist/playlist-show-page/playlist-show-page.component';
import { ConfirmModalComponent } from './partials/modals/confirmation/confirm-modal/confirm-modal.component';

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
    EditPlaylistModalComponent,
    FileSaverComponent,
    ViewMediaFileModalComponent,
    EditMediaFileModalComponent,
    RootPageComponent,
    PlaylistShowPageComponent,
    ConfirmModalComponent
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
