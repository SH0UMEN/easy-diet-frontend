<template>
	<router-view></router-view>
</template>

<script lang='ts' setup>

import { ref, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import useStore from '@/store/auth';
import Product from '@/models/product';
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/css';

const store = useStore();
const products = ref(new Array<Product>());
const { user } = storeToRefs(store);

store.me();

// useAuthService().me().then((data: User) => {
// 	user.value = data;
// });
//
// api.get().then((data) => {
// 	products.value = products.value.concat(data);
// });

</script>