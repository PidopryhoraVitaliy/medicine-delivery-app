import { useEffect, useState } from "react";
import useDeliveryService from "../../services/DeliveryService";

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

import pills from '../../resources/pills.png';
import { ButtonGroup, Col, Container, Row, Form } from "react-bootstrap";

const DrugStoresPage = ({ orderedItems = [], addOrderedItems, removeOrderedItems, starItems = [], toggleStarItems }) => {
    const [shops, setShops] = useState([]);
    const [items, setItems] = useState([]);
    const [currentShop, setCurrentShop] = useState('');

    const [sorting, setSorting] = useState('');

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

    const sortedItems = [...items];
    if (sorting) {
        const sortingMark = (sorting === 'up') ? 1 : -1;
        sortedItems.sort((a, b) => {
            const aStar = starItems.includes(a._id);
            const bStar = starItems.includes(b._id);
            if (aStar === bStar) return sortingMark * (a.price - b.price);
            if (aStar) return -1;
            if (bStar) return 1;
        });
    }

    const itemsElements = sortedItems.map(item => {
        const foundItem = orderedItems.find(i => i._id === item._id);
        const border = (foundItem) ? 'success' : '';
        const isAdded = (foundItem) ? true : false;
        const isStar = starItems.includes(item._id);
        const starBtnVariant = (isStar) ? "primary" : "outline-primary";
        return <Card key={item._id} style={{ padding: '10px', borderInlineWidth: '2px' }} border={border}>
            <Card.Img variant="top" src={pills} style={{ width: '6rem' }} />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <h6>price: {item.price}</h6>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <Button variant={starBtnVariant} onClick={() => toggleStarItems(item)}>&#11088;</Button>
                <Button variant="primary" style={{ marginLeft: '10px' }} onClick={() => addOrderedItems(item)}>add to Cart</Button>
                {isAdded ? <Button variant="secondary" style={{ marginLeft: '10px' }} onClick={() => removeOrderedItems(item)}>remove</Button> : null}
            </Card.Body>
        </Card>
    })

    const commonStyles = { height: '90vh', overflow: 'auto', padding: '10px' };

    const handleSorting = (direction) => {
        if (direction === sorting) {
            setSorting('');
        } else {
            setSorting(direction);
        }
    }

    return (
        <Container style={{ height: '92vh', border: 'solid', borderWidth: '1px', borderRadius: '10px', paddingTop: '5px', paddingLeft: '15px', paddingRight: '17px' }}>
            <Row>
                <Col className="col-sm-3 shop-col" style={{ ...commonStyles }}>
                    <ListGroup>
                        <h5>Shops:</h5>
                        {shopsElements}
                    </ListGroup>
                    <Form.Group className="mb-3" controlId="sort" style={{ paddingTop: '20px' }}>
                        <Form.Label>Sort by price:</Form.Label>
                        <ButtonGroup size="sm" aria-label="sort" style={{ paddingLeft: '10px' }}>
                            <Button variant={(sorting === 'up') ? "secondary" : "outline-secondary"} onClick={() => handleSorting('up')}  >up</Button>
                            <Button variant={(sorting === 'down') ? "secondary" : "outline-secondary"} onClick={() => handleSorting('down')}  >down</Button>
                        </ButtonGroup>
                    </Form.Group>
                </Col>
                <Col className="col-sm-9 shop-col shop-items-conteiner" style={{ ...commonStyles, padding: '10px' }}>
                    {itemsElements}
                </Col>
            </Row>
        </Container>
    )
}

export default DrugStoresPage;