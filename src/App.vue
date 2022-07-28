<template>
	<router-view></router-view>
</template>

<script lang='ts' setup>

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import useStore from '@/store/auth';
import Product from '@/models/product';

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