<template>
	<v-responsive max-width="512" class="mx-auto">
		<v-container class="mt-6">
			<router-view></router-view>
		</v-container>
	</v-responsive>
</template>

<script setup lang="ts">
import useStore from '@/store/auth';
import { storeToRefs } from 'pinia';
import router from '@/router';

const { user } = storeToRefs(useStore());

if(user != null)
	router.push({ name: 'index' });

</script>