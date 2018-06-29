import React from "react";
import Button from "../Button";
import { Container, Row, Col } from "../Grid";

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const SearchListItem = props => (
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
            type="success"
            className="input-lg"
            onClick={() => {
              const saveObj = {
                headline: props.headline,
                snippet: props.snippet,
                web_url: props.web_url,
                pub_date: props.pub_date
              };
              props.saveArticle(saveObj);

              //let newArray = props.articles;
              console.log(props.headline);
              console.log(props.articles);
              const articleIndex = props.articles.findIndex(
                obj => obj.headline === props.headline
              );
              console.log(articleIndex);
              props.articles.splice(articleIndex, 1);
              console.log(props.articles);

              //props.articles.setState(newArray);
            }}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  </li>
);
