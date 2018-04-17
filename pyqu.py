# -*- coding:utf-8 -*-
from pyquery import PyQuery as pq
import sys


def loginResult(htmlPage):

    htm = pq(htmlPage)

    result = htm.find("input:last")

    print(result)

    return 1


def getQuarterCount(htmlPage):

    htm = pq(htmlPage)

    result = htm.find("option:last").val()

    return int(result)


def getTotalRankData(htmlPage):

    htm = pq(htmlPage)

    tbs = htm("table table").eq(1)

    trs = tbs.find('tr').filter(lambda i: i > 0)

    dataTable = []

    for tr in trs.items():
        temp_tr = []
        for index, td in enumerate(tr.find('span').filter('.stylereport11').items()):
            temp_td = td.text()

            if index == 0:
                temp_tr.append(temp_td)
                continue

            if temp_td.rfind('%') != -1:
                temp_td = float(temp_td.rstrip('%'))
                temp_tr.append(round(temp_td / 100.0, 4))
                continue

            if temp_td.find(',') != -1:
                temp_td = temp_td.replace(',', '')
                temp_tr.append(float(temp_td))
                continue

            temp_tr.append(float(temp_td))

        dataTable.append(temp_tr)

    return dataTable


def getDession(htmlPage):

    paln = {}

    # record = {}

    htm = pq(htmlPage)

    result = htm.find("table").children("tr").eq(5).children("td").eq(2)

    plan_and_record = result.children("table")

    plan = plan_and_record("table").eq(0)

    plan = plan.find("span").filter(".stylereport20")

    plan.filter(lambda i, this: pq(this).text() == "").remove()
    # for index, item in enumerate(plan.items()):
    #     if item.text() == "":
    #         item.remove()

    for index, item in enumerate(plan.items()):
        # if index % 2 == 0:
        #     plan[item.text()] = plan.items()[index+1].text()
        # else:
        #     continue
        print(index, "----", item.text())

    # print(plan)
