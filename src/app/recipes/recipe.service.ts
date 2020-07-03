import {EventEmitter, Injectable} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingrediente.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

    constructor(private shoppingListService: ShoppingListService) {
    }

    private recipes: Recipe[] = [
        new Recipe(
            'RECIPE 1',
            'Spaghetti al ragù',
            'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'RECIPE 2',
            'Soffritto di palle',
            'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1),
            ]
        ),
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}