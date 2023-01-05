import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const List = styled.ul``;

const Item = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  font-weight: bold;
  a {
    display: flex;
    align-items: center;

    padding: 20px;
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.div`
  text-align: center;
`;

const ImageWrapper = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 1rem;
`;

const Coins = () => {
  interface coinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
  }

  const [coins, setCoins] = useState<coinInterface[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
        const response = await axios.get(
          "https://api.coinpaprika.com/v1/coins"
        );

        setCoins(response.data.slice(0, 100));
        setLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {loading && <Loader>Loading...</Loader>}
      {!loading && (
        <List>
          {coins.map((coin) => (
            <Item key={coin.id}>
              <Link to={`/${coin.name}`}>
                <ImageWrapper
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Coins;
