// pages/practiceDetail/practiceDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
			isSure:false,
			currentId:null,
			options:[
				{
					txt:'A.公有制是社会主义市场经济的重要组成部分',
					id:0,
					al:'A'
				},
				{
					txt:'B.公有制是我国经济社会发展的重要基础',
					id:1,
					al:'B'
				},
				{
					txt:'C.生产资料所有制决定社会的基本性质和发展方向',
					id:2,
					al:'C'
				},
				{
					txt:'D. 由生产资料所有制决定的分配方式能使一切社会成员实现全面发展由生产资料所有制决定的分配方式能使一切社会成员实现全面发展由生产资料所有制决定的分配方式能使一切社会成员实现全面发展',
					id:3,
					al:'D'
				}
			],
			// 多选储存多个id 则使用数组
			checkBox:[],
			//多选or单选
			// multi   radio
			type:'multi',
			//正确答案
			rightAnswer:'ABC',
			//你的答案
			yourAnswer:'',
			//是否多选
			isMulti:false,
			//选择是否正确
			// isRight:null
			
			//是否显示遮罩层
			isShowShadow:false,
			
			//是否创建新的文件夹
			isCreate:false,
			//收藏夹列表
			files:[{name:'时间'},{name:'哈哈哈你'},{name:'激动'}],
			//创建新的文件夹名
			newFileName:'',
			//文件夹是否被选中
			// isSelect:false,
			//文件夹选中index
			// currentSelect:null
    },
		
		isSure() {
			// console.log('fff')
			let isSure = this.data.isSure
			this.setData({
				isSure:!isSure
			})
			//你的答案
			if(this.data.type === 'radio') {
				let answer = this.data.options[this.data.currentId].al
				this.setData({
					yourAnswer:answer
				})
			}else {
				let arr = []
				this.data.options.forEach((item,index) => {
					// console.log('......')
					
					if(item.checked) {
						arr.push(item.al)
					}
				})
				arr = arr.join('')
				this.setData({
					yourAnswer:arr
				})
			}
			
			//判断答案是否正确
			let yourAnswer = this.data.yourAnswer
			let rightAnswer = this.data.rightAnswer
			// yourAnswer.indexOf(rightAnswer) = -1
			let options = this.data.options
			let truely = []
			options.forEach((item,index) => {
				if(rightAnswer.indexOf(item.al) != -1) {
					//正确答案添加标识符
					options[index].isRight = true
					
				}
				//把错误选项添加到集合中
				if(!options[index].isRight) {
					truely.push(options[index].al)
				}
				
			})
			console.log(truely)
			//字符串转化为数组
			yourAnswer = yourAnswer.split('')
			//自己选的答案错误的添加isWrong
			yourAnswer.forEach((item,index) => {
				if(truely.indexOf(item) != -1) {
					// console.log(item)
					options.forEach((items,i) => {
						if(items.al === item) {
							options[i].isWrong = true
						}
					})
				}
				//少选
				// if(rightAnswer.indexOf(item) == -1) {
				// 	options.forEach((items,i) => {
				// 		if(items.al === item) {
				// 			options[i].isWrong = true
				// 		}
				// 	})
				// }
			})
			
			this.setData({
				options
			})
		},
		optionsItemClick(e) {
			// console.log(e)
			// 单选
			let index = e.currentTarget.dataset.index
			this.setData({
				currentId:index
			})
			//多选
			if(this.data.type === 'multi') {
			let options = this.data.options
			options[index].checked = !options[index].checked
			this.setData({
				options
			})
			let checkBox = this.data.checkBox
			// 多选
			if(checkBox.includes(index)) {
				checkBox.splice(checkBox.indexOf(index),1)
				let arr = this.data.checkBox
				// console.log(arr)
				this.setData({
					checkBox:arr
				})
			}else {
				checkBox.push(index)
				let arr = this.data.checkBox
				this.setData({
					checkBox:arr
				})
			}
				
			}
			
			//是否多选
			if(this.data.checkBox.length >= 2) {
				this.setData({
					isMulti:true
				})
			}else {
				this.setData({
					isMulti:false
				})
			}
			
		},
		
		//收藏题目
		showShadow() {
			if(this.data.isShowShadow == false) {
				this.slide()
			}else {
				this.hideModal()
			}
		},
		
		//动画函数
		slide() {
			//创建一个动画实例
			let animation = wx.createAnimation({
				//动画持续时间
				duration:500,
				//定义动画效果，匀速
				timingFunction:'linear',
				//现在y轴偏移，然后用step完成一个动画
			}).translateY(1000).step()
			
			//用setData改变当前动画
			this.setData({
				animationData: animation.export(),
				//改变view里面的wx:if
				isShowShadow: true
			})
			
			//设置settimeout来改变y轴偏移量，实现滑动感觉
			setTimeout(() => {
				animation.translateY(0).step()
				this.setData({
					animationData: animation.export()
				})
			},50)
		},
		
		//隐藏
		hideModal() {
			//创建一个动画实例
			let animation = wx.createAnimation({
				//动画持续时间
				duration:300,
				//定义动画效果，匀速
				timingFunction:'linear',
				//现在y轴偏移，然后用step完成一个动画
			}).translateY(700).step()
			//用setData改变当前动画
			this.setData({
				animationData: animation.export(),
				
			})
			
			//设置settimeout来改变y轴偏移量，实现滑动感觉
			setTimeout(() => {
				animation.translateY(0).step()
				this.setData({
					animationData: animation.export(),
					//改变view里面的wx:if
					isShowShadow: false
				})
			},100)
		},
		
		//新建收藏夹
		createFile() {
			this.setData({
				isCreate:true
			})
		},
		//返回收藏夹界面
		returnF() {
			this.setData({
				isCreate:false,
				newFileName:''
			})
		},
		//监听文件夹名称写入
		changeInput(e) {
			console.log('...')
			let newFileName = e.detail.value
			this.setData({
				newFileName
			})
		},
		//完成新建文件夹
		fileAdd() {
			// this.setData({
				
			// })
			let newFileName = this.data.newFileName.trim()
			let files = this.data.files
			if(newFileName === '') {
				wx.showToast({
					icon:'none',
					title:'输入不能为空'
				})
				return
			}else {
				//判断文件夹是否重名
				if(files.indexOf(newFileName) != -1) {
					wx.showToast({
						icon:'none',
						title:'已经有这个文件夹了哦'
					})
					return
				}else {
					//添加新的文件夹
					files.push(newFileName)
				}
				
			}
			this.setData({
				files,
				isCreate:false,
				newFileName:''
			})
			// console.log(newFileName)
		},
		
		//选中文件夹
		fileSelect(e) {
			// console.log(e)
			let currentSelect = e.currentTarget.dataset.index
			let files = this.data.files
			//可多选
			files[currentSelect].checked = !files[currentSelect].checked
			this.setData({
				// isSelect:!this.data.isSelect,
				// currentSelect
				files
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