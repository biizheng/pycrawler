import requests
import pyqu


def GetQuarter(userData):
    s = requests.Session()

    s.get("http://219.216.69.243:88/mbabest21/CpyLogin.jsp")

    loginResult = s.post(
        "http://219.216.69.243:88/mbabest21/CpyLoginAC.do", data=userData)
    loginResult = pyqu.loginResult(loginResult.text)
    if loginResult == 1 or loginResult == 4:
        return -1

    quarterPage = s.get(
        'http://219.216.69.243:88/mbabest21/CpyResViewAC.do')

    return pyqu.getQuarterCount(quarterPage.text)


def GetTotalRank(session):

    response = session.get(
        "http://219.216.69.243:88/mbabest21/comTotalRankingAC.do?quarter=1&type=Cpy")

    pyqu.getTotalRankData(response.text)

    return


def GenerateUser(userData, tag='NextCompany'):

    # user = {
    #     "cpyEntryCode": "U001-G018-C001",
    #     "cpyPwd": "dss"
    # }

    entryCode = userData["cpyEntryCode"]

    if tag == "NextCompany":
        nextConpanyCode = int(entryCode[-3:]) + 1
        nextConpanyCode = "%03d" % nextConpanyCode
        nextConpanyCode = userData["cpyEntryCode"][:-3] + nextConpanyCode
        userData["cpyEntryCode"] = nextConpanyCode
        pass
    elif tag == "NextGame":
        nextGameCode = int(entryCode[6:9]) + 1
        nextGameCode = "%03d" % nextGameCode
        userData["cpyEntryCode"] = userData["cpyEntryCode"][:6] + \
            nextGameCode + "-C001"
        pass

    return userData


#-----------main-------------------------------


user = {
    "cpyEntryCode": "U001-G018-C001",
    "cpyPwd": "dss"
}

print(GetQuarter(user))
