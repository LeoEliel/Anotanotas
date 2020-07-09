import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from '../Header';
import {Container, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../services/api';
import {FiArrowLeft} from 'react-icons/fi';
import "./styles.css";

export default function NewNote(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    /* const [note, setNote] = useState(''); */
    
    const userId = localStorage.getItem('userId');
    const alterNote = localStorage.getItem('alterNote');

    const history = useHistory();

    useEffect(() => {
        api.get(`edit/${alterNote}`, {
            headers: {
                Authorization: userId
            }
        }).then(response =>{
            setTitle(response.data[0].title);  
            setDescription(response.data[0].description);            
        })
    }, [userId, alterNote]);

    async function HandleAlterNote(e) {
        e.preventDefault();

        const data = {
            title,
            description,
        };

        try {
            await api.put(`edit/${alterNote}`, data,
            {
                headers:{
                    Authorization: userId
                }
            });  
            
            history.push('/profile');
            localStorage.removeItem('alterNote');

        } catch (err) {
            alert('Erro ao alterar nota, tente novamente.')
        }
    }    
    return (
        <Container>
            <Header />        
            <div className="form-alter-note">
                <hr></hr>
                <h2>Alterar Nota</h2>                
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            
                            <Form.Label>Titulo:</Form.Label>
                            <Form.Control size="md" className="input" type="text" placeholder= "Novo Titulo" 
                                value = {title}
                                onChange={e => setTitle(e.target.value)}
                            />    
                            
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control className="descricao"as="textarea" rows="5" 
                                value = {description}
                                onChange={e => setDescription(e.target.value)}
                            /> 
                            <Button variant="outline-primary" onClick={HandleAlterNote} size="sm"type="submit">Alterar</Button>                
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