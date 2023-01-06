import axios from "axios";
import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { state } = useLocation();
  const { coinId } = useParams();

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // 타입을 선언해주면 빈 객체를 넣어주는 등 초기화 해줄 때 에러 발생
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  // 의존성 배열 추가해야 함
  // 실습에서는 컴포넌트 마운트 최초 1회 렌더링 되도록 처리하여 의존성 배열 생략
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const infoData = await axios(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const priceData = await axios(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );
      setInfo(infoData.data);
      setPriceInfo(priceData.data);
      setIsLoading(false);
    })();
  }, []);

  console.log(chartMatch);
  return (
    <Wrapper>
      <Title>{state?.name ? state?.name : "LOADING..."}</Title>
      {!isLoading ? (
        <>
          <div className="tap">
            <div className="tap_innerWrap">
              <span className="sub_title">Rank</span>
              <span>{info?.rank}</span>
            </div>
            <div className="tap_innerWrap">
              <span className="sub_title">SYMBOL</span>
              <span>{info?.symbol}</span>
            </div>
            <div className="tap_innerWrap">
              <span className="sub_title">Open Source</span>
              <span>{info?.open_source ? "YES" : "NO"}</span>
            </div>
          </div>
          <Description>{info?.description}</Description>
          <div className="tap">
            <div className="tap_innerWrap">
              <span className="sub_title">TOTAL SUPLY</span>
              <span>{priceInfo?.total_supply}</span>
            </div>
            <div></div>
            <div className="tap_innerWrap">
              <span className="sub_title">MAX SUPPLY</span>
              <span>{priceInfo?.max_supply}</span>
            </div>
          </div>
        </>
      ) : (
        "loading..."
      )}

      <SubWrapper>
        <MenuButton>
          <Tap isActive={priceMatch !== null ? true : false}>
            <Link to={`/${coinId}/price`}>price</Link>
          </Tap>
          <Tap isActive={chartMatch !== null ? true : false}>
            <Link to={`/${coinId}/chart`}>chart</Link>
          </Tap>
        </MenuButton>
        <SubContent>
          <Routes>
            <Route path={"/chart"} element={<Chart />} />
            <Route path={"/price"} element={<Price />} />
          </Routes>
        </SubContent>
      </SubWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40rem;
  margin: 0 auto;
  color: ${(props) => props.theme.accentColor};

  .tap {
    display: flex;
    width: 95%;
    border-radius: 15px;
    padding: 1rem;

    background-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.textColor};
    /* background-color: ${(props) => props.theme.bgColor}; */
    div {
      text-align: center;
    }
  }

  .tap {
    div {
      width: 33%;
    }
  }

  .tap_innerWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tap_innerWrap .sub_title {
    display: block;
    margin-bottom: 1rem;

    color: ${(props) => props.theme.bgColor};
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: bold;
  padding: 2rem 0;
  display: block;
`;

const Description = styled.div`
  padding: 1.5rem;
  color: #fff;
`;

const SubWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
  padding: 1rem;
`;

const MenuButton = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
`;

const Tap = styled.div<{ isActive: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.isActive ? "#202e3c" : props.theme.accentColor};
  font-weight: bold;
  font-size: 1.2rem;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  padding: 0.5rem;

  a {
    color: ${(props) => (props.isActive ? "#148972" : props.theme.bgColor)};
  }
`;

const SubContent = styled.div`
  border: 2px solid ${(props) => props.theme.accentColor};

  padding: 1rem;
  box-sizing: border-box;
  color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
export default Coin;
