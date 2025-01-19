function func(...data) {
  let nameMap = new Map(); // 用來存儲每個人的姓名與中間名的對應關係
  let midNames = []; // 用來存儲所有人的中間名

  // 遍歷每個姓名
  data.forEach((allName) => {
    let midName = allName.slice(1); // 去掉姓氏，剩下中間名
    nameMap.set(allName, midName); // 將原名字作為key(allName)，中間名作為value(midName)存入 Map
    midNames.push(midName); // 存儲所有中間名
  });

  // 過濾掉有重複字符的姓名
  let result = []; // 用來存符合條件的姓名

  nameMap.forEach((midName, allName) => {
    let isUnique = true; // 先假設每個人的中間名都沒有重複字符

    // 檢查該中間名的每個字符是否與其他中間名有重複字符
    for (let char of midName) {
      for (let otherMidName of midNames) {
        if (otherMidName !== midName && otherMidName.includes(char)) {
          isUnique = false; // 發現重複字符，標記為不符合條件
          break;
        }
      }
      if (!isUnique) break; // 如果發現重複字符，直接跳出內層循環
    }

    // 若isUnique仍然是true，則代表該名符合條件
    if (isUnique) {
      result.push(allName);
    }
  });

  // 如果結果為空，則表示沒有符合條件的姓名
  if (result.length === 0) {
    console.log("沒有沒有");
  } else {
    console.log(result);
  }

  return result;
}
