import React from 'react';
import {Col, Jumbotron} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FiBookmark} from 'react-icons/fi';
import "./styles.css";

export default function Header() {
    return (    
            <Col>
                <Jumbotron>
                    <h1><FiBookmark size={40} color=""/>Anotanotas!</h1>
                    <p className="text-muted">
                        Um anotador virtual para facilitar seu dia!
                    </p>
                </Jumbotron>
            </Col>    
    );
}