def func(*data):
    name_map = {}  
    mid_name_count = {} 
    unique_mid_name_names = [] 

    
    for all_name in data:
        mid_name = ''

        
        if len(all_name) == 2 or len(all_name) == 3:
            mid_name = all_name[1]  
        elif len(all_name) == 4 or len(all_name) == 5:
            mid_name = all_name[2]

        name_map[all_name] = mid_name  

      
        if mid_name in mid_name_count:
            mid_name_count[mid_name] += 1
        else:
            mid_name_count[mid_name] = 1

    
    for all_name in data:
        mid_name = name_map[all_name]
        if mid_name_count[mid_name] == 1:
            unique_mid_name_names.append(all_name)  

 
    if unique_mid_name_names:
        print(unique_mid_name_names)  
    else:
        print("沒有")  
