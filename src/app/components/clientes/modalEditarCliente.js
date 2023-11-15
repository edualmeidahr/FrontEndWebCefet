import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import CloseButton from 'react-bootstrap/CloseButton';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalEditarCliente(props) {
    
    const [imageError, setImageError] = useState(false);
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        if (imageError) {
            setImageError(false);
        }

        window
        .matchMedia("(min-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    }, [props.client]);

    if (props.client) {
        var salario = Number(+props.client.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        var selectedClient = props.client;
        var data = new Date(selectedClient.data_cadastro);

        return (
            <>
                <Modal
                    show={props.show}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={props.onHide}
                >
                            <MDBRow className="justify-content-center align-items-center">
                                <MDBCol lg="12" className="mb-lg-0">
                                    <MDBCard style={{ borderRadius: '.4rem' }}>
                                        <MDBRow className="g-0">
                                            <MDBCol md="4" className="gradient-custom text-center text-white"
                                                style={{ borderTopLeftRadius: '.4rem', ...(matches ? {borderBottomLeftRadius: '.4rem'}  : {borderTopRightRadius: '.4rem'}) }}>
                                                {
                                                imageError ? (
                                                    <MDBIcon className='my-5 img-fluid' fas icon="user-alt" size='3x' />
                                                ) : (<MDBCardImage src={`http://localhost:3002/clientes/C${selectedClient.id_cliente}.jpeg`}
                                                    alt="Avatar" className="my-5 img-fluid rounded-circle" style={{ width: '100px' }} 
                                                    onError={()=> setImageError(true)}
                                                />) }
                                                <MDBTypography tag="h5">{selectedClient.nome} {selectedClient.sobrenome}</MDBTypography>
                                                <MDBCardText>ID: {selectedClient.id_cliente}</MDBCardText>
                                                <MDBIcon far icon="edit mb-4 mt-4" />
                                            </MDBCol>
                                            <MDBCol md="8">
                                                <CloseButton onClick={props.onHide} style={{float: 'right', margin: '20px'}} />
                                                <MDBCardBody className="p-4 mt-4">
                                                    <MDBTypography tag="h6">Informações</MDBTypography>
                                                    <hr className="mt-0 mb-4" />
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size='12' className="mb-3">
                                                            <MDBTypography tag="h6">Email</MDBTypography>
                                                            <MDBCardText className="text-muted">{selectedClient.email}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <MDBRow className='pt-4 mb-5'>
                                                        <MDBCol size='4'>
                                                            <MDBTypography tag="h6">Salário</MDBTypography>
                                                            <MDBCardText className="text-muted">{salario}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size='8'>
                                                            <MDBTypography tag="h6">Data de Cadastro</MDBTypography>
                                                            <MDBCardText className="text-muted">{data.toLocaleDateString()}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                    <div className="d-flex justify-content-center">
                                                        <a><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                                        <a><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                                        <a><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCard>
                                </MDBCol>
                            </MDBRow>
                </Modal>
            </>
        )
    }
}