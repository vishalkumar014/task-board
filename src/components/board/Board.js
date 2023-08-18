import React, { useState, useEffect } from 'react';
import BoardList from './BoardList';
import { useParams } from 'react-router-dom';
import { filterBoardDetailsById, getBoardDetails } from '../../utils/Storage'
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import CreateBoardModal from '../Model'
import { RandomId } from '../../utils/RandomId'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
const Board = () => {

    const { id } = useParams();
    const [board, setBoard] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [boardId, setBoardId] = useState(0);
    const [listTitle, setListTitle] = useState('');

    useEffect(() => {
        const filter_board = filterBoardDetailsById(id)
        setBoard(filter_board)
        setBoardId(id)
    }, [id]);

    const listModelHandler = () => {
        setShowModal(true)
    }

    const handleCreateList = () => {
        const randomId = RandomId(5);
        const updatedList = [...board[0].list, { title: listTitle, id: randomId, card: [] }];
        board[0].list = updatedList
        let board_details = getBoardDetails('board')
        let filterData = board_details.filter((item) => item.id !== parseInt(boardId));
        let new_data = [...filterData, board[0]]
        localStorage.setItem('board', JSON.stringify(new_data))
        setShowModal(false)
        setListTitle('')
    };

    const handleDragEnd = (result) => {
        console.log(result)
        if (!result.destination) {
            return;
        }
        const source = result.source;
        const destination = result.destination;
        let sourceDroppableId = parseInt(source.droppableId.replace("a-", ""))
        let destinationDroppableId = parseInt(destination.droppableId.replace("a-", ""))

        handleCardMove(sourceDroppableId, destinationDroppableId, parseInt(result.draggableId));
    };

    const handleCardMove = (sourceListId, destinationListId, cardId) => {
        const allBoards = getBoardDetails('board');
        
        const boardToUpdate = allBoards.find(board => board.id === parseInt(boardId));
        
        if (!boardToUpdate) {
            console.log('Board not found.');
            return;
        }
    
        const sourceList = boardToUpdate.list.find(list => list.id === sourceListId);
        const destinationList = boardToUpdate.list.find(list => list.id === destinationListId);
        
        if (!sourceList) {
            console.log('Source list not found.');
            return;
        }
        
        const movedCardIndex = sourceList.card.findIndex(card => card.id === cardId);
        
        if (movedCardIndex === -1) {
            console.log('Card not found in the source list.');
            return;
        }
        
        const movedCard = sourceList.card.splice(movedCardIndex, 1)[0];
        destinationList.card.push(movedCard);
    
        setBoard(allBoards);
        localStorage.setItem('board', JSON.stringify(allBoards));
    };
    

    return (
        <div>
            <Container className="boards-container">
                <Row>
                    <Col md={{ span: 12 }}>
                        <Row className='board_view'>
                            <DragDropContext onDragEnd={handleDragEnd} key={"dragdrocontext"}>
                                {
                                    board.map((item, index) => (
                                        item.list.map((data, index) => {
                                            return (
                                                <Droppable droppableId={"a-"+data.id} type="CARD" key={'board' + index}>
                                                    {(provided) => (
                                                        <Col md={{ span: 3 }} key={index} className="board" ref={provided.innerRef} {...provided.droppableProps}>
                                                            <BoardList listId={data.id} boardId={boardId} list={data} />
                                                            {provided.placeholder}
                                                        </Col>
                                                    )}
                                                </Droppable>
                                            )
                                        })
                                    ))
                                }
                            </DragDropContext>
                        </Row>
                    </Col>
                    <Col md={{ span: 12 }}>
                        <div>
                            <Button onClick={listModelHandler}>Create List</Button>
                        </div>
                    </Col>
                </Row>
                <CreateBoardModal title='Create new list' show={showModal} onClose={() => setShowModal(false)}>
                    <Form.Group controlId="boardName">
                        <Form.Label>List title</Form.Label>
                        <Form.Control
                            type="text"
                            value={listTitle}
                            onChange={(e) => setListTitle(e.target.value)}
                            placeholder="Enter List title"
                        />
                    </Form.Group>
                    <Button variant="primary" className="mt-3" onClick={handleCreateList}>Create List</Button>
                </CreateBoardModal>
            </Container>
        </div>
    );
};

export default Board;
