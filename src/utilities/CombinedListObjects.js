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

export { mergeLists }
