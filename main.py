import scrawer as scraw
import json

user = {
    "cpyEntryCode": "U001-G018-C001",
    "cpyPwd": "dss"
}

totalRank = {}

while(user["cpyEntryCode"] != "U001-G028-C001"):

    # session
    LoginResult = scraw.Login(user)

    if LoginResult == -1:
        user = scraw.GenerateUser(user, 'NextGame')

    else:
        game = user["cpyEntryCode"][5:9]
        quarter = scraw.GetQuarter(LoginResult)
        dataTables = {}
        for i in range(1, quarter):
            key_quarter = 'quarter%d' % i
            dataTables[key_quarter] = scraw.GetTotalRank(LoginResult, i)
        totalRank[game] = dataTables
        user = scraw.GenerateUser(user, 'NextGame')

    print(user["cpyEntryCode"], "\n")


with open('jsonfile.json', 'w') as f:
    json.dump(totalRank, f)
    print(f.read())
