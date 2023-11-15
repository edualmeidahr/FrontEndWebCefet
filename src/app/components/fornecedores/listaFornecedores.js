import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalExcluirFornecedor from './modalExcluirFornecedor';
import { MDBSpinner, MDBIcon } from 'mdb-react-ui-kit';
import ImageWithFallback from '../geral/imageFallback';

export default function ListaFornecedores(props) {

    const [modalExcluirShow, setModalExcluirShow] = useState(false);
    const [selectedFornecedor, setSelectedFornecedor] = useState({});
    const [lista, setLista] = useState([]);

    function handleEditarFornecedor(e){
        props.editar(e);
        props.setIsForm(false);
    }

    function fetchListaFornecedores() {
        setLista([]);
        axios.get('http://localhost:3002/fornecedores_all')
            .then(response => {

                var listaGroup = response.data.map(e => {
                    return (
                        <ListGroupItem
                            className='p-2 rounded-3 mb-1'
                            style={{ border: 'none', flex: 3 }}
                            variant={'info'} key={e.id_fornecedor}>
                            <div className='d-flex flex-row justify-content-between'>
                                <ImageWithFallback
                                    src={`http://localhost:3002/fornecedores/F${e.id_fornecedor}.jpeg`}	
                                    alt='Logomarca'
                                />
                                <div className='py-1' style={{ flex: 1, textAlign: 'left' }}>{e.razao + ' - ' + e.cpf_cnpj}</div>
                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    <a href='#' onClick={() => {
                                        handleEditarFornecedor(e)
                                        }}><MDBIcon color='primary' far icon="edit m-2" /></a>
                                    <a href='#' onClick={
                                        () => {
                                            setModalExcluirShow(true)
                                            setSelectedFornecedor(e)
                                        }
                                    }><MDBIcon color='danger' far icon="trash-can m-2" /></a>
                                </div>
                            </div>
                        </ListGroupItem>
                    )
                }
                )
                setLista(listaGroup)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchListaFornecedores();
    }, [])

    return (
        <>
            <h1>Lista de fornecedores</h1>
            {lista.length > 0 ?
                (<ListGroup>
                    <ListGroupItem disabled
                        className='px-3 rounded-3 mb-1'
                        style={{ border: 'none', flex: 3 }}
                        variant={'info'} >
                        <div className='d-flex flex-row justify-content-between'>
                            <div style={{ flex: 1, textAlign: 'left' }}>Razão Social - CPF/CNPJ</div>
                            <div style={{ flex: 1, textAlign: 'right' }}>Ações</div>
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
                        <div style={{ color: '#6c757d', fontWeight: 'bold' }}>Carregando...</div>
                    </div>
                )}
            <ModalExcluirFornecedor
                show={modalExcluirShow}
                onHide={() => setModalExcluirShow(false)}
                fornecedor={selectedFornecedor}
                onDelete={() => fetchListaFornecedores()}
            />
        </>
    )
}