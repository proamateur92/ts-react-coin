import { useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
const Coin = () => {
  const { coinId } = useParams();
  return (
    <div>
      <Title>코인</Title>
      <Title>Coin id: ${coinId}</Title>
    </div>
  );
};

export default Coin;
