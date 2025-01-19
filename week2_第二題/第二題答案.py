consultants = [
    {"name": "John", "rate": 4.5, "price": 1000},
    {"name": "Bob", "rate": 3, "price": 1200},
    {"name": "Jenny", "rate": 3.8, "price": 800},
]


bookings = {}

def book(consultants, hour, duration, criteria):
   
    for consultant in consultants:
        if consultant["name"] not in bookings:
            bookings[consultant["name"]] = []

    
    if criteria == "price":
        consultants.sort(key=lambda x: x["price"])  
    elif criteria == "rate":
        consultants.sort(key=lambda x: x["rate"], reverse=True)  


    for consultant in consultants:
        is_available = True

        for existing_start, existing_end in bookings[consultant["name"]]:
            if hour < existing_end and hour + duration > existing_start:
         
                is_available = False
                break


        if is_available:
            bookings[consultant["name"]].append([hour, hour + duration])  
            print(f'{consultant["name"]}')
            return consultant["name"]


    print('No Service')
    return "No Service"

