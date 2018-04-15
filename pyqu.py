# -*- coding:utf-8 -*-
from pyquery import PyQuery as pq
import sys


def getTotalRankData(htmlPage):

    htm = pq(htmlPage)

    tbs = htm("table table").eq(1)

    # titles = tbs.find('tr').filter(lambda i: i == 1)

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


def loginResult(htmlPage):

    htm = pq(htmlPage)
    # htm = pq(filename="./htmlPages/MBABEST21- Student.htm")
    result = htm.find("form").children("input")
    # print(result)
    # print(result.val())
    return result.val()
