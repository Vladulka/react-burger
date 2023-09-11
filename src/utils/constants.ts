export const authData = {
	accessToken: "testtesttesttesttest",
	refreshToken: "testtesttesttesttest",
	email: "test@mail.ru",
	name: "Vladulka",
	password: "testtesttesttesttest",
	success: true
};

export const ingredientArrayData = [
	{
		"_id": "643d69a5c3f7b9001cfa093c",
		"name": "Краторная булка N-200i",
		"type": "bun",
		"proteins": 80,
		"fat": 24,
		"carbohydrates": 53,
		"calories": 420,
		"price": 1255,
		"image": "https://code.s3.yandex.net/react/code/bun-02.png",
		"image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
		"image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
		"__v": 0
	},
	{
		"_id": "643d69a5c3f7b9001cfa093e",
		"name": "Филе Люминесцентного тетраодонтимформа",
		"type": "main",
		"proteins": 44,
		"fat": 26,
		"carbohydrates": 85,
		"calories": 643,
		"price": 988,
		"image": "https://code.s3.yandex.net/react/code/meat-03.png",
		"image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
		"image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
		"__v": 0
	},
	{
		"_id": "643d69a5c3f7b9001cfa0943",
		"name": "Соус фирменный Space Sauce",
		"type": "sauce",
		"proteins": 50,
		"fat": 22,
		"carbohydrates": 11,
		"calories": 14,
		"price": 80,
		"image": "https://code.s3.yandex.net/react/code/sauce-04.png",
		"image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
		"image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
		"__v": 0
	},
	{
		"_id": "643d69a5c3f7b9001cfa093f",
		"name": "Мясо бессмертных моллюсков Protostomia",
		"type": "main",
		"proteins": 433,
		"fat": 244,
		"carbohydrates": 33,
		"calories": 420,
		"price": 1337,
		"image": "https://code.s3.yandex.net/react/code/meat-02.png",
		"image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
		"image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
		"__v": 0
	},
];

export const currentAuthData = {
	accessToken: "testtesttesttesttest",
	refreshToken: "testtesttesttesttest",
	user: {
		email: "test@test.ru",
		name: "Vladulka"
	},
	success: false
};

export const currentBunData = {
	"_id": "643d69a5c3f7b9001cfa093c",
	"name": "Краторная булка N-200i",
	"type": "bun",
	"proteins": 80,
	"fat": 24,
	"carbohydrates": 53,
	"calories": 420,
	"price": 1255,
	"image": "https://code.s3.yandex.net/react/code/bun-02.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
	"__v": 0
};

export const currentIngredientData = {
	"_id": "643d69a5c3f7b9001cfa0941",
	"name": "Биокотлета из марсианской Магнолии",
	"type": "main",
	"proteins": 420,
	"fat": 142,
	"carbohydrates": 242,
	"calories": 4242,
	"price": 424,
	"image": "https://code.s3.yandex.net/react/code/meat-01.png",
	"image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
	"image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
	"__v": 0
};

export const orderData = {
	"_id": "64ff50496d2997001caa8181",
	"ingredients": [ "643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093c" ],
	"status": "done",
	"name": "Био-марсианский краторный бургер",
	"createdAt": "2023-09-11T17:37:13.717Z",
	"updatedAt": "2023-09-11T17:37:13.985Z",
	"number": 20247
};

export const ordersData = {
	orders: [ {
		"_id": "64ff520b6d2997001caa818f",
		"ingredients": [ "643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa093f", "643d69a5c3f7b9001cfa093d" ],
		"status": "done",
		"name": "Бессмертный флюоресцентный бургер",
		"createdAt": "2023-09-11T17:44:43.323Z",
		"updatedAt": "2023-09-11T17:44:43.618Z",
		"number": 20251
	},
		{
			"_id": "64ff50ed6d2997001caa8187",
			"ingredients": [ "643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0946", "643d69a5c3f7b9001cfa093d" ],
			"status": "done",
			"name": "Минеральный флюоресцентный бургер",
			"createdAt": "2023-09-11T17:39:57.874Z",
			"updatedAt": "2023-09-11T17:39:58.123Z",
			"number": 20250
		},
		{
			"_id": "64ff50b36d2997001caa8185",
			"ingredients": [ "643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093d" ],
			"status": "done",
			"name": "Люминесцентный флюоресцентный бургер",
			"createdAt": "2023-09-11T17:38:59.138Z",
			"updatedAt": "2023-09-11T17:38:59.410Z",
			"number": 20249
		}
	],
	total: 19921,
	totalToday: 93,
	success: true
};