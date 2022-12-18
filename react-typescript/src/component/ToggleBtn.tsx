import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { useState } from "react";


const ToggleWrap = styled.div`
	position:absolute;
	top:10px;
	right:0;
`


const ToggleTrack = styled.div`
	display:block;
	background-color: #4d4d4d;
	border-radius: 30px;
	height: 40px;
	transition: .2s;
	width: 76px;
`

const ToggleInput = styled.input`
	clip: rect(0 0 0 0);
	border: 0;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	position: absolute;
	width: 1px;
	&:checked {
		border:1px solid red;
	}
`

const LightIconWrap = styled.span`
	bottom: 0;
	height: 15px;
	margin: auto 0;
	top: 0;
	position: absolute;
	left: 11px;
	width: 28px;
`
const DarkIconWrap = styled.span`
	bottom: 0;
	height: 15px;
	margin: auto 0;
	top: 0;
	position: absolute;
	right: 15px;
	width: 15px;
`
const Icon = styled.span`
	align-items: center;
	display: flex;
	height: 15px;
	justify-content: center;
	width: 15px;
	font-size:20px;
`

const ToggleThumb = styled.button`
	background-color: #fafafa;
	border: 1px solid #4d4d4d;
	border-radius: 50%;
	height: 38px;
	left: 1px;
	position: absolute;
	top: 1px;
	transition: .25s;
	width: 38px;
	cursor:pointer;
	&:hover{
		box-shadow:0 0 2px 3px #4169e1;
	}
	&.active {
		left:37px;
	}
`

export function ToggleBtn() {
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
	const [isToggle, setIsToggle] = useState(false);
	const handleClick = () => {
		setIsToggle(current => !current);
	}
	return(
		<>
			{/* <button onClick={toggleDarkAtom}>toggle button</button> */}
			<ToggleWrap>
				<ToggleTrack>
					
					<LightIconWrap><Icon>🌞</Icon></LightIconWrap>
					<DarkIconWrap><Icon>🌜</Icon></DarkIconWrap>
					<ToggleThumb className={isToggle ? 'active' : ''} onClick={() => {toggleDarkAtom();handleClick(); }}><ToggleInput /></ToggleThumb>
				</ToggleTrack>
			</ToggleWrap>
		</>
	)
}