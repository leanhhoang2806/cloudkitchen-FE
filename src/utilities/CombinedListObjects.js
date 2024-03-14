const mergeDishAndDiscountDish = (dishes, discountedDishes) => {
  const filteredDiscountedDishes = discountedDishes.filter(
    (data) => data !== null && data !== undefined && data !== '',
  )
  const mergedList = []
  const mapDiscountedDish = filteredDiscountedDishes.reduce(
    (acc, obj) => acc.set(obj.dish_id, obj),
    new Map(),
  )
  for (const dish of dishes) {
    const dishId = dish.id
    if (mapDiscountedDish.has(dishId)) {
      const mergeItem = {
        ...dish,
        ...mapDiscountedDish.get(dishId),
        dish_id: dish.id,
        discount_id: mapDiscountedDish.get(dishId).id,
      }
      mergedList.push(mergeItem)
      continue
    }
    mergedList.push({ ...dish, dish_id: dish.id })
  }
  return mergedList
}

export { mergeDishAndDiscountDish }
