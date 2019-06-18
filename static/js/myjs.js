// var vm = new Vue({
//     el: '#vue_det',
//     data: {
//         site: "菜鸟教程",
//         url: "www.runoob.com",
//         alexa: "10000"
//     },
//     methods: {
//         details: function () {
//             return this.site + " - 学的不仅是技术，更是梦想！";
//         }
//     }
// })

var myChart = echarts.init(document.getElementById('map-wrap'));
var data = [
    { name: '内江', value: 50 },
    { name: '重庆', value: 50 },
    { name: '宜宾', value: 50 },
    { name: '绵阳', value: 50 },
    { name: '成都', value: 50 },
    { name: '凉山彝族自治州', value: 50 },
    { name: '德阳', value: 50 },
    { name: '广元', value: 50 },
    { name: '自贡', value: 50 },
    { name: '遂宁', value: 50 },
    { name: '泸州', value: 50 },
    { name: '攀枝花', value: 50 },
    { name: '资阳', value: 50 },
    { name: '南充', value: 50 },
    { name: '达州', value: 50 },
    { name: '广安', value: 50 },
    { name: '巴中', value: 50 },
    { name: '眉山', value: 50 },
    { name: '乐山', value: 50 },
    { name: '雅安', value: 50 },
];
var geoCoordMap = {
    '内江': [105.059992,29.575835],
    '重庆': [106.553263,29.557435],
    '宜宾': [104.649403,28.758007],
    '绵阳': [104.687285,31.475141],
    '成都': [104.070975,30.583957],
    '凉山彝族自治州': [102.265453,27.886219],
    '德阳': [104.392919,31.13361],
    '广元': [105.84467,32.441617],
    '自贡': [104.778696,29.34357],
    '遂宁': [105.5931,30.546064],
    '泸州': [105.453125,28.879692],
    '攀枝花': [101.730143,26.588034],
    '资阳': [104.622939,30.137455],
    '南充': [106.119804,30.849736],
    '达州': [107.475742,31.210848],
    '广安': [106.63093,30.453279],
    '巴中': [106.753882,31.868964],
    '眉山': [103.851393,30.083027],
    '乐山': [103.767941,29.559951],
    '雅安': [103.056438,30.016792],
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

var option = {
    title: {
        text: '川渝主要城市购买力统计图',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    bmap: {
        center: [106.553263,29.557435],
        zoom: 7.5,
        roam: true,
        mapStyle: {
            styleJson: [{
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'land',
                'elementType': 'all',
                'stylers': {
                    'color': '#f3f3f3'
                }
            }, {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                    'color': '#fdfdfd'
                }
            }, {
                'featureType': 'highway',
                'elementType': 'labels',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'geometry',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'green',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'subway',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'local',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'building',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'label',
                'elementType': 'labels.text.fill',
                'stylers': {
                    'color': '#999999'
                }
            }]
        }
    },
    series: [
        {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'purple'
                }
            }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'purple',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};

myChart.setOption(option);