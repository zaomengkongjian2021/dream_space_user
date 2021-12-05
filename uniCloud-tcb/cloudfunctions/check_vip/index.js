'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let back_data = {};
	const userData = await db.collection("permission").where({phone: event.phone}).get();
	const orderData = await db.collection("make_appointment_orders").where({phone: event.phone}).get();
	//将预约单分类整理，便于下面查找
	let orderObj = {
		out: {},
		in: {}
	};
	orderData.data.forEach(gg => {
		if(orderObj[gg.type] && orderObj[gg.type][gg.sub_type]){
			orderObj[gg.type][gg.sub_type].push(gg);
		}else if(orderObj[gg.type]){
			orderObj[gg.type][gg.sub_type] = [];
			orderObj[gg.type][gg.sub_type].push(gg);
		}
	})
	//各项vip到期时，需要校验有没有使用过
	let item = userData.data[0];
	if(item.vip_list.length){
		item.vip_list.forEach((t, i) => {
			if(t.end_time <= (new Date()).getTime()){
				if(!orderObj[t.type][t.sub_type] || orderObj[t.type][t.sub_type].length<=0){
					//校验所有预约单中是否有该项目的，没有则延长1个月，再校验延长后是否也过期
					const end = t.end_time + 30*24*60*60*1000;
					if(end <= (new Date()).getTime()){
						item.vip_list.splice(i, 1); 
					}else if(t.extended == "false"){
						t.end_time = end;
						t.extended = "true";
					}else{
						item.vip_list.splice(i, 1);
					}
				}else if(orderObj[t.type][t.sub_type] && orderObj[t.type][t.sub_type].length>0){
					//所有预约单中有这个项目的，则遍历看是否有此次vip期间的，如果没有则延长1个月
					let hasUse = false;
					orderObj[t.type][t.sub_type].forEach(hh => {
						if(hh.create_time>t.start_time && hh.create_time<=t.end_time){
							hasUse = true;
						}
					})
					if(hasUse){
						item.vip_list.splice(i, 1); 
					}else{
						const end = t.end_time + 30*24*60*60*1000;
						if(end <= (new Date()).getTime()){
							item.vip_list.splice(i, 1); 
						}else if(t.extended == "false"){
							t.end_time = end;
							t.extended = "true";
						}else{
							item.vip_list.splice(i, 1);
						}
					}
				}
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
