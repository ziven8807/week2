function getNumber(index) {
  let dp = [0]; // index[0] = 0, 初始值為 0

  // 從 index[1] 開始計算直到目標 index
  for (let i = 1; i <= index; i++) {
    if (i % 3 === 0) {
      // 如果是 3 的倍數，進行減 1 操作
      dp[i] = dp[i - 1] - 1;
    } else {
      // 否則，每次加 4
      dp[i] = dp[i - 1] + 4;
    }
  }
  console.log(dp[index]);
}
