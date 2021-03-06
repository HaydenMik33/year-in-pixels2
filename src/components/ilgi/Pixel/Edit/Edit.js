import React, { Component } from "react";
import { connect } from "react-redux";
import { addPixel, updatePixel } from "../../../../ducks/pixel";
import EditHeader from "./EditHeader/EditHeader";
import EditColor from "./EditColor/EditColor";
import ImgAdder from "./ImgAdder/ImgAdder";
import defaultImg from "../../../../sass/images/default.jpg";
import { withRouter } from "react-router-dom";
import "./Edit.css";
import colorBool from "../models/positive";

///material_ui imports
import { Button, TextField } from "@material-ui/core";
class Edit extends Component {
  state = {
    opacity: 0.8,
    colorvalue: "#BDBDBD",
    img_url: defaultImg,
    text: "",
    updateMode: false,
    id: 0
  };
  componentDidMount() {
    const { p } = this.props;
    p.opacity
      ? this.setState(() => ({
          opacity: p.opacity,
          colorvalue: p.colorvalue,
          img_url: p.img_url,
          text: p.text,
          updateMode: true,
          id: p.pixel_id
        }))
      : null;
  }
  changeColor = (e, value) => {
    this.setState(() => ({ colorvalue: value }));
  };
  changeOpacity = (e, value) => {
    this.setState(() => ({ opacity: value }));
  };
  changeImg = url => {
    this.setState(() => ({ img_url: url }));
  };
  addPixel = () => {
    const { addPixel, match, updatePixel, history } = this.props,
      { colorvalue, opacity, text, img_url, updateMode, id } = this.state,
      boolObj = colorBool.filter(el => Object.keys(el)[0] === colorvalue),
      positive = Object.values(boolObj[0])[0],
      color_data = opacity * 10 * (positive ? 1 : -1),
      date = match.params.date,
      body = {
        date,
        colorvalue,
        opacity,
        positive,
        color_data,
        text,
        img_url
      };
    console.log(body);
    updateMode
      ? updatePixel(body, id).then(() => history.push(`/home`))
      : addPixel(body).then(() => history.push(`/home`));
  };

  render() {
    const { opacity, colorvalue, img_url, text } = this.state;
    return (
      <div className="Edit">
        <EditHeader
          opacity={opacity}
          color={colorvalue}
          addPixel={this.addPixel}
        />
        <EditColor
          opacity={opacity}
          color={colorvalue}
          changeColor={this.changeColor}
          changeOpacity={this.changeOpacity}
        />
        <ImgAdder imgUrl={img_url} changeImg={this.changeImg} />
        <edit-journal>
          <h1>Write it all down</h1>
          <p>write anything you want that'd be the journal for today</p>
          <TextField
            style={{ backgroundColor: "#f4f4f575" }}
            label="Through out the day..."
            multiline
            rows="7"
            placeholder="I had a really good taco mucho deliciosa"
            fullWidth
            value={text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <Button
            className="Edit_savebtn"
            variant="contained"
            color="primary"
            onClick={this.addPixel}
          >
            Save changes
          </Button>
        </edit-journal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    p: state.pixel.pixel
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { addPixel, updatePixel }
  )(Edit)
);
