<template>
	<el-button @click="">Click</el-button>
	{{ counter }}
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { Store } from 'vuex';
import { useStore, State } from '@/store';
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/css';

const store: Store<State> = useStore();
const counter: Ref = ref(store.state.counter);


</script>