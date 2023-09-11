import { OrderHistoryType } from "../../types";

export const WS_CONNECT: 'WS_CONNECT' = 'WS_CONNECT';
export const WS_DISCONNECT: 'WS_DISCONNECT' = 'WS_DISCONNECT';
export const WS_OPEN: 'WS_OPEN' = 'WS_OPEN';
export const WS_CLOSE: 'WS_CLOSE' = 'WS_CLOSE';
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR';
export const WS_MESSAGE: 'WS_MESSAGE' = 'WS_MESSAGE';

interface IWsConnect {
	readonly type: typeof WS_CONNECT;
	payload: string;
}

interface IWsDisconnect {
	readonly type: typeof WS_DISCONNECT;
}

interface IWsOpen {
	readonly type: typeof WS_OPEN;
}

interface IWsClose {
	readonly type: typeof WS_CLOSE;
}

interface IWsError {
	readonly type: typeof WS_ERROR;
}

interface IWsMessage {
	readonly type: typeof WS_MESSAGE;
	payload: OrderHistoryType;
}

export type WsActionTypes = IWsConnect
	| IWsDisconnect
	| IWsOpen
	| IWsClose
	| IWsError
	| IWsMessage


export type WsActionsType = {
	wsConnect: typeof WS_CONNECT;
	wsDisconnect: typeof WS_DISCONNECT;
	onOpen: typeof WS_OPEN;
	onClose: typeof WS_CLOSE;
	onError: typeof WS_ERROR;
	onMessage: typeof WS_MESSAGE;
};

export const webSocket: WsActionsType = {
	wsConnect: WS_CONNECT,
	wsDisconnect: WS_DISCONNECT,
	onOpen: WS_OPEN,
	onClose: WS_CLOSE,
	onError: WS_ERROR,
	onMessage: WS_MESSAGE,
};