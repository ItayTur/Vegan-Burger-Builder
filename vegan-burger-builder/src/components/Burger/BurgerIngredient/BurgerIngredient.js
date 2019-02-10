import React, { Component } from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;
        switch (this.props.type) {
      case "bread-bottom":
        ingredient = <div className={classes.BreadBottom} />;
        break;
      case "bread-top":
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case "beyond-meat":
        ingredient = <div className={classes.BeyondMeat} />;
        break;
      case "soy-cheese":
        ingredient = <div className={classes.SoyCheese} />;
        break;
      case "salad":
        ingredient = <div className={classes.Salad} />;
        break;
      case "veggie-bacon":
        ingredient = <div className={classes.VeggieBacon} />;
        break;
      default:
        ingredient = null;
        break;
    }
    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
