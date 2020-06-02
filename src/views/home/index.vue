<!--  -->
<template>
	<div>
		<van-button type="primary" @click="handleclick">主要按钮</van-button>
	</div>
</template>

<script>
import Storage from "@utils/storage.js";
export default {
	data() {
		return {
			userinfo: "",
			token: ""
		};
	},
	//生命周期 - 创建完成（访问当前this实例）
	created() {
		let params = {
			id: 1,
			name: "ljh"
		};
		let token = "1223213131";
		Storage.set(Storage.KEYS.TOKEN, token);
		Storage.set(Storage.KEYS.USER_INFO, params);
	},
	methods: {
		handleclick() {
			this.userinfo = Storage.get(Storage.KEYS.USER_INFO);
			this.token = Storage.get(Storage.KEYS.TOKEN);
			console.log(this.userinfo);
			console.log(this.token);
		}
	},
	//生命周期 - 挂载完成（访问DOM元素）
	mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>