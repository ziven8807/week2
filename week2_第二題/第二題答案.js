const consultants = [
  { name: "John", rate: 4.5, price: 1000 },
  { name: "Bob", rate: 3, price: 1200 },
  { name: "Jenny", rate: 3.8, price: 800 },
];

// 儲存顧問的預定時間，這個變數應該是跨多次調用保持的
let bookings = {};

function book(consultants, hour, duration, criteria) {
  // 初始化顧問的預定時間
  for (let consultant of consultants) {
    if (!bookings[consultant.name]) {
      bookings[consultant.name] = [];
    }
  }

  // 根據選擇標準 (criteria) 進行排序
  if (criteria === "price") {
    consultants.sort((a, b) => a.price - b.price); // 按價格升序排序
  } else if (criteria === "rate") {
    consultants.sort((a, b) => b.rate - a.rate); // 按評價降序排序
  }

  // 遍歷顧問，選擇符合條件的顧問
  for (let consultant of consultants) {
    let isAvailable = true;

    // 檢查顧問是否有時間重疊
    for (let [existingStart, existingEnd] of bookings[consultant.name]) {
      if (hour < existingEnd && hour + duration > existingStart) {
        // 有重疊時間，顧問不可用
        isAvailable = false;
        break;
      }
    }

    // 如果顧問有空，則進行預定並直接印出結果
    if (isAvailable) {
      bookings[consultant.name].push([hour, hour + duration]); // 更新預定時間
      console.log(`${consultant.name}`);
      return consultant.name;
    }
  }

  // 如果沒有找到可用的顧問，直接印出結果
  console.log("No Service");
  return "No Service";
}
