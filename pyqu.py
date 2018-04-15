# -*- coding:utf-8 -*-
from pyquery import PyQuery as pq
import sys


def loginResult(htmlPage):

    htm = pq(htmlPage)

    result = htm.find("imput:last")

    return result.val()


def getQuarterCount(htmlPage):

    htm = pq(htmlPage)

    result = htm.find("option:last").val()

    return result


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

    htm = pq(htmlPage)

    result = htm.find("table").children("tr").eq(5).children("td").eq(2)

    plan_and_record = result.children("table")
