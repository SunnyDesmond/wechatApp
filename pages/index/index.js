// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js');
var util = require('../../utils/util.js');  
Page({
  data: {
    
  },
  onLoad: function () {
    var that = this;
    wx.showLoading({
      title: '拼命加载中~',
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            let userInfo = res.userInfo
            let nickName = userInfo.nickName
            let avatarUrl = userInfo.avatarUrl
            let gender = userInfo.gender //性别 0：未知、1：男、2：女
            let province = userInfo.province
            let city = userInfo.city
            let country = userInfo.country
            that.setData({
              nickName,
              avatarUrl,
              gender,
              province,
              city,
              country,
            });
            timeTips(); //时间问候
          }
        });
      
      
        // 发起weather请求 
        BMap.weather({
          fail: fail,
          success: success
        });
        
      },
      fail: function () {
        wx.showToast({
          title: '网络炸了！',
          icon: 'success',
          duration: 2000
        });
        wx.hideLoading();
      }
    });
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'vRDfB8MAzVWGofPPQVvrG9og2gqLGWFG'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      that.setData({
        currentCity: weatherData.currentCity,
        pm25: weatherData.pm25,
        date: weatherData.date,
        temperature: weatherData.temperature,
        weatherDesc: weatherData.weatherDesc,
        wind: weatherData.wind
      });
      wx.hideLoading();
    }
    // 时间段提示
    function timeTips(){
      let time = util.formatTime(new Date());  //获取本地日期 时间
      let timeNow = time.split(" ")[1];   //获取本地时间 时：分：秒 
      let hourNow = timeNow.split(":")[0]  //获取本地时间 时
      console.log(hourNow)
      if ( hourNow>=6 && hourNow<12){
        wx.setNavigationBarTitle({
          title: `早上好，${that.data.nickName}`
        });
      } else if (hourNow>=12 && hourNow<18){
       
        wx.setNavigationBarTitle({
          title: `下午好，${that.data.nickName}`
        });
      } else if (hourNow>=18&&hourNow<24){
        wx.setNavigationBarTitle({
          title: `晚上好，${that.data.nickName}`
        });
      } else if(hourNow>=0&&hourNow<6){
        wx.setNavigationBarTitle({
          title: `深夜啦~，${that.data.nickName}`
        });
      }
    }

  },
 

});