def get_number(index):

    dp = [0]  

    for i in range(1, index + 1):
        if i % 3 == 0:
            dp.append(dp[i - 1] - 1)
        else:
            dp.append(dp[i - 1] + 4)


    print(dp[index])

