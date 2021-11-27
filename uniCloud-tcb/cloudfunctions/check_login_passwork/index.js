'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let userData = await db.collection("user_list").where({phone: event.phone}).get();
	let back_data = {};
	if(!userData.data){
		back_data.data = [];
		back_data.success = false;
		back_data.code = 1003;
		back_data.message = "服务器错误，登录失败";
	}else{
		if(userData.data.length){
			const user = userData.data[0];
			if(user.password == event.passwork){
				back_data.data = userData.data;
				back_data.success = true;
				back_data.code = 1000;
				back_data.message = "登录成功";
			}else{
				back_data.data = userData.data;
				back_data.success = false;
				back_data.code = 1002;
				back_data.message = "账户或密码错误";
			}
		}else{
			back_data.data = [];
			back_data.success = false;
			back_data.code = 1001;
			back_data.message = "用户不存在";
			
		}
	}
	//返回数据给客户端
	return back_data;
};
