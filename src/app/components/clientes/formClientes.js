import React from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function FormClientes(props) {
  const [isCadastro, setIsCadastro] = useState(true);

  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    salario: '',
  });

  useEffect(() => {
    if (Object.keys(props.dadosCliente).length > 0) {
      setIsCadastro(false);
      setFormData(props.dadosCliente);
    }
  }, [props.dadosCliente]);

  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  function cadastrarCliente(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const isFormValid = formRef.current.checkValidity();
  

    if(!isFormValid){
        return;
    }

    const data = new FormData();
    data.append('nome', formData.nome);
    data.append('sobrenome', formData.sobrenome);
    data.append('email', formData.email);
    data.append('salario', formData.salario);

    if(file) {
      data.append('avatar', file);
    }

    if (isCadastro) { 
      axios.post('http://localhost:3002/clientes', data,
      {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        setIsCadastro(false);
        alert('Cliente cadastrado com sucesso!');
        window.location.reload();
      }).catch((error) => {
        alert('Erro ao cadastrar cliente!');
      })
    } else {
      axios.patch('http://localhost:3002/clientes/' + formData.id_cliente, data,
      {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        alert('Cliente editado com sucesso!');
        window.location.reload();
      }).catch((error) => {
        alert('Erro ao editar cliente!');
      })
    }
  }

  return (
    <>
      <h1>{ isCadastro ? 'Cadastro' : 'Edição'} de clientes</h1>
      <MDBValidation ref={formRef} onSubmit={e => cadastrarCliente(e)} style={{ padding: '0 20% 0 20%' }}>
        <MDBRow className='mb-4'>
          <MDBCol>
            <MDBValidationItem invalid feedback='Indique o nome!'>
              <MDBInput value={formData.nome} onChange={onChange} name='nome' required id='nome' label='Nome' />
            </MDBValidationItem>
          </MDBCol>
          <MDBCol>
            <MDBValidationItem invalid feedback='Indique o sobrenome!'>
              <MDBInput value={formData.sobrenome} onChange={onChange} name='sobrenome' required id='sobrenome' label='Sobrenome' />
            </MDBValidationItem>
          </MDBCol>
        </MDBRow>

        <MDBValidationItem invalid feedback='Indique o email!'>
          <MDBInput value={formData.email} onChange={onChange} required name='email' wrapperClass='mb-4' type='email' id='email' label='Email' />
        </MDBValidationItem>
        <MDBValidationItem invalid feedback='Indique o salário!'>
          <MDBInput value={formData.salario} step={'any'} onChange={onChange} required name='salario' wrapperClass='mb-4' type='number' min={0} id='salario' label='Salário' />
        </MDBValidationItem>
        <div>
            <input
              type='file'
              id='file'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor='file' style={{ cursor: 'pointer' }}>
              <MDBIcon icon='upload' /> Escolher avatar
            </label>
          </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MDBBtn rounded color='success' type='submit'>
            { isCadastro ? 'Cadastrar' : 'Salvar'}
          </MDBBtn>
        </div>
      </MDBValidation>
    </>
  );
}