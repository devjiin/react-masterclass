import { useParams } from "react-router";

interface Params {
	coinId: string;
}

function Coin() {
	const { coinId } = useParams() as unknown as Params;
	return <h1>Conin {coinId}</h1>
}

export default Coin;