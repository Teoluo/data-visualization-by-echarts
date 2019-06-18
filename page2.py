import pymysql

import json


def connectDB_page2():
    # 参数;
    # 本地数据库  "localhost",
    # 用户名  "root",
    # 密码  "password",
    # 表名  "test",
    # charset="utf8"
    db = pymysql.connect("localhost", "user", "password", "test", charset="utf8")
    # 用字典存储数据
    countDic = {}
    cursor = db.cursor()
    # 以月份、商品类型来分组，对月份进行升序排序，计算商品数量
    sql = "SELECT  COUNT(*) as cateCount , category_name , right(yearmonth,2) as newMonth FROM test.sale group by right(yearmonth,2), category_name order by category_name asc,newMonth asc"

    try:
        # 执行SQL语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for row in results:
            if row[1] in countDic.keys():
                countDic[row[1]].append(row[0])
            else:
                countDic[row[1]] = []
                countDic[row[1]].append(row[0])
                
    # 生成的字典形式  {‘name’：[一月数量、二月数量、...]}
    except:
        print("Error: unable to fetch data")

    db.close()
    return countDic


def dataforline(countDic):
    # 整理折线图的数据
    lists = []
    for item in countDic:
        str1 = '{"name": "' + item + '", "type":"line","stack": "总量","areaStyle": {},"data":' + str(
            countDic[item]) + '}'
        json2python1 = json.loads(str1)
        lists.append(json2python1)

    dicT = {
        "values": lists,
    }
    lineData = json.dumps(dicT, ensure_ascii=False)
    return lineData


def dataforbar(countDic):
    # 整理柱状图的数据
    list1 = []
    list2 = []
    for k, y in countDic.items():
        list1.append(k)
        list2.append(y.index(max(y)) + 1)

    col = {
        'names': list1,
        'values': list2,
    }
    barData = json.dumps(col, ensure_ascii=False)
    # 整理成{'name':''}
    return barData
