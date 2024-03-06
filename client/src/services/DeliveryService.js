import { useHttp } from "../hooks/http.hook";

const useDeliveryService = () => {

    const { request, clearError, status, setStatus } = useHttp();

    const _apiBase = `http://localhost:5000/`;

    const getShops = async () => {
        console.log('getShops', new Date().toLocaleTimeString());
        const res = await request(`${_apiBase}shops/`);
        return res;
    }

    const getShopData = async (id) => {
        console.log('getShopData', new Date().toLocaleTimeString());
        const res = await request(`${_apiBase}shops/${id}`);
        return res;
    }

    const sendOrder = async (data) => {
        const res = await request(`${_apiBase}orders/`, 'POST', JSON.stringify(data));
        console.log(data);
        return res;
    }

    return { clearError, status, setStatus, getShops, getShopData, sendOrder }
}

export default useDeliveryService;