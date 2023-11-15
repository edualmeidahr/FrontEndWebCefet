import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalExcluirCliente from './modalExcluirCliente';
import ModalPerfilCliente from './modalPerfilCliente';
import { MDBSpinner } from 'mdb-react-ui-kit';
import React from 'react';
import ImageWithFallback from '../geral/imageFallback';

export default function ListaClientes(props){
    
    const [modalPerfilShow, setModalPerfilShow] = useState(false);
    const [modalExcluirShow, setModalExcluirShow] = useState(false);

    const [lista, setLista] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);

    function handleExcluirCliente(){
        setModalPerfilShow(false);
        setModalExcluirShow(true);
    }

    function handleEditarCliente(){
        setModalPerfilShow(false);
        props.editar(selectedClient);
        props.setIsForm(false);
    }

    function handleMostrarPerfilCliente(){
        setModalPerfilShow(false);
    }

    function handleMostrarExcluirCliente(){
        setModalExcluirShow(false);
    }

    function fetchListaClientes(){
        setLista([]);
        axios.get('http://localhost:3002/clientes_all')
        .then(response => {
            var tipo = true;
            if(response.data){
                var listaGroup = response.data.map(e => {
                    tipo = !tipo;
                    return(
                        <ListGroupItem className='p-2 rounded-3 mb-1' action onClick={() => {
                            setModalPerfilShow(true)
                            setSelectedClient(e)
                        }} style={{border: 'none'}} variant={'info'}
                        key={e.id_cliente}>
                            <div className='d-flex flex-row justify-content-between'>
                                <ImageWithFallback
                                    src={`http://localhost:3002/clientes/C${e.id_cliente}.jpeg`}	
                                    alt='Avatar'
                                />
                                <div className='my-1' style={{flex: 1, textAlign: 'left'}}>{e.nome + ' ' + e.sobrenome}</div>
                                <div className='my-1' style={{flex: 1, textAlign: 'right'}}>{e.id_cliente}</div>
                            </div>
                        </ListGroupItem>
                    )
                })
                setLista(listaGroup)
                setIsLoading(false);
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchListaClientes();
    }, [])

    return (
        <>  
            <h1>Lista de clientes</h1>
            {
            !isLoading ?
                (<ListGroup >
                    <ListGroupItem disabled 
                        className='px-3 rounded-3 mb-1' 
                        style={{border: 'none', flex: 3}} 
                        variant={'info'} >
                        <div className='d-flex flex-row justify-content-between'>
                            <div style={{flex: 1, textAlign: 'left'}}>Nome completo</div>
                            <div style={{flex: 1, textAlign: 'right'}}>ID</div>
                        </div>
                    </ListGroupItem>
                    {lista}
                </ListGroup>)
            : 
            (
            <div className='d-flex flex-column align-items-center justify-content-center'>
                <MDBSpinner color='secondary' style={{ width: '3rem', height: '3rem' }}>
                    <span className='visually-hidden'>Carregando...</span>
                </MDBSpinner>
                <div style={{color:'#6c757d', fontWeight:'bold'}}>Carregando...</div>
            </div>
            )}
            <ModalPerfilCliente 
                client={selectedClient}
                show={modalPerfilShow}
                onHide={handleMostrarPerfilCliente} 
                onEdit={handleEditarCliente}
                onDelete={handleExcluirCliente}
            />
            <ModalExcluirCliente
                onDelete={() => fetchListaClientes()}
                client={selectedClient}
                show={modalExcluirShow}
                onHide={handleMostrarExcluirCliente}
            />
        </>
    )
}