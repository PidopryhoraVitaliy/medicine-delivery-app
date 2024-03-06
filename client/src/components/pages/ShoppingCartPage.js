import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import pills from '../../resources/pills.png';

const ShoppingCartPage = ({ addOrderedItems, removeOrderedItems, orderedItems = [] }) => {

    const itemsElements = orderedItems.map(item => {
        return <Card key={item._id} style={{ padding: '10px' }}>
            <Card.Img variant="top" src={pills} style={{ width: '10rem', padding: '10px' }} />
            <Card.Body>.
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                <InputGroup>
                    <Form.Control
                        placeholder="Count"
                        aria-label="Items count"
                        value={item.count}
                        onChange={() => addOrderedItems(item, 10)}
                    />
                    <Button variant="outline-secondary" onClick={() => addOrderedItems(item, -1)}>&#60;</Button>
                    <Button variant="outline-secondary" onClick={() => addOrderedItems(item, 1)}>&#62;</Button>
                    <Button variant="outline-secondary" onClick={() => removeOrderedItems(item)}>delete</Button>
                </InputGroup>

            </Card.Body>
        </Card>
    })

    return (
        <div className="row" style={{ margin: 'auto' }}>
            <div className="col-sm-4">
            </div>
            <div className="col-sm-4 order-items-conteiner">
                {itemsElements}
            </div>
        </div>
    )
}

export default ShoppingCartPage;
