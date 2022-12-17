
import styled from "styled-components";
import { Link } from "react-router-dom"
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchCoins } from "../api";
import { Loader } from "../component/Loader";

const Container = styled.div`
	padding: 0px 20px;
	max-width:480px;
	margin:0 auto;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${props => props.theme.accentColor};
`

const CoinList = styled.ul`
`;

const Img = styled.img`
	width:25px;
	height:25px;
	margin-right:10px;
`

const Coin = styled.li`
	background-color: white;
	color: ${props => props.theme.textColor};
	border-radius: 15px;
	margin-bottom: 10px;
	a {
		display:flex;
		align-items:center;
		padding: 20px;
		transition: color 0.2s ease-in;
	}
	&:hover{
		a{
			color: ${props => props.theme.accentColor}
		}
	}

`;

interface Icoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
	/* const [coins, setCoins] = useState<Icoin[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(()=> {
		(async () => {
			const response = await fetch("https://api.coinpaprika.com/v1/coins");
			const json = await response.json();
			setCoins(json.slice(0, 100));
			setLoading(false);
		})();
	},[]) */
	const {isLoading, data} = useQuery<Icoin[]>("allcoins", fetchCoins)
	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
			</Header>
			{isLoading ? (
				<Loader/>
			) : 
			(
			<CoinList>
				{data?.slice(0, 100).map((coin) => (
					<Coin key={coin.id} >
						<Link to={{
							pathname : `/${coin.id}`,
							state : {name : coin.name}
						}}>
							<Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
							{coin.name} &rarr; 
						</Link>
					</Coin>
				))}
			</CoinList>
			)}
		</Container>
	)
}

export default Coins;