import {EventEmitter, Injectable} from '@angular/core';

import {Ingredient} from '../shared/ingrediente.model';

@Injectable()
export class ShoppingListService {

    ingredientsChanged: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(newIngredient: Ingredient) {

        const searchedIngredient: Ingredient = this.searchIngredientInsideList(newIngredient.name);

        if (!searchedIngredient) {
            this.ingredients.push(newIngredient);
            this.ingredientsChanged.emit(this.getIngredients());
        } else {
            searchedIngredient.amount += newIngredient.amount;
            console.log(searchedIngredient.amount);
        }
    }

    addIngredients(newIngredients: Ingredient[]) {

        newIngredients.forEach((newIng: Ingredient) => {

            const searchedIngredient: Ingredient = this.searchIngredientInsideList(newIng.name);

            if (searchedIngredient) {
                searchedIngredient.amount += newIng.amount;
            } else {
                this.ingredients.push(newIng);
            }
        });

        this.ingredientsChanged.emit(this.getIngredients());
    }

    deleteIngredient(ingredientName: string) {

        const ingredientIndex: number = this.ingredients.findIndex((ing: Ingredient) => {
            return ing.name === ingredientName;
        });

        if (ingredientIndex < 0) {
            console.log('Ingredient to delete not found');
        }

        this.ingredients.splice(ingredientIndex, 1);
        this.ingredientsChanged.emit(this.getIngredients());
    }

    private searchIngredientInsideList(ingredientName: string): Ingredient | undefined {

        return this.ingredients.find((ingredient: Ingredient) => {
            return ingredientName.toLowerCase() === ingredient.name.toLowerCase();
        });
    }
}