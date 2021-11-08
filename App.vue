<script>
	const db = uniCloud.database();
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(this.$route.path == "/pages/index/index" ||
				this.$route.path == "/pages/nav/nav"){
				setTimeout(() => {
					$("uni-page-head").css({display: "none"});
					$(".uni-page-head__title").css({display: "none"});
					$("uni-page-wrapper").css({height: "100%"});
				}, 300)
			}else{
				setTimeout(() => {
					$("uni-page-head").css({display: "block"});
					$(".uni-page-head__title").css({display: "nlock"});
				}, 300)
			}
			const user = JSON.parse(sessionStorage.getItem("user"));
			if((!user || user==undefined || user==null) && this.$route.path!="/pages/regist/regist"){
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
				const user = JSON.parse(this.getSessionStorage("user"));
				if(np.path == "/pages/index/index" ||
					np.path == "/pages/nav/nav"){
					setTimeout(() => {
						$("uni-page-head").css({display: "none"});
						$(".uni-page-head__title").css({display: "none"});
						$("uni-page-wrapper").css({height: "100%"});
					}, 300)
				}else{
					setTimeout(() => {
						$("uni-page-head").css({display: "block"});
						$(".uni-page-head__title").css({display: "nlock"});
					}, 300)
				}
				if((!user || user==undefined || user==null) && np.path!="/pages/regist/regist"){
					this.$router.push("/pages/index/index");
				}else if(np.path=="/" || np.path=="/pages/index/index"){
					this.$router.push("/pages/nav/nav");
				};
			}
		}
	}
</script>

<style></style>
