import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderDish(selectedDish) {
            return(
                <Card>
                    <CardImg top src={selectedDish.image} alt={selectedDish.name} />
                    <CardBody>
                      <CardTitle>{selectedDish.name}</CardTitle>
                      <CardText>{selectedDish.description}</CardText>
                    </CardBody>
                </Card>
            );
    }

    renderComments(comments) {
        return comments.map((selectedComment) => {
            return(
                <li key={selectedComment.id}>
                    <p>{selectedComment.comment}</p>
                    <p>-- {selectedComment.author}, {selectedComment.date}</p>
                </li>
            );
        });
    }

    render() {
        if (this.props.selectedDish != null) {
            return(
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {this.renderComments(this.props.selectedDish.comments)}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

}

export default Dishdetail;