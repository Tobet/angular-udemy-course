import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-recipes-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[];
    subscription: Subscription;

    constructor(private recipeService: RecipeService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.subscription = this.recipeService.recipesChanged.subscribe(
            (recipes: Recipe[]) => this.recipes = recipes
        );

        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route})
            .catch(err => console.error(err));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
