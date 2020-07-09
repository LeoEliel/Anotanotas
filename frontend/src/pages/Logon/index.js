import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from '../Header';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';
import "./styles.css";

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();





    
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id })            
            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.name);
            history.push('/profile');
        } catch (err) {
            alert('Falha no Login, tente novamente.')
        }
    }

    return (
        <Container className="text-left center-block">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col>
                    <Header />                        
                </Col>

                <Col>
                    <h2>Faça seu Login</h2>
                    <Form >
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Insira o ID de acesso.</Form.Label>
                            <Form.Control size="md" value={id} onChange={e => setId(e.target.value)}
                            className="input" type="password" placeholder= "seu ID" />    
                            <Button variant="outline-primary" size="sm"onClick={handleLogin} type="submit">Entrar</Button>                
                            <Link to="/register">
                                <FiLogIn size={16} color=""/>
                                Não tenho cadastro
                            </Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>  
            </Container>
        );
}