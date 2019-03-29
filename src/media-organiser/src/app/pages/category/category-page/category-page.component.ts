import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
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
  public selectedCategoryIndex: number = undefined;
  public toDeleteCategoryIndex: number;
  @ViewChild('openConfirmModal') openConfirmModalButton: ElementRef;

  constructor(
    private _categoryService: CategoryService,
    private eRef: ElementRef,
    private _stateService: StateService) { }

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

  deleteCategoryConfirm() {
    this.toDeleteCategoryIndex = this.selectedCategoryIndex;
    this.openConfirmModalButton.nativeElement.click();
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
