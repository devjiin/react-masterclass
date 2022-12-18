import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface Ihistorical {
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}
interface ChartProps {
	coinId: string;
}
function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<Ihistorical[]>(["ohlcv", coinId], () =>
		fetchCoinHistory(coinId),
		{
			refetchInterval: 5000
		}
	);
	const isDark = useRecoilValue(isDarkAtom);

	let validData = data ?? [];
	if ("error" in validData) {
		validData = [];
	}
	return (
		<div>
			{isLoading ? (
				"loading chart..."
			) : (
				<>
				<ApexChart
					type="line"
					series={[
						{
							name: "price",
							data:
								data?.map((price) => parseFloat(price.close)) ??
								[],
						}, //니꼬쌤 제공 api는 강의와 달라 close값이 string이기 때문에 정수로 변환해줘야 한다. (?? null 병합 연산자)
					]}
					options={{
						theme: { mode: isDark ? "dark" : "light" },
						chart: {
							height: 500,
							width: 500,
							toolbar: { show: false },
							background: "transparent",
						},
						grid: { show: false },
						stroke: { curve: "smooth", width: 4 },
						yaxis: { show: false },
						xaxis: {
							labels: {
								show: false,
							},
							axisTicks: { show: false },
							axisBorder: { show: false },
							type: "datetime",
							categories: data?.map((price) =>
								new Date(price.time_close * 1000).toISOString()
							),
						},
						fill: {
							type: "gradient",
							gradient: {
								gradientToColors: ["#0be881"],
								stops: [0, 100],
							},
						},
						colors: ["#0fbcf9"],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>

				<ApexChart
						type="candlestick"
						series={[
							{
								name: "시세",
								data: validData.map((price) => ({
									x: price.time_close * 1000,
									y: [price.open, price.high, price.low, price.close],
								})),
							},
						]}
						width="100%"
						height="160px"
						options={{
							noData: {
								text: "",
							},
							plotOptions: {
								candlestick: {
									colors: {
										upward: "#f3214f",
										downward: "#33bd65",
									},
									wick: {
										useFillColor: true,
									},
								},
							},
							fill: {
								opacity: 0,
							},
							theme: {
								mode: isDark ? "dark" : "light",
							},
							chart: {
								toolbar: {
									show: false,
								},
								background: "transparent",
								fontFamily: '"Pretendard", sans-serif',
								width: 500,
								height: 300,
							},
							grid: {
								show: false,
							},
							tooltip: {
								y: {
									formatter: (value) => `$${value.toFixed(2)}`,
								},
							},
							xaxis: {
								labels: {
									show: false,
								},
								type: "datetime",
								categories: validData.map((price) => price.time_close * 1000),
								axisTicks: {
									show: false,
								},
								axisBorder: {
									show: false,
								},
								tooltip: {
									enabled: false,
								},
							},
							yaxis: {
								labels: {
									show: false,
								},
							},
							stroke: {
								width: 2,
							},
						}}
					/>
				</>
			)}
		</div>
	);
}

export default Chart;