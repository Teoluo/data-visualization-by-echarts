# data-visualization-by-echarts

## 3.2 实验二
### 3.2.1目的
本实验的目的是可视化出不同类型的商品在哪个月达到了销售的高峰，可视化的方式是通过折线图加柱状图来呈现。
折线图部分采用堆叠区域图，堆叠区域图可以单独展现一个类型的十二个月走势，也可以展示多个类型叠加的销售趋势的走势。
柱形图能够很清晰的展现不同类型的商品在哪个月份的销售额达到最高，针对折线图的趋势有一个更加直观的展示。

### 3.2.2 数据处理
为了可视化出不同类型在哪个月的达到了销售的高峰，针对数据从数据库读取的过程，我做了如下的操作，先按照月份以及类型两个因素进行分组，分组后计算出每个类型的数据总数。最后整理数据的时候进行排序，将相同类型的按照月份进行升序的排序。

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/1.png) 
<br>图2.1 数据库查询语句

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/2.png)   
<br>图2.2 数据库查询结果

通过Python连接数据库再读取每一行的数据，将通过数据库整理回来的数据存入一个字典当中，整理成类似于：{'baby care': [4922, 2253, 2589, 4920, 1944, 1994, 3399, 1834, 3741, 3224, 3266, 6265]}的形式。

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/3.png) 
<br>图2.3 数据库查询结果

通过Python针对两个图所需要的数据进行一定的处理，传到前端。

### 3.2.3 数据操作步骤
服务器端通过把字典转换成JSON格式的数据，通过JSON传输到前端，前端在接收到数据后，转换成JS对象，进行ECharts的数据填入工作。
需要传输的数据按照不同的图被分成了两块，一部分是传给堆叠区域图的，另一部分是传给柱状图。
传给堆叠区域部分的数据，是以一个数组的形式传送到前端，提供给ECharts用于生成堆叠图。传输的数据形式如下图：

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/4.png)  
<br>图2.4 数据库查询结果

传给柱状图的部分的数据，每个类型找到自己十二个月销售量中，最多的月份，提供给ECharts生成图片，传输的数据形式如下图：

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/5.png)  
<br>图2.5 数据库查询结果


### 3.2.4 可视化结果
通过ECharts可视化的结果如下，界面分为上下两个部分。
上半部分是堆叠区域图，展示不同类型产品的不同月份的销售趋势；
下半部分是柱状图，反应出不同类型的商品在哪个月的销售达到高峰。

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/6.png) 
<br>图2.6 可视化结果 

堆叠区域图可以通过最上方的选项，选择需要叠加的区域选项，可以有多个不同的类型的叠加，也能只针对单个类型的产品，查看他的不同月的销售走势。
例如下面左图是勾选了 baby care 以及 feminine care两种类型，在堆叠区域图中堆叠展示；右图是单独勾选了 pcc 类型，在堆叠图中单独展示。

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/7.png)     
<br>图2.7 多个类型的叠加展示       		 

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/8.png) 
<br>图2.8 单个类型的展示 

如果你想快速的知道的某一个商品全年的走势，用户可以通过点击下半部分的柱状图，上半部分的堆叠区域图会被替换成当前类型的产品全年销售走势的折线图。

![img](https://github.com/Teoluo/data-visualization-by-echarts/blob/master/screenshots/9.png) 
<br>图2.9 单个类型的展示

