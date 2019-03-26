import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../../services/category/category.service';
import { Category } from '../../../../models/category';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css']
})
export class AddCategoryModalComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  public categoryName: string;
  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
  }

  addCategory() {
    const category = new Category(this.categoryName);
    this._categoryService.add(category);
    this.update.emit();
    this.resetInput();
  }

  resetInput() {
    this.categoryName = '';
  }

}
