import React from "react";
import Button from "../Button";
import { Container, Row, Col } from "../Grid";

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const SavedListItem = props => (
  <li className="list-group-item">
    <Container>
      <Row>
        <Col size="xs-8 sm-10">
          <h5>{props.headline}</h5>
          <div>{props.snippet}</div>
          <a href={props.web_url} target="_blank">
            {props.web_url}
          </a>
          <div>{props.pub_date}</div>
        </Col>
        <Col size="xs-4 sm-1">
          <Button
            type="danger"
            className="input-lg"
            onClick={() => props.deleteArticle(props._id)}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  </li>
);
