'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let jackpot = await db.collection("lucky_jackpot").get();
	let hasNum=[], back_data=[], repet_num=[];
	let update_list = {};
	if(jackpot.data.length){
		jackpot.data.forEach((item, index) => {
			switch(item.type){
				//任务积分倍数卡
				case "TIMC":
				item.remain_count = parseInt((10-item.multiple*3)*(10-item.time_limit)*5);
				item.lucky_num_length = parseInt(((1/item.multiple*1/item.time_limit)/(1/1.5+1/2+1/2.5+1/3)/(1/1+1/3+1/5+1/7))*300);//占比26%
				break;
				//普通商品免费体验卡
				case "FECFGM":
				item.remain_count = 20;
				item.lucky_num_length = 18;//占比1.8%
				break;
				//珍贵商品免费体验卡
				case "FECFPG":
				item.remain_count = 2;
				item.lucky_num_length = 2;//占比0.2%
				break;
				//普通商品体验折扣卡
				case "GMEDC":
				item.remain_count = parseInt(1/(1-item.discount)*item.discount*100);
				item.lucky_num_length = parseInt(item.discount*item.discount/6.0375*210);//占比25%
				break;
				//珍贵商品体验折扣卡
				case "DCFEPG":
				item.remain_count = parseInt(1/(1-item.discount)*item.discount*10);
				item.lucky_num_length = parseInt(item.discount*item.discount/6.0375*100);//占比12%
				break;
				//免费盲选卡
				case "FBSD":
				item.remain_count = 30;
				item.lucky_num_length = 30;//占比3%
				break;
				//积分卡
				case "FP":
				item.remain_count = parseInt((110-item.integral)/item.integral*100);
				item.lucky_num_length = parseInt((1/item.integral)/(1/5+1/10+1/20+1/30+1/40+1/50+1/60+1/70+1/80+1/90+1/100)*350);//占比32%
				break;
			}
			item.lucky_num = [];
			for(let i=0; i<item.lucky_num_length; i++){
				const aa = String(Math.floor(Math.random()*10));
				const bb = String(Math.floor(Math.random()*10));
				const cc = String(Math.floor(Math.random()*10));
				const num = aa+bb+cc;
				if(!hasNum.includes(num) && !item.lucky_num.includes(num)){
					hasNum.push(num);
					item.lucky_num.push(num);
				}else{
					i--;
				};
			};
		})
		for(let m=0; m<jackpot.data.length; m++){
			//刷新数据库奖池对应奖项的数量
			update_list["new_item_"+m] = JSON.parse(JSON.stringify(jackpot.data[m]));
			update_list["id_"+m] = update_list["new_item_"+m]._id;
			delete update_list["new_item_"+m]._id;
			update_list["update_"+m] = await db.collection("lucky_jackpot").doc(update_list["id_"+m]).update(update_list["new_item_"+m]);
		}
		for(let j=0; j<hasNum.length; j++){
			if(!back_data.includes(hasNum[j])){
				back_data.push(hasNum[j]);
			}else if(!repet_num.includes(hasNum[j])){
				repet_num.push(hasNum[j]);
			}
		}
	}
	//返回数据给客户端
	return {create_num:hasNum, repet_num:repet_num, back_data:back_data};
};
