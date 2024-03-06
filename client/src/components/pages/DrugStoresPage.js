import { useEffect, useState } from "react";
import useDeliveryService from "../../services/DeliveryService";

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

import pills from '../../resources/pills.png';

const DrugStoresPage = ({ addOrderedItems, removeOrderedItems, orderedItems = [] }) => {
    const [shops, setShops] = useState([]);
    const [items, setItems] = useState([]);
    const [currentShop, setCurrentShop] = useState('');

    const { getShops, getShopData } = useDeliveryService();

    useEffect(() => {
        getShopsList();
    }, []);

    const getShopsList = () => {
        getShops()
            .then(data => {
                setShops(data);
                if (data.length > 0) {
                    changeCurrentShop(data[0]._id);
                }
            })
    }

    const changeCurrentShop = (id) => {
        setCurrentShop(id);
        if (!id) {
            setItems([]);
            return;
        }
        getShopData(id)
            .then(data => {
                setItems(data.items);
            })
    }

    const shopsElements = shops.map(shop => {
        const isActive = currentShop === shop._id;
        return <ListGroup.Item
            variant="primary"
            action
            active={isActive}
            key={shop._id}
            onClick={() => changeCurrentShop(shop._id)}>
            {shop.title}
        </ListGroup.Item>
    })

    const itemsElements = items.map(item => {
        const foundItem = orderedItems.find(i => i._id === item._id);
        const border = (foundItem) ? 'success' : '';
        return <Card key={item._id} style={{ padding: '10px', borderInlineWidth: '2px' }} border={border}>
            <Card.Img variant="top" src={pills} style={{ width: '10rem', padding: '10px' }} />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <Button variant="primary" onClick={() => addOrderedItems(item)}>add to Cart</Button>
                <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={() => removeOrderedItems(item)}>remove</Button>
            </Card.Body>
        </Card>
    })

    return (
        <div className="row" style={{ margin: 'auto' }}>
            <div className="col-sm-2">
                <ListGroup>
                    <span>Shops:</span>
                    {shopsElements}
                </ListGroup>
            </div>
            <div className="col-sm-6 order-items-conteiner">
                {itemsElements}
            </div>
        </div>
    )
}

export default DrugStoresPage;