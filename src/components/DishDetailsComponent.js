import React from 'react';
import {
  Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, CardImgOverlay
} from 'reactstrap';
import { Link } from 'react-router-dom';


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
        <CardImg width="100%" src={ dish.image } alt={ dish.name }/>
        <CardImgOverlay>
          <CardTitle>{ dish.name }</CardTitle>
        </CardImgOverlay>
      </Card>
  );
}


function RenderComments({comments}) {
  const renderedComments = comments.map(c => <RenderComment comment={c} />);

  return (
      <div className="d-flex flex-column justify-content-between align-items-start">
        <h4>Comments</h4>
        { renderedComments }
      </div>
  );
}


const DishDetails = ({dish, comments}) => {
  if (dish != null) {
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
              <RenderComments comments={ comments }/>
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
