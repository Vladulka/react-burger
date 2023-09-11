import type { Middleware } from "redux";
import { WsActionTypes, WsActionsType } from "../actions/web-socket";
import { IOrderDetails } from "../../types";
import { RootState } from "../../utils/hooks";

export const socketOrdersMiddleware = (wsActions: WsActionsType): Middleware<{}, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;

		return next => (action: WsActionTypes) => {
			const { dispatch } = store;
			const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;

			if (action.type === wsConnect) {
				socket = new WebSocket(action.payload);
			}

			if (socket) {
				socket.onopen = () => {
					dispatch({ type: onOpen });
				}
				socket.onerror = (err) => {
					dispatch({ type: onError, payload: err })
				}
				socket.onclose = (e) => {
					if (e.code !== 1000) {
						dispatch({ type: onError, payload: e.code.toString()})
					}
					dispatch({ type: onClose })
				}
				socket.onmessage = (event: MessageEvent) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { ...restParsedData } = parsedData;
					if (restParsedData.orders) {
						restParsedData.orders.sort(
							(a: IOrderDetails, b: IOrderDetails) => b.number - a.number
						);
					}
					dispatch({
						type: onMessage,
						payload: restParsedData,
					});
				};
			}

			if (socket && action.type === wsDisconnect) {
				socket?.close();
			}

			next(action)
		}
	}
}