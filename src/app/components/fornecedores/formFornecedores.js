import React, { useEffect } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBValidationItem,
  MDBValidation
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';

export default function FormFornecedores(props) {

  const [isCadastro, setIsCadastro] = useState(true);

  const [formData, setFormData] = useState({
    razao: '',
    cpf_cnpj: '',
    contato: '',
    logradouro: '',
    cidade: '',
    uf: '',
  });

  useEffect(() => {
    console.log(props.dadosFornecedor)
    if (Object.keys(props.dadosFornecedor).length > 0) {
      setIsCadastro(false);
      setFormData(props.dadosFornecedor);
    }
  }, [props.dadosCliente]);

  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  function cadastrarFornecedor(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if(formData.uf.length != 2 || !formData.razao || !formData.cpf_cnpj || !formData.contato || !formData.logradouro || !formData.cidade || !formData.uf) {
      return;
    }

    const data = new FormData();
    data.append('razao', formData.razao);
    data.append('cpf_cnpj', formData.cpf_cnpj);
    data.append('contato', formData.contato);
    data.append('logradouro', formData.logradouro);
    data.append('cidade', formData.cidade);
    data.append('uf', formData.uf);

    if(file) {
      data.append('avatar', file);
    }

    if(isCadastro){
        axios.post('http://localhost:3002/fornecedores', data,
      {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        alert('Fornecedor cadastrado com sucesso!');
        window.location.reload();
        console.log(response);
      }).catch((error) => {
        alert('Erro ao cadastrar fornecedor!');
        console.log(error);
      })
    } else {
      axios.patch('http://localhost:3002/fornecedores/' + formData.id_fornecedor, data,
      {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        alert('Fornecedor atualizado com sucesso!');
        window.location.reload();
      }).catch((error) => {
        alert('Erro ao atualizar fornecedor!');
      })
    }

    
  }

  return (
    <>
      <h1>{ isCadastro ? 'Cadastro' : 'Edição'} de fornecedores</h1>
      <MDBValidation onSubmit={e => cadastrarFornecedor(e)} style={{ padding: '0 20% 0 20%' }}>
          <MDBRow className='mb-4'>
            <MDBCol>
              <MDBValidationItem invalid feedback='Indique a razão social!'>
                <MDBInput
                  value={formData.razao}
                  name='razao'
                  required
                  id='razao'
                  onChange={onChange}
                  label='Razão Social' />
              </MDBValidationItem>
            </MDBCol>
            <MDBCol>
              <MDBValidationItem invalid feedback='Indique o CPF/CNPJ!'>
                <MDBInput
                  value={formData.cpf_cnpj}
                  name='cpf_cnpj'
                  required
                  onChange={onChange}
                  id='cpf_cnpj'
                  label='CPF/CNPJ' />
              </MDBValidationItem>
            </MDBCol>
            <MDBCol>
              <MDBValidationItem invalid feedback='Indique o contato!'>
                <MDBInput
                  value={formData.contato}
                  name='contato'
                  required
                  onChange={onChange}
                  id='contato'
                  label='Contato' />
              </MDBValidationItem>
            </MDBCol>
          </MDBRow>

          <MDBRow className='mb-4'>
            <MDBCol>
              <MDBValidationItem invalid feedback='Indique o logradouro!'>
                <MDBInput
                  value={formData.logradouro}
                  name='logradouro'
                  required
                  onChange={onChange}
                  id='logradouro'
                  label='Logradouro' />
              </MDBValidationItem>
            </MDBCol>
            <MDBCol>
              <MDBValidationItem invalid feedback='Indique a cidade!'>
                <MDBInput
                  value={formData.cidade}
                  name='cidade'
                  required
                  onChange={onChange}
                  id='cidade'
                  label='Cidade' />
              </MDBValidationItem>
            </MDBCol>
            <MDBCol>
              <MDBValidationItem invalid feedback='Indique uma UF com duas letras!'>
                <MDBInput
                  value={formData.uf}
                  name='uf'
                  required
                  onChange={onChange}
                  id='uf'
                  label='UF'
                  minLength={2}
                  maxLength={2}
                />
              </MDBValidationItem>
            </MDBCol>
          </MDBRow>

          <div>
            <input
              type='file'
              id='file'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor='file' style={{ cursor: 'pointer' }}>
              <MDBIcon icon='upload' /> Escolher logomarca
            </label>
          </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MDBBtn rounded color='success' type='submit'>
          { isCadastro ? 'Cadastro' : 'Salvar'}
          </MDBBtn>
        </div>
      </MDBValidation>
    </>
  );
}