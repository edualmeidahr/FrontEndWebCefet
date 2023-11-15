'use client';

import React, { useEffect, useState } from 'react';
import './globals.css';
import ListaClientes from './components/clientes/listaClientes';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaFornecedores from './components/fornecedores/listaFornecedores';
import Nav from 'react-bootstrap/Nav';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBNavbarItem,
} from 'mdb-react-ui-kit';
import FormClientes from './components/clientes/formClientes';
import FormFornecedores from './components/fornecedores/formFornecedores';

const App = () => {
  const [isCliente, setIsCliente] = useState(true);
  const [isForm, setIsForm] = useState(false);
  const [isCadastro, setIsCadastro] = useState(true);
  const [dadosCliente, setDadosCliente] = useState({});
  const [dadosFornecedor, setDadosFornecedor] = useState({});

  function BarraNavegacao(props) {
    const { setIsCliente } = props;

    const handleClienteClick = () => {
      setIsCliente(true);
    };

    const handleFornecedorClick = () => {
      setIsCliente(false);
    };

    return (
      <>
        <MDBNavbar expand='lg' sticky light bgColor='light'>
          <MDBContainer className='justify-content-center' fluid>
              <MDBNavbarNav fullWidth={false} className='mb-2 mb-lg-0'>
                <Nav variant="underline" className="justify-content-center" defaultActiveKey="clientes" activeKey={isCliente ? "clientes" : "fornecedores"} as="ul">
                  <MDBNavbarItem>
                    <Nav.Item style={{ color: 'grey' }}>
                      <Nav.Link style={{ color: !isCliente ? '#85898d' : null }} eventKey="clientes" onClick={handleClienteClick}>Clientes</Nav.Link>
                    </Nav.Item>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <Nav.Item style={{ color: 'grey' }}>
                      <Nav.Link style={{ color: isCliente ? '#85898d' : null }} eventKey="fornecedores" onClick={handleFornecedorClick}>Fornecedores</Nav.Link>
                    </Nav.Item>
                  </MDBNavbarItem>
                </Nav>
              </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>
        <div className='mt-4' style={{ margin: '0 10% 0 10%' }}>
          <MDBBreadcrumb>
            <MDBBreadcrumbItem>
              <a href='#' onClick={() => setIsForm(false)} style={{color: isForm ? '#85898d' : '#4f4f4f', textDecoration: !isForm ? 'underline' : null }} >Lista</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href='#' onClick={() => setIsForm(true)} style={{color: !isForm ? '#85898d' : '#4f4f4f', textDecoration: isForm ? 'underline' : null }}>Formulário</a>
            </MDBBreadcrumbItem>
          </MDBBreadcrumb>
      </div>
      </>
    );
  }

  return (
    <main>
      <>
        <BarraNavegacao setIsCliente={setIsCliente} />
        <div style={{ margin: '0 10% 0 10%' }}>
          {isCliente ? 
            !isForm ? <ListaClientes 
              setIsForm={() => setIsForm(true)}
              setIsCadastro={(op) => setIsCadastro(op)} 
              editar={(dados) => setDadosCliente(dados)} />
            : <FormClientes 
                operacao={isCadastro}
                dadosCliente={dadosCliente} /> 
          : !isForm ? <ListaFornecedores 
              setIsForm={() => setIsForm(true)}
              setIsCadastro={(op) => setIsCadastro(op)}
              editar={(dados) => setDadosFornecedor(dados)} />
          : <FormFornecedores 
              operacao={isCadastro}
              dadosFornecedor={dadosFornecedor}/>}
        </div>
      </>
    </main>
  );

};
export default App;