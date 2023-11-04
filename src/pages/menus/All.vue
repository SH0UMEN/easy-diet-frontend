<template>
	<menu-finder :title="t('menus.all.title')" route="menus-page" :no-data="t('menus.all.noData')">
    <template v-if="user != null && user.isSuperuser" #actions="{ id, deleteById }">
      <v-card-actions class="justify-end">
        <action-button :button-properties="{ color: 'red-accent-2', variant: 'text' }"
                       :action="async () => await deleteById(id)">
          {{ t('menus.mine.delete') }}
        </action-button>
      </v-card-actions>
    </template>
  </menu-finder>
</template>

<script setup lang="ts">
	import MenuFinder from '@/components/finders/MenuFinder.vue';
  import ActionButton from '@/components/buttons/ActionButton.vue';
  import useStore from '@/store/auth';
  import { storeToRefs } from 'pinia';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
  const { user } = storeToRefs(useStore());
</script>