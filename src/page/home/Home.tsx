import React from "react";
import { Paper, styled } from "@mui/material";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import axios from "axios";
import { url } from "../../service/serviceUrl";

const BodyPaper = styled(Paper)(({ theme }) => ({
  marginLeft: '100px',
  marginRight: '100px',
  marginTop: '60px',
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));
interface Icountres {
  intent: string,
  response: string
}
const Home = () => {
  const [countRes, setCountRes] = React.useState<Icountres[]>([])
  
  async function getCountRes() {
    const apiUrl = `${url}/pg/countRes`;
    axios.get(apiUrl)
      .then(response => {
        console.log('API Response:', response.data);
        setCountRes(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }
  React.useEffect(() => {
    getCountRes();
    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    // Add data
    chart.data = countRes

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "response";
    pieSeries.dataFields.category = "intent";

    // Clean up function
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div>
      <BodyPaper>
        <h2>การตอบกลับทั้งหมด</h2>
        <div id="chartdiv" style={{ height: "400px" }}></div>
      </BodyPaper>
    </div>
  );
};

export default Home;
