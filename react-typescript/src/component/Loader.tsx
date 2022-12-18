import styled from "styled-components";
import loadingImg from "../image/loading.gif";



export function Loader(){
	const LoadStyle = styled.div`
		width:200px;
		height:200px;
		margin:0 auto;
		img{
			width:100%;
			height:100%;
		}
	`
	return(
		<LoadStyle>
			<img src={loadingImg} alt="" />
		</LoadStyle>
	)
}