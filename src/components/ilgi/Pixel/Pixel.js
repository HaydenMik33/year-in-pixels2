import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Event from "../../Inbox/Event/Event";
import Todo from "../../Inbox/Todo/Todo";
import { getPixel } from "../../../ducks/pixel";
import "./Pixel.css";
import moment from "moment";
//material ui
import { LinearProgress, Card, CardContent } from "@material-ui/core";
import PixelHeader from "./PixelHeader/PixelHeader";

class Pixel extends Component {
  state = {
    color: "#BDBDBD",
    opacity: 0.8
  };
  componentDidMount() {
    const { getPixel, match, history } = this.props,
      date = match.params.date;
    getPixel(date).then(res => {
      if (res.value === false) {
        history.push(`/edit/${date}`);
      } else {
        const pixel = res.value,
          opacity = pixel.opacity,
          color = pixel.colorvalue;
        this.setState(() => ({ opacity: opacity, color: color }));
      }
    });
  }
  render() {
    const { pixel, isLoading, match } = this.props,
      { opacity, color } = this.state,
      date = moment(match.params.date).format("MMM Do YY");
    return (
      <div>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <div className="Pixel">
            <PixelHeader opacity={opacity} color={color} />
            <pixel-top>
              <Todo />
              <Event />
            </pixel-top>
            <pixel-bottom>
              <div className="Pixel_img">
                <img alt="pixel_img" src={pixel.img_url} width="500" />
              </div>
              <Card className="Pixel_text">
                <CardContent>
                  <h1>{date}</h1>
                  {pixel.text}
                </CardContent>
              </Card>
            </pixel-bottom>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.pixel
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getPixel }
  )(Pixel)
);
