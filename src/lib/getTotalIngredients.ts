import {Beer, Ingredient} from '../models/Beer';

export const getTotalIngredientsMap = (beer: Beer) => {
  const ingredientMap = new Map<'malt' | 'hops', number>();

  for (const ingredient of Object.keys(beer.ingredients)) {
    if (
      typeof beer.ingredients[ingredient as keyof typeof beer.ingredients] ===
      'string'
    ) {
      continue;
    }

    const total = (
      beer.ingredients[
        ingredient as keyof typeof beer.ingredients
      ] as Ingredient[]
    ).reduce((a, b) => a + b.amount.value, 0);

    ingredientMap.set(ingredient as 'malt' | 'hops', total);
  }

  return ingredientMap;
};
