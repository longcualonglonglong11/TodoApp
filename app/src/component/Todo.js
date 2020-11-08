import { useState, useEffect } from "react";
import React, { Component } from "react";
import ReactDOM from 'react-dom';

import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.url = "https://jsonplaceholder.typicode.com/todos";
    this.state = {
      text: "",
      //  url : 'https://longcualonglonglong.herokuapp.com/api/lecturer/course'
    };
    this.inputTodo = React.createRef();
    this.btnDelTodo = React.createRef();
  }
  loadAll = (url) => {
    console.log(url);
    axios.get(url).then((res) => {
      console.log(res.data);
      this.props.action.loadToDo(res.data);

    });
  };
  componentDidMount() {
    this.loadAll(this.url)

 //   this.inputTodo.current.state
  }
  componentDidUpdate() {
  }
  // cc(context){
  //   console.log('AA: ', context.props.todos)
  // }
  render() {
    return (
      <Container fluid={true}>
       {/* <Button onClick={() => this.cc(this)}>CCC</Button> */}
        <h1 className="header">TODOS APP</h1>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <InputGroup className="input_group mb-5">
              <Input
                placeholder="Let's text it !!!"
                size="sm"
                autoFocus={true}
                ref={this.inputTodo}
                type="text"
                value={this.state.text}
                onChange={(e) => this.setState({ text: e.target.value })}
              ></Input>
              <InputGroupAddon addonType="append">
                <Button
                  outline
                  size="sm"
                  color="success"
                  onClick={() => {
                    this.props.action.addToDo(this.state.text);
                    this.props.action.detailToDo({ title: this.state.text });
                    this.setState({ text: "" });
                  }}
                >
                  ADD
                </Button>{" "}
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        <div className="detail-container">
          <div className="detail-text">
            <h1>
              Previous Todo:{" "}
              {this.props.detail !== undefined
                ? this.props.detail.title
                : "Nothing"}
            </h1>
            <h1>
              All todos: 
              {this.props.todos.items.length}
            </h1>
            <h1>
              Done todos: 
              {this.props.todos.done}
            </h1>
            <h1>
              Doing todos: 
              {this.props.todos.undone}
            </h1>
          </div>
        </div>
        <div className="container">
          <ListGroup className="todoList list-group">
            {this.props.todos.items.length > 0 &&
              this.props.todos.items
                .filter((todo) => todo.id !== undefined)
                .map((todo) => (
                  <ListGroupItem key={todo.id} className="list-item">
                    <Row>
                      <Col>
                        <p
                          className="listItem"
                          // onClick={() => {
                          //   this.props.action.doneToDo(todo.title);
                          //   this.props.action.detailToDo(todo);
                          // }}
                          onClick={() => {
                            this.props.action.doneToDo(todo.title);
                            this.props.action.detailToDo(todo);
                          }}
                          onMouseEnter={() =>
                            this.props.action.hoverToDo(todo.title)
                          }
                          onMouseLeave={() =>
                            this.props.action.mouseOutToDo(todo.title)
                          }
                        >
                          {todo.title}
                        </p>
                      </Col>
                      <Col>
                        <Button
                          ref={this.btnDelTodo}
                          color="danger"
                          outline
                          onClick={() => {
                            this.props.action.delToDo(todo.title);
                            this.props.action.detailToDo(todo);
                          }}
                        >
                          X
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
            {this.props.todos.items.length == 0 && <div className="empty-list">Nothing</div>}
          </ListGroup>
        </div>
      </Container>
    );
  }
}
