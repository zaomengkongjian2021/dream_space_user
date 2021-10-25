'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const jackpot = await db.collection("lucky_jackpot").get();
	let num_arr = [], back_data=[], default_obj={};
	for(let i=0; i<event.count; i++){
		const aa = String(Math.floor(Math.random()*10));
		const bb = String(Math.floor(Math.random()*10));
		const cc = String(Math.floor(Math.random()*10));
		const num = aa+bb+cc;
		num_arr.push(num);
	};
	if(jackpot.data.length){
		for(let k=0; k<jackpot.data.length; k++){
			if(jackpot.data[k].type=="FP" && jackpot.data[k].integral==10){
				default_obj = jackpot.data[k];
				break;
			}
		}
		num_arr.forEach((item, index) => {
			let is_has = false;
			for(let j=0; j<jackpot.data.length; j++){
				if(jackpot.data[j].lucky_num.includes(item) && jackpot.data[j].remain_count>0){
					back_data.push(jackpot.data[j]);
					is_has = true;
					jackpot.data[j].remain_count = jackpot.data[j].remain_count - 1 ;
					break;
				}
			}
			if(!is_has){
				back_data.push(default_obj);
			}
		})
	}
	let key = {};
	for(let m=0; m<back_data.length; m++){
		//刷新数据库奖池对应奖项的数量
		key["new_item_"+m] = JSON.parse(JSON.stringify(back_data[m]));
		key["id_"+m] = key["new_item_"+m]._id;
		delete key["new_item_"+m]._id;
		key["update_"+m] = await db.collection("lucky_jackpot").doc(key["id_"+m]).update(key["new_item_"+m]);
	}
	let user_souce = JSON.parse(JSON.stringify(back_data));
	for(let f=0; f<user_souce.length; f++){
		user_souce[f].phone = event.phone;
		user_souce[f].user_id = event.user_id;
		delete user_souce[f]._id;
	}
	const update_user_souce = await db.collection("user_source").add(user_souce);
	return back_data;
};