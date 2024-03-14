const mergeLists = (list1, list2, idField1, idField2) => {
  if (JSON.stringify(list2) === JSON.stringify([''])) {
    return [...list1]
  }
  const mergedList = []

  const mapList2 = new Map(list2.map((item) => [item[idField2], item]))

  for (const item1 of list1) {
    const id = item1[idField1]

    if (mapList2.has(id)) {
      const mergedItem = { ...item1, ...mapList2.get(id) }
      mergedList.push(mergedItem)
    }
  }

  return mergedList
}

const mergeDishAndDiscountDish = (dishes, discountedDishes) => {
    const mergedList = []
    const mapDiscountedDish = discountedDishes.reduce((acc, obj) => acc.set(obj.dish_id, obj), new Map());
    for (const dish of dishes) {
        const dishId = dish.id
        if (mapDiscountedDish.has(dishId)) {
            const mergeItem = { ...dish, ...mapDiscountedDish.get(dishId), dish_id: dish.id, discount_id: mapDiscountedDish.get(dishId).id}
            mergedList.push(mergeItem)
        }
        mergedList.push(dish)
    }
    return mergedList
}

export { mergeLists, mergeDishAndDiscountDish }
