import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Table, Col } from 'reactstrap';
import Buttons from './buttons.js'

export default ({ list , editarSerie , excluirSerie }) => (
  
    <Table hover bordered>    
      <thead>
        <tr>
          <th style={{width: '50px'}}>#</th>
          <th>Título</th>
          <th style={{width: '25px'}}>Nota</th>
          <th style={{width: '25px'}}>Progresso</th>
        </tr>
      </thead>
      <tbody>
        {
          list.map((serie, index) => 
            <tr key={index}>
              <th>{index + 1}</th>
              <td>
                <Row>
                  <Col xs='12' sm='7'>
                    {serie.titulo}
                  </Col>
                  <Col sm='5'>
                    <Buttons 
                      excluirSerie={() => excluirSerie(serie.id)} 
                      editarSerie={() => editarSerie(serie.id)}
                    />
                  </Col>
                </Row>
              </td>
              <td>{serie.nota}</td>
              <td>{serie.episAssistidos} / {serie.totalEpis}</td>
            </tr>
          )
        }
      </tbody>
    </Table>
 
)