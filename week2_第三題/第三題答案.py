def func(*data):
    name_map = {}  
    mid_names = []  

    for all_name in data:
        mid_name = all_name[1:]  
        name_map[all_name] = mid_name  
        mid_names.append(mid_name)  

    result = []  

    for all_name, mid_name in name_map.items():
        is_unique = True  


        for char in mid_name:
            for other_mid_name in mid_names:
                if other_mid_name != mid_name and char in other_mid_name:
                    is_unique = False  
                    break
            if not is_unique:
                break  

        if is_unique:
            result.append(all_name)

    if not result:
        print("沒有")
    else:
        print(result)

    return result