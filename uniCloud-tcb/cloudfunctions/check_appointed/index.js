'use strict';
const db = uniCloud.database();
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let back_data = true;
	const appointedData = await db.collection("appointment_orders").where({phone: event.phone, istatus: dbCmd.eq(event.istatus1).or(dbCmd.eq(event.istatus2))}).get();
	if(appointedData.data.length <= 0){
		back_data = false;
	}
	return back_data;
};
