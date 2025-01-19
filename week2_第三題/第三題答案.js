function func(...data) {
  let nameMap = new Map(); // 用來存儲姓名與中間名的對應關係
  let midNameCount = new Map(); // 用來統計每個中間名出現的次數
  let uniqueMidNameNames = []; // 用來存儲中間名沒有重複的姓名

  // 遍歷每個姓名，將姓名的中間名存進 Map 中
  data.forEach((allName) => {
    let midName;

    // 判斷姓名長度，提取中間名
    if (allName.length === 2 || allName.length === 3) {
      midName = allName.slice(1, 2); // 姓名長度為2或3，取第二個字作為中間名
    } else if (allName.length === 4 || allName.length === 5) {
      midName = allName.slice(2, 3); // 姓名長度大於2，取第三個字作為中間名
    }

    nameMap.set(allName, midName); // 將姓名與中間名存入Map中

    // 更新中間名的統計
    midNameCount.set(midName, (midNameCount.get(midName) || 0) + 1);
  });

  // 找出中間名只出現一次的姓名
  for (let i = 0; i < data.length; i++) {
    let allName = data[i];
    let midName = nameMap.get(allName);
    if (midNameCount.get(midName) === 1) {
      uniqueMidNameNames.push(allName); // 只有當中間名出現一次時，將姓名加入結果陣列
    }
  }

  // 如果有符合條件的姓名，打印這些姓名；否則打印 "沒有"
  if (uniqueMidNameNames.length > 0) {
    console.log(uniqueMidNameNames); // 打印出中間名沒有重複的所有姓名
  } else {
    console.log("沒有"); // 如果沒有符合條件的姓名，打印 "沒有"
  }
}
