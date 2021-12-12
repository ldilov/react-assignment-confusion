import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

class DishDetails extends Component {

  constructor(props) {
    super(props);
  }

  renderComment(comment) {
    return (
        <div key={comment.id} className="d-flex flex-column mt-4">
          <span>{comment.comment}</span>
          <span>-- {comment.author}, {comment.date}</span>
        </div>
    );
  }

  renderDish(dish) {
    return (
        <Card>
          <CardImg top src={ dish.image } alt={ dish.name }/>
          <CardBody>
            <CardTitle>{ dish.name }</CardTitle>
            <CardText>{ dish.description }</CardText>
          </CardBody>
        </Card>
    );
  }

  renderComments(comments) {
    const renderedComments = comments.map(c => this.renderComment(c));

    return (
        <div className="d-flex flex-column justify-content-between align-items-start">
          <h4>Comments</h4>
          { renderedComments }
        </div>
    );
  }

  render() {
    const dish = this.props.dish;

    if (dish != null) {
      return (
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish(dish)}
            </div>
            <div className="col-12 col-md-5 m-1">
              {this.renderComments(dish.comments)}
            </div>
          </div>
      );
    }
    else
      return (
          <div/>
      );
  }
}

export default DishDetails;
