<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="6" md="4" xl="3" class="grow">
				<v-card :to="{ name: 'menus-create' }" color="yellow-accent-3" class="d-flex fill-height align-center justify-center">
					<v-card-title class="d-flex flex-column align-center">
						<v-icon class="text-h3">mdi-plus-circle</v-icon>
						{{ t('menus.create.floating') }}
					</v-card-title>
				</v-card>
			</v-col>

			<v-col cols="12" sm="6" md="4" xl="3" v-for="i in 6">
				<v-card>
					<v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
						<v-card-title>Top 10 Australian beaches</v-card-title>
					</v-img>

					<v-card-subtitle class="pt-4">
						Number 10
					</v-card-subtitle>

					<v-card-text>
						<div>Whitehaven Beach</div>
						<div>Whitsunday Island, Whitsunday Islands</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="orange">Share</v-btn>
						<v-btn color="orange">Explore</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>