import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import Header from '../Header'

import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FiArrowLeft} from 'react-icons/fi'
import "./styles.css";

export default function Register() {

    const [name, setName] = useState('');
    const history = useHistory();

    async function handleRegister(e) {
                
        e.preventDefault();
        const data = {name};

        try {
            const response = await api.post('users', data)

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        }catch(err){
            alert('Erro no cadastro, tente novamente.');
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
                    <h2>Cadastro</h2>
                    <Form >
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Insira seu nome:</Form.Label>
                            <Form.Control size="md" value={name} onChange={e => setName(e.target.value)} className="input" type="text" placeholder= "Seu nome" />    
                            <Button variant="outline-primary" size="sm"type="submit" onClick={handleRegister}>Cadastrar</Button>                
                            <Link to="/" className="form-register-link">
                                <FiArrowLeft size={16} color=""/>
                                Voltar
                            </Link>
                        </Form.Group>
                    </Form>          
                </Col>
            </Row>
        </Container>
    );
}