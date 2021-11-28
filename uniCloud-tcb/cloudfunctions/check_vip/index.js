'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let back_data = {};
	const userData = await db.collection("permission").where({phone: event.phone}).get();
	let item = userData.data[0];
	if(item.vip_list.length){
		item.vip_list.forEach((t, i) => {
			if(t.end_time <= (new Date).getTime()){
				item.vip_list.splice(i, 1); 
			}
		})
	}
	if(item.vip_list.length <= 0){
		item.user_type = "visitor";
	}
	const id = item._id;
	delete item._id;
	const updateData = await db.collection("permission").doc(id).update(item);
	back_data = updateData;
	//返回数据给客户端
	return back_data;
};
