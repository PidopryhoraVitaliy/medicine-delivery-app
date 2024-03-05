import { useEffect, useState } from "react";
import useDeliveryService from "../../services/DeliveryService";

const DrugStoresPage = () => {
    const [shops, setShops] = useState([]);
    const [currentShop, setCurrentShop] = useState('');

    const { getShops, status, setStatus } = useDeliveryService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        getShops()
            .then(data => {
                setShops(data);
                if (data.length > 0) {
                    changeCurrentShop(data[0]._id);
                }
            })
            .then(() => setStatus('confirmed'));
    }

    const changeCurrentShop = (id) => {
        setCurrentShop(id);
    }

    const shopsElements = shops.map(shop => {
        const className = "btn btn-block btn-primary " + ((currentShop === shop._id) ? "active" : "");
        return <li className={className} key={shop._id}>{shop.title}</li>;
    })

    return (
        <div className="row" style={{ marginLeft: '2px' }}>
            <div className="col-sm-2">
                <ul className="btn-group-vertical">Shops:
                    {shopsElements}
                </ul>
            </div>
            <div className="col-sm-8">.col-sm-8</div>
        </div>
    )
}

export default DrugStoresPage;