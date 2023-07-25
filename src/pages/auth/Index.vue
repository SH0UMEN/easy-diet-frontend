<template>
	<v-responsive max-width="512" class="mx-auto pa-6 fill-height">
		<div class="d-flex flex-1-0 fill-height justify-center flex-column">
			<router-view></router-view>
		</div>
	</v-responsive>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import useStore from '@/store/auth';
	import router from '@/router';

	const { user } = storeToRefs(useStore());

	if(user.value != null)
		router.push({ name: 'index' });
</script>