import pymysql

from flask import Flask, render_template

import json

from page2 import connectDB_page2, dataforbar, dataforline

app = Flask(__name__)

countDic_page2 = {}



@app.route("/")
@app.route('/two.html')
def show2():
    global countDic_page2
    if not countDic_page2:
        countDic_page2 = connectDB_page2()
        print("第一次需要查询一遍，第二次就不用查询啦")
    lineData = dataforline(countDic_page2)
    barData = dataforbar(countDic_page2)
    return render_template('two.html', lineData=lineData, barData=barData)



if __name__ == '__main__':
    app.debug = False
    app.run(host='127.0.0.1',
            port=5000,
            debug=True,
            )
