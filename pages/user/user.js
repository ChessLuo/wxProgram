// pages/user/user.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    bindStatusTxt:"Android开发者"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (allInfo,code) {
      console.log("用户信息===：" + allInfo.encryptedData + ";" + code + ";" + allInfo.userInfo);
      //更新数据
      that.setData({
        userInfo: allInfo.userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 绑定事件
   */
  bindClik: function(event){
    var that = this;
    var currId = event.currentTarget.id;
    if (currId =="bind"){
      if ((that.data.bindStatusTxt) =="Android开发者"){
        wx.showModal({
          title: "温馨提示",
          content: "Android开发者现在还没饱和，奔跑吧孩子！",
          showCancel: false,
          confirmText: "确定"
        })
        return;
      }
      
      wx.navigateTo({    //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
        url: "/pages/bindAgent/bindAgent"
      })
    }
  }

})