'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let back_data = {};
	const addIstatus = await db.collection("user_list").add({
		phone: event.phone,
		password: event.password,
		referrer: event.referrer.phone || "",
		create_time: (new Date()).getTime()
	}).then(res => {
		back_data.data = "";
		back_data.success = true;
		back_data.code = 1000;
		back_data.message = "注册成功";
	}).catch(err => {
		back_data.data = "";
		back_data.success = false;
		back_data.code = 1004;
		back_data.message = "服务器错误，注册失败";
	});
	//添加身份权限
	const addPermission = await db.collection("permission").add({
		phone: event.phone,
		user_type: "visitor",
		total_deposit: 0,
		freeze_deposit: 0,
		usable_deposit: 0,
		integration: 0,
		someone: [],
		vip_list: [],
		new_user: "true",
		resident_address: []
	}).then(res => {});
	back_data.addPermission = addPermission;
	//推荐人存在时，需给推荐人送押金和积分
	let updateData = "";
	if(event.referrer.id){
		const referrerData = await db.collection("permission").where({
			phone: event.referrer.phone,
			_id: event.referrer.id,
		}).get();
		let item = JSON.parse(JSON.stringify(referrerData.data[0]));
		item.someone.push(event.phone);
		item.integration = item.integration + 20;
		item.total_deposit = item.total_deposit + 2;
		item.usable_deposit = item.usable_deposit + 2;
		const id = item._id;
		delete item._id;
		updateData = await db.collection("permission").doc(id).update(item);
	}
	back_data.updateData = updateData;
	//返回数据给客户端
	return back_data;
};
