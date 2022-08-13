import { mount } from '@vue/test-utils';
import Login from '@/components/forms/auth/Login.vue';
import { createRouter, createWebHistory, useRouter } from 'vue-router';

describe('Login form', () => {
	it('emits the "submit" event if data is correct', async () => {
		const wrapper = mount(Login);

		const username = wrapper.get('[data-test="username"]');
		const password = wrapper.get('[data-test="password"]');

		await username.setValue('fuck you');
		await password.setValue('1111');

		expect(username.contains()).toBe('Learn Vue.js 3');
	});
});