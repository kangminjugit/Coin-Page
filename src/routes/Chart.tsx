import { fetchCoinHistory } from "../api";
import {useQuery} from "react-query";
import ApexChart from "react-apexcharts";
import { ThemeProvider } from "styled-components";

interface ChartProps{
    coinId:string;
    isDark:boolean;
}

interface IHistorical{
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number; 
}

function Chart({coinId, isDark}:ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId], 
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        });
    return(
        <div>
            {isLoading? 
                "Loading chart..." 
                : 
                <ApexChart 
                
                    type="candlestick" 
                    series={[
                        {
                            name: "Price",
                            data: data?.map(price => ({
                                x: new Date(price.time_close),
                                y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
                            }))
                        }
                    ]}
                    options={{
                        title:{
                            text: "Price Chart",
                            style: {
                                fontSize:  '14px',
                                fontWeight:  'bold',
                                fontFamily: 'Source Sans Pro',
                              },
                        },
                        theme:{
                            mode: isDark? "dark" : "light"
                        },
                        chart:{
                            height:300,
                            width:500,
                            background: "transparent"
                        },
                        xaxis:{
                            type: 'datetime'
                        },
                        yaxis:{
                            show: false
                        },
                        plotOptions: {
                            candlestick: {
                              colors: {
                                upward: '#3C90EB',
                                downward: '#DF7D46'
                              },
                              wick: {
                                useFillColor: true,
                              }
                            }
                          }
                }}/>}
        </div>
    )
}
export default Chart;
