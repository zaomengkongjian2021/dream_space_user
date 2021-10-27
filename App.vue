<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const user = JSON.parse(sessionStorage.getItem("user"));
			if(!user || user==undefined || user==null){
				this.$router.push("/pages/index/index");
			};
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		watch:{
			$route(np, op){
				console.log(np.path)
				const user = JSON.parse(sessionStorage.getItem("user"));
				if(np.path == "/pages/regist/regist" ||
					np.path == "/pages/goodsDetail/goodsDetail"){
					setTimeout(() => {
						$("uni-page-head").css({display: "block"});
						$(".uni-page-head__title").css({display: "block"});
					}, 300)
					return;
				}
				setTimeout(() => {
					$("uni-page-head").css({display: "none"});
				}, 300)
				if(!user || user==undefined || user==null){
					this.$router.push("/pages/index/index");
				}else if(np.path=="/" || np.path=="/pages/index/index"){
					this.$router.push("/pages/nav/nav");
				};
			}
		}
	}
</script>

<style>
	uni-page-head{
		display: none;
	}
	.uni-page-head__title{
		display: none;
	}
	uni-page-wrapper{
		height: 100% !important;
	}
</style>
