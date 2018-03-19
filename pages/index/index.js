//index.js
//获取应用实例
var app = getApp()
var day = ["今天", "明天", "后天"];
Page({
  data: {
    day: day
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this

    that.getLocation();
  },

  //方法1： 通过微信，获取当前经纬度
  getLocation: function () {
    var that = this;

    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var latitude = res.latitude //纬度
        var longitude = res.longitude //经度
        console.log("纬度经度 lat:" + latitude + " lon:" + longitude)
        //显示加载动画
        wx.showLoading({
          title: '加载中',
        })

        //调用天气查询
        that.getWeatherInfo(latitude, longitude);
      },
      fail: function (e) {
        console.log("获取位置失败")
      },
      complete: function () {
        console.log("获取位置完成")
      }
    })
  },

  //方法2： 手动打开地图选择位置
  chooseLocation: function () {
    var that = this;

    wx.chooseLocation({
      success: function (res) {
        var latitude = res.latitude //纬度
        var longitude = res.longitude //经度
        console.log("纬度经度 lat:" + latitude + " lon:" + longitude)

        //显示加载动画
        wx.showLoading({
          title: '加载中',
        })

        //调用天气查询
       

      }
    })
  },

  getWeatherInfo: function (latitude, longitude) {
    var that = this;
    var keyV = '01a7798b060b468abdad006ea3de4713';//你自己的key
    //需要在微信公众号的设置-开发设置中配置服务器域名
    var url = 'https://free-api.heweather.com/s6/weather';
    wx.request({
      url: url,
      data: {
        key:keyV,
        location: longitude + ',' + latitude
      },
      success: function (res) {
        console.log("最新天气========：" +JSON.stringify(res))
        //当前城市
        var currCity = res.data.HeWeather6[0].basic.parent_city;
        //当前位置
        var currLocation = res.data.HeWeather6[0].basic.location;
        //现在天气情况
        var nowTmp = res.data.HeWeather6[0].now.tmp;//温度
        var condTxt = res.data.HeWeather6[0].now.cond_txt;//天气状况
        var lifeBrf = res.data.HeWeather6[0].lifestyle[0].brf;//生活指数简介
        var lifeType = res.data.HeWeather6[0].lifestyle[0].type;//生活指数类型
        var lifeTypeTxt = "";
        if (lifeType == "comf") {//舒适度
          lifeTypeTxt = "";
        } else if (lifeType == "cw") {
          lifeTypeTxt = "洗车";
        } else if (lifeType == "drsg") {
          lifeTypeTxt = "穿衣";
        } else if (lifeType == "flu") {
          lifeTypeTxt = "感冒";
        } else if (lifeType == "sport") {
          lifeTypeTxt = "运动";
        } else if (lifeType == "trav") {
          lifeTypeTxt = "旅游";
        } else if (lifeType == "uv") {
          lifeTypeTxt = "紫外线";
        } else if (lifeType == "air") {
          lifeTypeTxt = "空气";
        }
        var nowHum = res.data.HeWeather6[0].now.hum;//相对湿度
        var nowfl = res.data.HeWeather6[0].now.fl;//体感温度
        var windDir = res.data.HeWeather6[0].now.wind_dir;//风向
        var windSc = res.data.HeWeather6[0].now.wind_sc;//风力
        var dailyForecast = res.data.HeWeather6[0].daily_forecast;
        var updateTime = res.data.HeWeather6[0].update.loc; //更新时间
        var hour = updateTime.substring(11, 13); //更新时间截取小时
      
        //设置数据
        that.setData({
          curr_city:currCity,
          curr_location:currLocation,
          now_tmp:nowTmp,
          cond_txt: condTxt,
          life_type: "★" + lifeTypeTxt + lifeBrf,
          hum: nowHum,
          fl:nowfl,
          wind_dir:windDir,
          wind_sc:windSc,
          daily_forecast: dailyForecast,
          updateTime: hour

        })
        
      },
      fail: function (res) { },
      complete: function (res) { },

    });

    //隐藏加载动画
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },



  // 转发分享小程序
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '天眼狗-天气预报',
      path: '/pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败取消提示
        // wx.showToast({
        //   title: '转发失败',
        //   icon: 'loading',
        //   duration: 2000
        // })
      }
    }
  },

  //下拉刷新数据
  onPullDownRefresh: function () {

    console.log('下拉刷新')
    var that = this

    that.getLocation();

    //停止刷新
    wx.stopPullDownRefresh();
  },
})
