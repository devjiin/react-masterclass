const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
	return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinID: string) {
	return fetch(`${BASE_URL}/coins/${coinID}`).then((response) => response.json());
}

export function fetchCoinTickers(coinID: string) {
	return fetch(`${BASE_URL}/tickers/${coinID}`).then((response) => response.json());
}

export function fetchCoinHistory(coinID: string) {
	const endDate = Math.floor(Date.now() / 1000); //니꼬쌤 자체 개발 api 에서는 endData, startDate 사용 X 
	const startData = endDate - 60 * 60 * 24 * 14;
	return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinID}`).then((response) => response.json());
}