<template>
	<dish-finder :title="t('dishes.all.title')" route="dishes-page" :no-data="t('dishes.all.noData')">
    <template v-if="user != null && user.isSuperuser" #actions="{ id, deleteById }">
      <v-card-actions class="justify-end">
        <action-button :button-properties="{ color: 'red-accent-2', variant: 'text' }"
                       :action="async () => await deleteById(id)">
          {{ t('dishes.mine.delete') }}
        </action-button>
      </v-card-actions>
    </template>
  </dish-finder>
</template>

<script setup lang="ts">
	import DishFinder from '@/components/finders/DishFinder.vue';
  import ActionButton from '@/components/buttons/ActionButton.vue';
  import { useI18n } from 'vue-i18n';
  import { storeToRefs } from "pinia";
  import useStore from "@/store/auth";

	const { t } = useI18n();
  const { user } = storeToRefs(useStore());
</script>