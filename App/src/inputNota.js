import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from 'reactstrap';

export default ({mudarNota}) => (
  <Input type="select" onChange={mudarNota}>
    <option>Nota</option>
    <option>10 (Obra-prima)</option>
    <option>9 (Excelente)</option>
    <option>8 (Muito Bom)</option>
    <option>7 (Bom)</option>
    <option>6 (Legal)</option>
    <option>5 (Mediano)</option>
    <option>4 (Ruim)</option>
    <option>3 (Muito Ruim)</option>
    <option>2 (Horrível)</option>
    <option>1 (Um Lixo)</option>
  </Input>
)