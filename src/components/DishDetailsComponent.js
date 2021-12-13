import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardImgOverlay,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Label,
  Button
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { baseUrl } from '../data/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderComment({comment}) {
  return (
      <div key={ comment.id } className="d-flex flex-column mt-4">
        <span>{ comment.comment }</span>
        <span>-- { comment.author }, { new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit'
        }).format(new Date(Date.parse(comment.date))) }</span>
      </div>
  );
}

function RenderDish({dish}) {
  return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{ dish.name }</CardTitle>
        </CardImgOverlay>
      </Card>
  );
}


function RenderComments({comments, postComment, dishId}) {
  const renderedComments = comments.map(c => <RenderComment comment={ c }/>);

  return (
      <div className="d-flex flex-column justify-content-between align-items-start">
        <h4>Comments</h4>
        { renderedComments }
        <div className="row">
          <CommentForm dishId={ dishId } postComment={ postComment }/>
        </div>
      </div>
  );
}


const DishDetails = ({dish, postComment, comments, isLoading, errMess}) => {
  if (isLoading) {
    return (
        <div className="container">
          <div className="row">
            <Loading/>
          </div>
        </div>
    );
  } else if (errMess) {
    return (
        <div className="container">
          <div className="row">
            <h4>{ errMess }</h4>
          </div>
        </div>
    );
  } else if (dish != null)
    return (
        <div className="container">
          <div className="row">
            <Breadcrumb>

              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{ dish.name }</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{ dish.name }</h3>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={ dish }/>
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments={ comments } postComment={ postComment } dishId={ dish.id }/>
            </div>
          </div>
        </div>
    );
};

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({rating, author, comment}) {
    this.props.postComment(this.props.dishId, rating, author, comment);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
        <div className="container">
          <button type="button" class="btn btn-outline-secondary" onClick={ () => this.toggleModal() }>
            <i className="fa fa-pencil" aria-hidden="true"></i> Add Comment
          </button>
          <Modal isOpen={ this.state.isModalOpen } toggle={ this.toggleModal }>
            <ModalHeader toggle={ this.toggleModal }>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
                <Col className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.text model=".rating"
                                id="rating"
                                name="rating"
                                type="number"
                                defaultValue="1"
                                min="1"
                                max="5"
                                placeholder="Rating"
                                className="form-control"
                  />
                </Col>
                <Col className="form-group">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                className="form-control"
                                validators={ {
                                  required, minLength: minLength(3), maxLength: maxLength(15)
                                } }
                  />
                  <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={ {
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                      } }
                  />
                </Col>
                <Col className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea model=".comment"
                                    id="comment"
                                    name="comment"
                                    rows="6"
                                    placeholder="Comment"
                                    className="form-control"
                  />
                </Col>
                <Col className="form-group">
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

export default DishDetails;
