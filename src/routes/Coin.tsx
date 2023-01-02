import { useParams } from "react-router-dom";

const Coin = () => {
  const { coinId } = useParams();
  return (
    <div>
      <span>Coin id: ${coinId}</span>
    </div>
  );
};

export default Coin;
