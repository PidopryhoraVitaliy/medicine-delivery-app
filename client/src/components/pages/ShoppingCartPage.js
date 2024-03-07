import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import useDeliveryService from '../../services/DeliveryService';
import pills from '../../resources/pills.png';

const ShoppingCartPage = ({ orderedItems = [], addOrderedItems, removeOrderedItems, setCountOrderedItems, clearOrderedItems }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) { return; }
        if (userData.name) { setName(userData.name); }
        if (userData.email) { setEmail(userData.email); }
        if (userData.phone) { setPhone(userData.phone); }
        if (userData.address) { setAddress(userData.address); }
    }, []);

    useEffect(() => {
        const userData = { name, email, phone, address };
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [name, email, phone, address]);

    const [sendingStatus, setSendingStatus] = useState('idle');
    const [orderId, setOrderId] = useState('');

    const { sendOrder } = useDeliveryService();

    const orderedItemsElements = orderedItems.map(item => {
        return <Card key={item._id} style={{ padding: '10px', flexDirection: 'row', alignItems: 'center' }}>
            <Card.Img variant="top" src={pills} style={{ width: '10rem', padding: '10px' }} />
            <Card.Body>.
                <Card.Title>{item.title}</Card.Title>
                <h6>price: {item.price}</h6>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <InputGroup>
                    <InputGroup.Text id="basic-addon1">Qty:</InputGroup.Text>
                    <Form.Control
                        placeholder="Count"
                        aria-label="Items count"
                        type="number"
                        value={item.count}
                        onChange={(e) => setCountOrderedItems(item, e.target.value)}
                    />
                    <Button variant="outline-secondary" onClick={() => addOrderedItems(item, -1)}>&#60;</Button>
                    <Button variant="outline-secondary" onClick={() => addOrderedItems(item, 1)}>&#62;</Button>
                    <Button variant="outline-secondary" onClick={() => removeOrderedItems(item)}>delete</Button>
                </InputGroup>
            </Card.Body>
        </Card>
    });

    const totalPrice = orderedItems.reduce((total, item) => total + item.count * item.price, 0);

    const onSubmit = (e) => {
        e.preventDefault();
        const order = { name, email, phone, address, items: orderedItems }
        sendOrder(order)
            .then((data) => {
                clearOrderedItems();
                setSendingStatus('fulfilled');
                setOrderId(data._id);
            }).catch((e) => {
                console.log(e);
                setSendingStatus('rejected');
            })
    }

    const alertStyles = { maxHeight: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }

    const commonStyles = { height: '80vh', overflow: 'auto' };

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Row style={{ height: '82vh', border: 'solid', borderWidth: '1px', borderRadius: '10px', paddingTop: '5px', paddingLeft: '15px', paddingRight: '17px' }}>
                    <Col style={{ ...commonStyles }}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Full name" required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" placeholder="+38 xxx xxxxxxx" required
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} required
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col className="cart-items-conteiner" style={{ ...commonStyles }}>
                        <Alert variant='success' show={sendingStatus === 'fulfilled'} style={alertStyles}>
                            Success!
                            <p>Your order id: <b>{orderId}</b></p>
                        </Alert>
                        <Alert variant='danger' show={sendingStatus === 'rejected'} style={alertStyles}>
                            There is some problem with the connection or server. Try later!
                        </Alert>
                        {orderedItemsElements}
                    </Col>
                </Row>
                <Row>
                    <Form.Group
                        className="mb-3"
                        controlId="submit"
                        style={{ padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', alignItems: 'baseline' }}>
                        <Form.Label style={{ paddingRight: '50px' }}><h5>Total price: {totalPrice}</h5></Form.Label>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    );
}

export default ShoppingCartPage;
