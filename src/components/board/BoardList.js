import React, { useState } from 'react';
import Card from './Card';
import { Col, Row,Button, Form } from 'react-bootstrap';
import CreateBoardModal from '../Model'
import {RandomId} from '../../utils/RandomId'
import {setAuthDetails,getBoardDetails} from '../../utils/Storage'

const BoardList = ({listId,list,boardId}) => {
    const [cardTitle, setCardTitle] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const [showModal,setShowModal]   = useState(false)

    const handleCreateCard = ()=>{
        const randomId = RandomId(6);
        const updatedList = [...list.card, { title: cardTitle,description:cardDescription, id: randomId}];
        list.card = updatedList
        let board_details   = getBoardDetails('board')
        let filterData      = board_details.filter((item) => item.id === parseInt(boardId))
        let filterList      = filterData[0].list.filter((item) => item.id !== parseInt(listId))
        let addNewList      = [...filterList,list]
        filterData[0].list  = addNewList
        let allBoard        = board_details.filter((item) => item.id !== parseInt(boardId))
        let new_data        = [...allBoard,filterData[0]]
        setAuthDetails('board',JSON.stringify(new_data))
        setShowModal(false)
        setCardDescription('')
        setCardTitle('')
    }

    const cardModelHandler = ()=>{
        setShowModal(true)
    }

    return (
        <>
        <div className="list">
            <Row className='title'>
                <Col md={{span:6}}>
                    <h4>{list.title}</h4>
                </Col>
                <Col md={{span:6}}>
                    <span onClick={cardModelHandler}>Create card</span>
                </Col>
            </Row>
            <div className="cards-container">
                {list.card.map((card, index) => (
                    <Card
                        key={index}
                        cardId={card.id}
                        cardIndex={index}
                        card={card}
                    />
                ))}
            </div>
        </div>
        <CreateBoardModal title='Create card' show={showModal} onClose={() => setShowModal(false)}>
            <Form.Group controlId="boardName">
                <Form.Label> Card title</Form.Label>
                <Form.Control
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                placeholder="Enter Card title"
                />
            </Form.Group>
            <Form.Group controlId="boardName">
                <Form.Label>Card description</Form.Label>
                <Form.Control
                type="text"
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                placeholder="Enter Card Description"
                />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={handleCreateCard}>Create Card</Button>
        </CreateBoardModal>
    </>
    );
};

export default BoardList;
