import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, InputGroup, InputGroupAddon, Input, Button, Nav, TabContent, TabPane, Modal, ModalBody, ModalFooter, Form, FormGroup, Alert, Badge } from 'reactstrap';
import ListLine from './listLine.js'
import NavTab from './navTab.js'
import InputNota from './inputNota.js'

class App extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      listTerminei: [],
      listAssistindo: [],
      listDesisti: [],
      listPlanejoVer: [],
      totalEpisVistos: 0,
      media: 0,
      titulo: "",
      nota: "",
      episAssistidos: "",
      totalEpis: "",
      status: "Assistindo",
      id: 0,
      indexSerie: 0,
      botaoAddEdit: "Adicionar",
      modal: false,
      activeTab: '1',
      tabCor: [null, "rgba(0, 0, 0, 0.2)", "#FFF", "#FFF", "#FFF"]
    };
  }

  componentDidMount = () => {
    fetch('http://localhost:3009/series', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*", 
      }
    }).then((response) => {
      return response.json();
    }).then((dados) => {
      let listas = this.atualizarListas(dados);
      let totalEpisVistos = this.contarTotalEpisodiosVistos(dados);
      let media = this.calcularMedia(dados);
      let idAtual = this.acharIdAtual(dados);

      this.setState({
        list: dados,
        listAssistindo: listas.novaListAssistindo,
        listDesisti: listas.novaListDesisti,
        listTerminei: listas.novaListTerminei,
        listPlanejoVer: listas.novaListPlanejoVer,
        totalEpisVistos: totalEpisVistos,
        media: media,
        id: idAtual
      });
      
    });
  }

  acharIdAtual = (dados) => {
    let idAtual = 0;
    dados.forEach((serie) => {
      if (serie.id > idAtual) { 
        idAtual = serie.id
      }
    })
    return idAtual = idAtual + 1;
  }

  toggleTab = (tab) => {
    this.setState({
      activeTab: tab
    })
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    }) 
  }

  trocaCorTab = (tab) => {
    let arrayTabCor = [null, "#FFF", "#FFF", "#FFF", "#FFF"];
    arrayTabCor[tab] = "rgba(0, 0, 0, 0.2)"

    this.setState({
      tabCor: arrayTabCor
    })
  }

  mudarTitulo = (e) => {
    this.setState({
      titulo: e.target.value,
    })
  }

  mudarNota = (e) => {
    let valorConvertido = Number.parseInt(e.target.value, 10);
    this.setState({
      nota: valorConvertido
    })
  }

  mudarStatus = (e) => {
    if (e.target.value == "Terminei") {
      this.setState({
        status: e.target.value,
        episAssistidos: this.state.totalEpis
      });
    } else {
      this.setState({
        status: e.target.value
      });
    }
  }

  mudarEpisAssitidos = (e) => {
    let valorConvertido = Number.parseInt(e.target.value, 10);
    if (this.state.status == "Terminei") {
      this.linkarEpisodios(valorConvertido);
    } else {
      this.setState({
        episAssistidos: valorConvertido,
      });
    }
  }

  mudarTotalEpis = (e) => {
    let valorConvertido = Number.parseInt(e.target.value, 10);
    if (this.state.status == "Terminei") {
      this.linkarEpisodios(valorConvertido);
    } else {
      this.setState({
        totalEpis: valorConvertido,
      });
    }
  }

  linkarEpisodios = (e) => {
    this.setState({
      totalEpis: e,
      episAssistidos: e
    });
  }

  cancelar = () => {
    this.setState({
      titulo: "",
      nota: "",
      episAssistidos: "",
      totalEpis: "",
      status: "Assistindo",
      modal: !this.state.modal,
      botaoAddEdit: "Adicionar"
    });
  }

  atualizarListas = (list) => {
    let listOrdenada = list.sort((a, b) => {
      return (a.titulo < b.titulo) ? -1 : (a.titulo > b.titulo) ? 1 : 0;
    });

    let novaListAssistindo = listOrdenada.filter((serie) => serie.status == "Assistindo");
    let novaListTerminei = listOrdenada.filter((serie) => serie.status == "Terminei");
    let novaListDesisti = listOrdenada.filter((serie) => serie.status == "Desisti");
    let novaListPlanejoVer = listOrdenada.filter((serie) => serie.status == "Planejo Ver");

    let listas = {novaListAssistindo, novaListTerminei, novaListDesisti, novaListPlanejoVer};

    return listas;
  }

  contarTotalEpisodiosVistos = (lista) => {
    let totalEpisVistos = 0;
    lista.forEach((serie) => totalEpisVistos = totalEpisVistos + serie.episAssistidos)

    return totalEpisVistos;
  }

  calcularMedia = (lista) => {
    let totalNotas = 0;
    let somaNotas = 0;

    lista.forEach((serie) => {
      if (serie.nota == "" || serie.nota == 0) {
        serie.nota = "";
      } else {
        totalNotas = totalNotas + 1;
        somaNotas = somaNotas + serie.nota;
      }
    })

    let media = somaNotas / totalNotas;
    if (Number.isNaN(media) == true) {
      return 0;
    }
    return media.toFixed(2);
  }  

  enviarSerie = () => {
    if (this.state.botaoAddEdit == "Adicionar") {
      this.adicionarSerie()
    }
    if (this.state.botaoAddEdit == "Editar") {
      this.enviarSerieEditada()
    }  
  }

  validarSerie = (serieInfo, adiciona) => {
    if (serieInfo.episAssistidos > serieInfo.totalEpis) {
      if (serieInfo.nome == "") {
        return null
      } else if (serieInfo.status == "Assistindo") {
        serieInfo.totalEpis = "-"
      }
    }

    let novaList = this.state.list;
    
    if (adiciona == true) {
      let serieRepetida = novaList.find((serie) => serie.titulo == this.state.titulo);
      if (serieRepetida) {
        return null
      }
    }

    return novaList;
  }

  adicionarSerie = () => {
    let serieInfo = { 
      titulo: this.state.titulo, 
      nota: this.state.nota,
      episAssistidos: this.state.episAssistidos,
      totalEpis: this.state.totalEpis,
      status: this.state.status,
      id: this.state.id
    };

    let novaList = this.validarSerie(serieInfo, true);

    if (novaList == null) {
      return
    }
    
    fetch('http://localhost:3009/series', {
      method: 'POST',
      body: JSON.stringify(serieInfo),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*", 
      }
    }).then((response) => {
      if(response.status == 200) {
        novaList.push(serieInfo);

        let listas = this.atualizarListas(novaList);
        let totalEpisVistos = this.contarTotalEpisodiosVistos(novaList);
        let media = this.calcularMedia(novaList);
    
        this.setState({
          list: novaList,
          listAssistindo: listas.novaListAssistindo,
          listDesisti: listas.novaListDesisti,
          listTerminei: listas.novaListTerminei,
          listPlanejoVer: listas.novaListPlanejoVer,
          totalEpisVistos: totalEpisVistos,
          media: media,
          id: this.state.id + 1,
          titulo: "",
          nota: "",
          episAssistidos: "",
          totalEpis: "",
          status: "Assistindo",
          modal: !this.state.modal
        });

      }
    });
  }

  editarSerie = (id) => {
    let novaList = this.state.list;
    let index = novaList.findIndex((serie) => serie.id == id);
    let serieAlvo = novaList.find((serie) => serie.id == id);

    this.setState({
      modal: !this.state.modal,
      titulo: serieAlvo.titulo,
      nota: serieAlvo.nota,
      episAssistidos: serieAlvo.episAssistidos,
      totalEpis: serieAlvo.totalEpis,
      status: serieAlvo.status,
      indexSerie: index,
      serieAlvo: serieAlvo,
      botaoAddEdit: "Editar"
    })
  }

  enviarSerieEditada = () => {
    let serieInfo = { 
      titulo: this.state.titulo, 
      nota: this.state.nota,
      episAssistidos: this.state.episAssistidos,
      totalEpis: this.state.totalEpis,
      status: this.state.status,
      id: this.state.serieAlvo.id
    };

    let novaList = this.validarSerie(serieInfo, false);

    fetch('http://localhost:3009/series', {
      method: 'PUT',
      body: JSON.stringify(serieInfo),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*"
      }
    }).then((response) => {
      if (response.status == 200) {
        novaList[this.state.indexSerie] = serieInfo;

        let listas = this.atualizarListas(novaList);
        let totalEpisVistos = this.contarTotalEpisodiosVistos(novaList);
        let media = this.calcularMedia(novaList);

        this.setState({
          list: novaList,
          listAssistindo: listas.novaListAssistindo,
          listDesisti: listas.novaListDesisti,
          listTerminei: listas.novaListTerminei,
          listPlanejoVer: listas.novaListPlanejoVer,
          totalEpisVistos: totalEpisVistos,
          media: media,
          titulo: "",
          nota: "",
          episAssistidos: "",
          totalEpis: "",
          status: "Assistindo",
          botaoAddEdit: "Adicionar",
          modal: !this.state.modal
        });
      }
    })
  }

  excluirSerie = (id) => {
    fetch(`http://localhost:3009/series/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      if(response.status == 200) {
        let novaList = this.state.list.filter((serie) => serie.id != id);

        let listas = this.atualizarListas(novaList);
        let totalEpisVistos = this.contarTotalEpisodiosVistos(novaList);
        let media = this.calcularMedia(novaList);

        this.setState({
          list: novaList,
          listAssistindo: listas.novaListAssistindo,
          listDesisti: listas.novaListDesisti,
          listTerminei: listas.novaListTerminei,
          listPlanejoVer: listas.novaListPlanejoVer,
          totalEpisVistos: totalEpisVistos,
          media: media
        })
      }
    })
  }

  render() {
    return (
      <div>
      <Col xs="12" md={{size: 10, offset: 1}} lg={{size: 8, offset: 2}}>
        <h1>MySeriesList</h1>

        <Button color="info" onClick={this.toggleModal} >Adicionar</Button>

        <Alert color="dark" style={{marginTop: '10px'}}>
          <Row>
            <Col xs="6"> 
              <Badge color={"light"} pill>{this.state.totalEpisVistos}</Badge> Total Episódios Vistos
            </Col>
            <Col xs="6"> 
              <Badge color={"light"} pill>{this.state.media}</Badge> Media das Notas
            </Col>
          </Row>
        </Alert>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalBody>
            <Form>
              <FormGroup>
                <InputGroup>
                <Input
                  placeholder={'Título'}
                  value={this.state.titulo} 
                  onChange={this.mudarTitulo}
                />
                <Input type="select" value={this.state.status} onChange={this.mudarStatus}>
                  <option>Assistindo</option>
                  <option>Terminei</option>
                  <option>Desisti</option>
                  <option>Planejo Ver</option>
                </Input>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">Episódios Assistidos:</InputGroupAddon>
                  <Input type="number" value={this.state.episAssistidos} onChange={this.mudarEpisAssitidos}/>
                  <InputGroupAddon addonType="prepend">/ Total de Episódios:</InputGroupAddon>
                  <Input type="number" value={this.state.totalEpis} onChange={this.mudarTotalEpis}/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputNota mudarNota={this.mudarNota} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.enviarSerie}>{this.state.botaoAddEdit}</Button>
            <Button color="secondary" onClick={this.cancelar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        
        <Nav tabs style={{marginTop: '30px'}} >
          <NavTab 
            tabTitulo={"Assistindo"} 
            tabID={'1'} 
            toggleTab={this.toggleTab} 
            contador={this.state.listAssistindo.length} 
            color={"success"}
            tabCor={this.state.tabCor[1]}
            trocaCorTab={() => this.trocaCorTab('1')}/>
          <NavTab 
            tabTitulo={"Terminei"} 
            tabID={'2'} 
            toggleTab={this.toggleTab} 
            contador={this.state.listTerminei.length} 
            color={"primary"}
            tabCor={this.state.tabCor[2]}
            trocaCorTab={() => this.trocaCorTab('2')}/>
          <NavTab 
            tabTitulo={"Desisti"} 
            tabID={'3'} 
            toggleTab={this.toggleTab} 
            contador={this.state.listDesisti.length} 
            color={"danger"}
            tabCor={this.state.tabCor[3]}
            trocaCorTab={() => this.trocaCorTab('3')} />
          <NavTab 
            tabTitulo={"Planejo Ver"} 
            tabID={'4'} 
            toggleTab={this.toggleTab} 
            contador={this.state.listPlanejoVer.length}
            tabCor={this.state.tabCor[4]}
            trocaCorTab={() => this.trocaCorTab('4')} />
        </Nav>
          
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ListLine list={this.state.listAssistindo} excluirSerie={this.excluirSerie} editarSerie={this.editarSerie}/>
          </TabPane>
          <TabPane tabId="2">
            <ListLine list={this.state.listTerminei} excluirSerie={this.excluirSerie} editarSerie={this.editarSerie}/>
          </TabPane>
          <TabPane tabId="3">
            <ListLine list={this.state.listDesisti} excluirSerie={this.excluirSerie} editarSerie={this.editarSerie}/>
          </TabPane>
          <TabPane tabId="4">
            <ListLine list={this.state.listPlanejoVer} excluirSerie={this.excluirSerie} editarSerie={this.editarSerie}/>
          </TabPane>  
        </TabContent>
          
      </Col>    
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
