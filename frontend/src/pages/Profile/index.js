import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Header from '../Header';
import {Container, Row, Col, Card, Button, CardColumns} from 'react-bootstrap';
import api from '../../services/api';
import {FiPower, FiTrash2, FiEdit, FiPlus} from 'react-icons/fi';
import "./styles.css";




export default function Profile() {
    const [notes, setNotes] = useState([]); 

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');



    useEffect(() => {
        api.get('home', {
            headers: {
                Authorization: userId
            }
        }).then(response =>{setNotes(response.data)})
    }, [userId]);

    async function HandleDeleteNotes(id) {
        try {
            await api.delete(`del/${id}`,{
                headers: {
                    Authorization: userId,
                }
            });
            setNotes(notes.filter(notes => notes.id !== id))
        } catch(err){
            alert("Erro ao deletar nota, tente novamente.");
        }
    }

    function HandleLogout() {
        localStorage.clear();

        history.push('/');
    }

    function AddAlterId(id) {
        localStorage.setItem('alterNote', id);
    }

    return (
        <Container>            
            <Header/>            
            <Row>
                <Col>
                    <Button className="float-right" onClick={HandleLogout} size="sm" variant="outline-danger"type="button">
                        <FiPower size={14}/>
                    </Button>
                    <span className="float-right name-span">Bem vindo(a), {userName}</span>                
                </Col>
            </Row>
            <hr></hr>

            <Row>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>
                            <Card.Title>Inserir nova Nota</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Subtitle>
                                Clique abaixo para criar uma nota.
                            </Card.Subtitle>
                        </Card.Body>
                        <Card.Footer>
                            <Link to="/create">
                                <Button size="lg" className="insert-button"variant="outline-primary">
                                    <FiPlus size={25}/>
                                </Button>
                            </Link>                            
                        </Card.Footer>                
                    </Card>        
                </Col>
            </Row>  
            <hr></hr>                        
            <CardColumns>       
                {notes.map(notes => (
                    <Card key={notes.id} style={{ width: '21rem' }}>
                        <Card.Header>
                            <Card.Title>{notes.title}</Card.Title>
                        </Card.Header>

                        <Card.Body>
                            <Card.Text>{notes.description}</Card.Text>                                
                        </Card.Body>                                

                        <Card.Footer>
                            <Button onClick={() => HandleDeleteNotes(notes.id)} 
                                    size="sm" variant="outline-danger">                                        
                                <FiTrash2 size="12"/>                                
                            </Button>

                            <Link to="/alter">
                                <Button size="sm" onClick={AddAlterId(notes.id)} variant="outline-warning">
                                    <FiEdit size="12"/>
                                </Button>
                            </Link>
                        </Card.Footer>
                    </Card>        
                ))}        
            </CardColumns> 
                       
        </Container>
    );
}