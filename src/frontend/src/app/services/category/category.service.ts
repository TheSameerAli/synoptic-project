import { Injectable } from '@angular/core';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[];
  constructor() {
    if (!this.categories) {
      this.categories = [];
    }
  }

  getCategories() {
    return this.categories;
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  add(category: Category) {
    this.categories.push(category);
  }

  rename(category: Category, newName: string) {
    const categoryFoundIndex = this.categories.findIndex(c => c.id === category.id);
    this.categories[categoryFoundIndex].name = newName;
  }

  delete(category: Category) {
    const categoryFoundIndex = this.categories.findIndex(c => c.id === category.id);
    this.categories.splice(categoryFoundIndex, 1);
  }
}
