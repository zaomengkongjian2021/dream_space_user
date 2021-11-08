/**
 * @link https://www.shopwind.net/
 * @copyright Copyright (c) 2018 ShopWind Inc. All Rights Reserved.
 *
 * This is not free software. Do not use it for commercial purposes. 
 * If you need commercial operation, please contact us to purchase a license.
 * @license https://www.shopwind.net/license/
 * ==========================================================================
 * 
 * @Id shopwind-multpicker.js 2019.10.19 $
 * @author shopwind
 */

/**
 * 三级联动组件（理论上兼容任意模型）
 * 返回选中项的ID及名称
 */
async function build(multiIndex, current = null, path = 'region/items', idField = 'region_id', nameField =
	'region_name', parentField = 'parent_id') {

	// 读取所有一级数据
	let firsts = await promise(path, {
		[parentField]: 0,
		page_size: 1000 // 设置大一点，一次读完
	})

	if (!isEmpty(current)) {
		buildMultiIndex(firsts.list, multiIndex, current[0], nameField, 0)
	}
	
	// 读取所有二级数据
	let seconds = await promise(path, {
		[parentField]: firsts.list[multiIndex[0]][idField],
		page_size: 1000 // 设置大一点，一次读完
	})

	if (!isEmpty(current)) {
		buildMultiIndex(seconds.list, multiIndex, current[1], nameField, 1)
	}

	// 读取所有三级数据
	let thirds = await promise(path, {
		[parentField]: seconds.list[multiIndex[1]][idField],
		page_size: 1000 // 设置大一点，一次读完
	})

	if (!isEmpty(current)) {
		buildMultiIndex(thirds.list, multiIndex, current[2], nameField, 2)
	}

	// 三级数组
	let multiList = [firsts.list, seconds.list, thirds.list]

	// 返回数据
	let result = getResult(multiList, multiIndex, idField, nameField)
	return Object.assign(result, {
		multiList: multiList
	})
}

/**
 * 使下拉选项保持选中的值
 * @param {Object} multiList
 * @param {Object} multiIndex
 * @param {Object} search
 * @param {Object} nameField
 * @param {Object} index
 */
function buildMultiIndex(multiList, multiIndex, search, nameField, index) {
	if (!isEmpty(search)) {
		for (let key in multiList) {
			if (multiList[key][nameField] == search) {
				multiIndex[index] = key
			}
		}
	}
}

/**
 * 返回选中的数据
 * @param {Object} multiList
 * @param {Object} multiIndex
 * @param {Object} idField
 * @param {Object} nameField
 */
function getResult(multiList, multiIndex, idField, nameField) {
	let array = [multiList[0][multiIndex[0]][nameField], multiList[1][multiIndex[1]][nameField]]
	if (multiList[2][multiIndex[2]]) {
		array.push(multiList[2][multiIndex[2]][nameField])
	}

	return {
		label: array.join('，'), // 当前选择的文本
		//value: [multiList[0][multiIndex[0]][idField], multiList[1][multiIndex[1]][idField], multiList[2][multiIndex[2]][idField]], // 三级ID
		value: multiList[array.length - 1][multiIndex[array.length - 1]][idField] // 末级ID
	}
}

/**
 * 使用Promise方式获取数据
 * @param {Object} api
 * @param {Object} params
 */
function promise(api, params) {
	return new Promise((resolve, reject) => {
		
		
		/**
		 * 这里改为你项目实际的调用地址，返回数据格式可以打印出来参照
		 * api 代表的是路由，如：region/items
		 * params 代表的是请求参数，这里可以根据自己的情况传参
		 */ 
		uni.request({
			url: 'https://api.app.shopwind.net/' + api,
			data: params,
			dataType: 'json',
			header: {
				'content-type': 'application/json'
			},
			method: 'post',
			success: (res) => {
				
				// 可以打印出来看看数据结构
				//console.log(res.data.data)
				
				resolve(res.data.data)
			}
		})
		
		
	})
}

/**
 * 判断对象/数组是否为空
 * @param {Object} array
 */
function isEmpty(array) {
	if (typeof array == "undefined" || array == undefined || array == null || array == '') {
		return true
	}
	return false
}

module.exports = {
	build: build
}
