import React from "react";
import Button from "../Button";
import { Container, Row, Col } from "../Grid";

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const SearchListItem = props => (
  <li className="list-group-item">
    <Container>
      <Row>
        <Col size="xs-8 sm-9">
          <h5>{props.headline}</h5>
          <div>{props.snippet}</div>
          <a href={props.web_url}>{props.web_url}</a>
          <div>{props.pub_date}</div>
        </Col>
        <Col size="xs-4 sm-2">
          <Button type="success" className="input-lg">
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  </li>
);
