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

  render() {
    const dish = this.props.dish;

    if (dish != null) {
      const comments = dish.comments.map(c => this.renderComment(c));

      return (
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg top src={ dish.image } alt={ dish.name }/>
                <CardBody>
                  <CardTitle>{ dish.name }</CardTitle>
                  <CardText>{ dish.description }</CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-md-5 m-2">
              <h2>Comments</h2>
              <div className="d-flex flex-column justify-content-between align-items-start">
                { comments }
              </div>
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
