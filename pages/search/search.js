// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
			searchContent:'',
			screenItem:[
				{
					name:'排序',
					type:'reorder',
					option:['全部','热门'],
					selected:0
				},
				{
					name:'题库分类',
					type:'sort',
					option:['全部','司法','教资','哈哈','等等','司法','教资','司法','教资'],
					selected:0
				},
				{
					name: '其他筛选',
					type:'other',
					option:['全部','司法','教资','哈哈','等等','司法','教资','司法','教资'],
					selected:0
				}
			],
			isOpen:false,
			currentIndex:null, //是否下拉
			
			
    },
		
		// 打开下拉列表
		isOpen(e) {
			let isOpen = this.data.isOpen
			
			this.setData({
				isOpen:true,
				currentIndex:e.currentTarget.dataset.index,
				
			})
		},
		// 选中关键词
		isSelected(e) {
			// console.log(e)
			let currentIndex = this.data.currentIndex
			//let selected = this.data.screenItem[currentIndex].selected
			let currentOIndex = e.currentTarget.dataset.index
			let temp = this.data.screenItem
			temp[currentIndex].selected = currentOIndex
			this.setData({
				screenItem:temp
			})
		},
		//确定选中
		isOk() {
			this.setData({
				isOpen:false
			})
		},
		
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    }
})