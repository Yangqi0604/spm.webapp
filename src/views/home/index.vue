<!--  -->
<template>
	<div>
		<van-button type="primary">主要按钮</van-button>
	</div>
</template>

<script>
import Storage from "@utils/storage.js";
export default {
	data() {
		return {};
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
	//生命周期 - 挂载完成（访问DOM元素）
	mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>