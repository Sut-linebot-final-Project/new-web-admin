import { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    intent: 'Default Fallback Intent',
    log: 5, 
  },
  {
    intent: 'Default Welcome Intent',
    log: 3, 
  },
  {
    intent: 'Bye',
    log: 1, 
  },


];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          
          <XAxis dataKey="intent" />
          <YAxis dataKey="log"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="log" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}