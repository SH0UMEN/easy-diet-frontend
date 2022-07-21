<template>
	<el-button v-for="product in products">{{ product.i18n.ru.title }}</el-button>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useStore, State } from '@/store';
import ProductAPI from "@/services/product";
import IProduct from "@/models/product";
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/css';

const store = useStore();
const api = new ProductAPI();

let products = ref(new Array<IProduct>());

api.get().then((data) => {
	products.value = products.value.concat(data);
});

</script>