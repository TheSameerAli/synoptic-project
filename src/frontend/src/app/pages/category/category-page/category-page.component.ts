import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../models/category';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  public categories: Category[];
  constructor(
    private _categoryService: CategoryService,
    private eRef: ElementRef,
    private _stateService: StateService) { }
  public selectedCategoryIndex: number = undefined;

  ngOnInit() {
    this.categories = this._categoryService.getCategories();
    this._stateService.stateLoaded.subscribe(() => {
      this.updateCategoyList();
    });
  }

  updateCategoyList() {
    this.categories = this._categoryService.getCategories();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      if (event.path[2].localName === 'thead') {
        this.resetSelectedCategory();
      }
    } else {
      this.resetSelectedCategory();
    }
  }

  selectCategory(index) {
    this.selectedCategoryIndex = index;
  }

  deleteCategory() {
    this._categoryService.delete(this.categories[this.selectedCategoryIndex]);
    this.resetSelectedCategory();
    this.updateCategoyList();
  }

  resetSelectedCategory() {
    this.selectedCategoryIndex = undefined;
  }
}
