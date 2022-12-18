
import styled from "styled-components";
import { Link } from "react-router-dom"
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { fetchCoins } from "../api";
import { Loader } from "../component/Loader";
import { ToggleBtn } from "../component/ToggleBtn";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
	padding: 0px 20px;
	max-width:480px;
	margin:0 auto;
`;

const Header = styled.header`
	position:relative;
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 48px;
	font-weight:bold;
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
	background-color: ${(props) => props.theme.cardColor};
	color: ${props => props.theme.textColor};
	border-radius: 15px;
	margin-bottom: 10px;
	transition:background-color 0.3s ease 0s, box-shadow 0.3s ease 0s;
	a {
		display:flex;
		align-items:center;
		padding: 20px;
		transition: color 0.2s ease-in;
		font-size:20px;
	}
	&:hover{
		box-shadow:rgb(10 10 10 / 20%) 0px 0.2rem 0.75rem;
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
	
	const {isLoading, data} = useQuery<Icoin[]>("allcoins", fetchCoins);
	return (
		<Container>
			<Helmet>
				<title>Coins</title>
			</Helmet>
			<Header>
				<Title>Coins</Title>
				<ToggleBtn />
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