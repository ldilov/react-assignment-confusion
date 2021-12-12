import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderComment(comment) {
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

function RenderDish(dish) {
  return (
      <Card>
        <CardImg width="100%" src={ dish.image } alt={ dish.name }/>
        <CardImgOverlay>
          <CardTitle>{ dish.name }</CardTitle>
        </CardImgOverlay>
      </Card>
  );
}


function RenderComments(comments) {
  const renderedComments = comments.map(c => RenderComment(c));

  return (
      <div className="d-flex flex-column justify-content-between align-items-start">
        <h4>Comments</h4>
        { renderedComments }
      </div>
  );
}


const DishDetails = ({dish}) => {
  if (dish != null) {
    return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              { RenderDish(dish) }
            </div>
            <div className="col-12 col-md-5 m-1">
              { RenderComments(dish.comments) }
            </div>
          </div>
        </div>
    );
  } else
    return (
        <div/>
    );
};

export default DishDetails;
