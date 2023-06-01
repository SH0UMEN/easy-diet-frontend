import Url from '@/magic/url';
import i18n from '@/plugins/i18n';
import axios from 'axios';

type CallbacksBinding = { [id: number]: Function };

class AI {
	private static webSocket?: WebSocket;
	private static handlers: CallbacksBinding = {};
	private static idSeed = 0;
	private static stopMessage = 'stop';

	public static generate(title: string, ingredients: Array<number>, model: string, field: string, handler: Function) {
		if(this.webSocket == null || this.webSocket.readyState == WebSocket.CLOSED) {
			this.webSocket = new WebSocket('ws://' + location.host + Url.GPT);

			this.webSocket.addEventListener('close', this.clear);
			this.webSocket.addEventListener('error', this.clear);

			this.webSocket.addEventListener('message', (event) => {
				const data = JSON.parse(event.data);
				const isEnd = data.message != null && data.message.finish_reason == this.stopMessage;
				const isError = data.error;

				this.handlers[data.id](data.message.delta.content, isEnd, isError);

				if(isEnd || isError)
					delete this.handlers[data.id];
			});

			return this.webSocket.addEventListener('open', () => {
				this.generate(title, ingredients, model, field, handler);
			});
		}

		const locale: any = i18n.global.locale;

		this.handlers[this.idSeed] = handler;
		this.webSocket.send(JSON.stringify({
			title: title,
			ingredients: ingredients,
			model: model,
			field: field,
			lang: locale.value,
			id: this.idSeed++
		}));
	}

	public static disconnect() {
		if(this.webSocket != null)
			this.webSocket.close();

		this.clear();
	}

	private static clear() {
		this.webSocket = undefined;
		this.handlers = {};
	}
}

export default AI;