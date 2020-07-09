import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from '../Header'
import {Container, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';
import "./styles.css";


export default function NewNote(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const userId = localStorage.getItem('userId');

    const history = useHistory();

    async function HandleNewNote(e) {
        e.preventDefault();

        const data = {
            title,
            description,
        };

        try {
            await api.post('new', data,
            {
                headers:{
                    Authorization: userId
                }
            });  
            
            history.push('/profile');

        } catch (err) {
            alert('Erro ao criar nova nota, tente novamente.')
        }
    }
    return (
        <Container >
            <Header />        
            <div className="form-note">
                <hr></hr>
                <h2>Nova Nota</h2>
                <Form >
                    <Form.Group controlId="formBasicPassword">
                        
                        <Form.Label>Titulo:</Form.Label>
                        <Form.Control size="md" className="input" type="text" placeholder= "Novo Titulo" 
                            value = {title}
                            onChange={e => setTitle(e.target.value)}
                        />    
                        
                        <Form.Label>Descrição:</Form.Label>
                        <Form.Control className="descricao"as="textarea" rows="5" 
                            placeholder= "Escreva Aqui..."
                            value = {description}
                            onChange={e => setDescription(e.target.value)}
                        /> 
                        <Button variant="outline-primary" onClick={HandleNewNote} size="sm"type="submit">Criar</Button>                
                        <Link to="/profile">
                            <FiArrowLeft size={16} color=""/>
                            Voltar para Home
                        </Link>
                    </Form.Group>
                </Form>
            </div>    
        </Container>
    );
}