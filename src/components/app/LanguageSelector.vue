<template>
	<v-menu>
		<template #activator="{ props }">
			<v-btn variant="plain" size="sm" v-bind="props">{{ $i18n.locale }}</v-btn>
		</template>
		<v-list>
			<v-list-item v-for="locale in $i18n.availableLocales" :key="locale" @click="$i18n.locale = locale">
				<v-list-item-title>{{ locale }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>