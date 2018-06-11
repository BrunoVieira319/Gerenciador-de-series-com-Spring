import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

const styleFlex = {
  display: 'flex',
  justifyContent: 'flex-end'
}
 
const buttonStyle = {
  marginLeft: '5px',
  padding: '1px 6px',
  fontSize: '14px'
}

export default ({editarSerie, excluirSerie}) => (
  <div style={styleFlex}>
    <Button style={buttonStyle} onClick={editarSerie}>Edit</Button>
    <Button style={buttonStyle} onClick={excluirSerie}>Excluir</Button>
  </div>
)