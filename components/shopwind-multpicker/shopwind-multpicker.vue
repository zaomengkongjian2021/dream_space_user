<template>
	<view>
		<view class="uni-flex uni-row multpicker">
			<text class="title">{{title}}</text>
			<picker mode="multiSelector" @columnchange="columnchange" :range-key="nameField" :value="multiIndex"
				:range="multiList" class="selected">{{current.label}}</picker>
		</view>
	</view>
</template>

<script>
	/**
	 * @link https://www.shopwind.net/
	 * @copyright Copyright (c) 2018 ShopWind Inc. All Rights Reserved.
	 *
	 * This is not free software. Do not use it for commercial purposes. 
	 * If you need commercial operation, please contact us to purchase a license.
	 * @license https://www.shopwind.net/license/
	 * ==========================================================================
	 * 
	 * @Id index.vue.js 2019.10.19 $
	 * @author shopwind
	 * 
	 * 通用型封装三级联动 v1.0.0
	 * 
	 * @description 理论上支持任意模式的三级联动，比如商品分类联动，地区联动，只要配置好以下参数即可：
	 * @param {string} title  显示的标题
	 * @param {string} route 代表的是你的路由api接口，比如获取地区数据，可以为：region/list
	 * @param {string} idField 数据源的id字段，因为不同模型，字段会不一样，比如region_id
	 * @param {string} nameField 数据源的name字段，比如：region_name
	 * @param {string} parentField 数据源的父级ID字段，比如：parent_id
	 * @event {Function} confirm 可以获得切换后返回的当前选择的信息
	 * @value {array} selected 默认选中的项，也可以用于初始化或编辑状态下显示某项，取值如：['天津', '天津市', '和平区']
	 * 
	 * 引用示例：
	 * <shopwind-multpicker :title="title" idField="region_id" nameField="region_name" parentField="parent_id" :selected="selected" @confirm="confirm"></shopwind-multpicker>
	 */
	import multpicker from './shopwind-multpicker.js'
	export default {
		name: "shopwind",
		props: {
			title: {
				type: String,
				default: ''
			},
			idField: {
				type: String,
				default: 'region_id'
			},
			nameField: {
				type: String,
				default: 'region_name'
			},
			parentField: {
				type: String,
				default: 'parent_id'
			},
			// 可根据不同的模式，设置不同的路由，这个跟你的接口有关
			// 比如地区联动: region/items  
			// 分类联动：category/items
			route: {
				type: String,
				default: 'region/items'
			},
			selected: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				multiIndex: [0, 0, 0],
				multiList: [],
				current: {
					value: 0,
					label: '请选择',
				}
			}
		},
		created() {
			this.pickers(this.selected)
		},
		methods: {
			columnchange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				if (e.detail.column == 0) {
					this.multiIndex = [e.detail.value, 0, 0]
				} else if (e.detail.column == 1) {
					this.multiIndex[2] = 0
				}
				this.pickers()
			},
			async pickers(selected) {
				let result = await multpicker.build(this.multiIndex, selected, this.route, this.idField, this
					.nameField, this.parentField)
				this.current.value = result.value
				this.current.label = result.label
				this.multiList = result.multiList

				this.$emit('confirm', this.current)
			}
		}
	}
</script>
<style>
	/**
	 * 以下样式效果根据自己喜好重写
	 */
	.multpicker .title {
		color: #F0AD4E;
	}
	.multpicker .selected {
		color: #00CC00;
	}
</style>