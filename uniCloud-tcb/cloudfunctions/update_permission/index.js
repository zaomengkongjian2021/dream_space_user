'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let back_data = {};
	const userData = await db.collection("permission").where({phone: event.phone, _id: event._id}).get();
	let item = userData.data[0];
	for(let key in item){
		if(event[key]){
			if(typeof item[key] == "number"){
				item[key] = item[key]+event[key];
			}else{
				item[key] = event[key];
			}
		}
	}
	const id = item._id;
	delete item._id;
	const updateData = await db.collection("permission").doc(id).update(item);
	back_data = updateData;
	//返回数据给客户端
	return back_data;
};
