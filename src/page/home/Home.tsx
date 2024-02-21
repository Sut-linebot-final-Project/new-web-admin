import BarChartBox from "../../components/barChartBox/BarChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import {
  barChartBoxIntent,

} from "../../data";
import "./home.scss";

import Example from "../../components/barChart/BarChat";
import { Paper, styled } from "@mui/material";

const BodyPaper = styled(Paper)(({ theme }) => ({
  // width: '100%',
  // height: '80vh',
  marginLeft: '100px',
  marginRight: '100px',
  marginTop: '50px',
  overflow: 'true',
  padding: theme.spacing(2),
  ...theme.typography.body2,

}));
const Home = () => {
  return (
    <div >

      <BodyPaper>
        <h1>Top 3 of Intent</h1>
        <Example />
      </BodyPaper>

      <BodyPaper>
        <PieChartBox />
        </BodyPaper>

      <BodyPaper>
        <BarChartBox {...barChartBoxIntent} />
        </BodyPaper>
    </div>
  );
};

export default Home;
