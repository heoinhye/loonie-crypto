import axios from "axios";

export const getCryptoPrices = async () => {
    try{
        const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
        const response = await axios.get(API_URL, {
                params: {
                    vs_currency: 'cad',
                    ids: 'bitcoin,ethereum,tether,solana,binancecoin',
                    order: 'market_cap_desc',
                    per_page: 5,
                    page: 1,
                    sparkline: false
                }
            });

        return response.data;

    }catch(error){
        console.log('ERROR fetching data from CoinGecko:', error.message);
        throw new Error('Failed to retrieve cryptocurrency');
    }
}