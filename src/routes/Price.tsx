import {useQuery} from "react-query";
import { fetchCoinTickers } from "../api";
import ApexChart from "react-apexcharts";

interface PriceProps{
    coinId:string;
    isDark:boolean;
}
interface IPriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{
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
        }
    };
}
function Price({coinId, isDark}:PriceProps){
    const {isLoading, data:priceData} = useQuery<IPriceData>(
        ["tickers", coinId], 
        () => fetchCoinTickers(coinId));
    return <div>
        {
            isLoading?
            "Loading price..."
            :
            <ApexChart
                type="bar"
                series={[{
                    name: "changed",
                    data: [
                        priceData?.quotes.USD.percent_change_1y,
                        priceData?.quotes.USD.percent_change_30d,
                        priceData?.quotes.USD.percent_change_7d,
                        priceData?.quotes.USD.percent_change_24h,
                        priceData?.quotes.USD.percent_change_12h,
                        priceData?.quotes.USD.percent_change_6h,
                        priceData?.quotes.USD.percent_change_1h,
                        priceData?.quotes.USD.percent_change_30m,
                        priceData?.quotes.USD.percent_change_15m,
                    ]
                }]}
                options={{
                    title:{
                        text: "Percent Change",
                        style: {
                            fontSize:  '14px',
                            fontWeight:  'bold',
                            fontFamily: 'Source Sans Pro',
                          },
                    },
                    theme:{
                        mode: isDark? "dark":"light"
                    },
                    chart:{
                        height: 300,
                        width: 500,
                        type: "bar",
                        background: "transparent"
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 10,
                        dataLabels: {
                          position: 'top', // top, center, bottom
                        },
                      }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val) {
                            return val + "%";
                        },
                        offsetY: -20,
                        style: {
                            fontSize: '12px',
                            colors: [isDark? "white" : "black"]
                        }
                    },
                    xaxis:{
                        type: 'category',
                        categories: ['1yr', '30d', '7d', '24h', '12h', '6h','1h', '30m', '15m'],
                    }
                }}
            />
        }
    </div>;
}
export default Price;