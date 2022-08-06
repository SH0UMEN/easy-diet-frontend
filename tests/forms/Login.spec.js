import { mount } from '@vue/test-utils';
import Login from '@/components/forms/Login.vue';

test('renders a todo', () => {
	const wrapper = mount(Login);
	const todo = wrapper.get('[data-test="todo"]');

	expect(todo.text()).toBe('Learn Vue.js 3');
});