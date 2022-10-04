import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
  bgColor: string;
  borderColor ?: string;
  text ?:string;
}

const Container = styled.div<CircleProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border:1px solid ${(props) => props.borderColor}
`;

function Circle({ bgColor, borderColor, text = "default" }: CircleProps) {
	const [counter, setValue] = useState<number|string>(1);
	setValue(1);
	setValue("string");
	// setValue(true); : boolean은 지정 안해줬기 때문에 에러뜸
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} >{text}</Container>;
}

export default Circle;