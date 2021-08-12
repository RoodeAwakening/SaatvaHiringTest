import React, { useEffect, useState } from "react";
import Ratings from "react-ratings-declarative";

import "./MattressPage.css";
import logo from "../../images/saatva-logo.png";

import AddToCart from "./AddToCart";

export default function MattressPage() {
  // states
  const [loaded, setIsLoaded] = useState(false);
  const [mattressData, setMattressData] = useState([]);
  const [mattress, setMattress] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const mattressArray = Object.keys(mattressData).map((i) => mattressData[i]);

  // useEffect to call the function only once and get required data
  useEffect(() => {
    // load data from mattresses.json
    let mattressData = async () => {
      const response = await fetch("mattresses.json");
      const mattresses = await response.json();
      // store data in state
      // convert mattresses to array
      setMattressData(mattresses.mattresses);
      // set loading to false
      setIsLoaded(true);
      return mattresses;
    };
    mattressData();
  }, []);

  // add to cart function
  const addToCart = () => {
    // call the function AddToCart
    // we seperated this function to use it it multiple pages and for
    // testing purposes
    setCartItems(AddToCart(cartItems));
  };

  return (
    <div className="mattress-page">
      {/* banner */}
      <div className="navbar-banner">
        <i className="fal fa fa-alarm-exclamation"></i>
        <span id="bannerTitle">
          It's <span class="t-weight--normal">BLACK FRIDAY IN AUGUST!</span> Buy
          More, Save More: Get up to{" "}
          <span class="t-weight--normal">$450 OFF. 3 DAYS ONLY.</span> Ends
          Thursday 8/12.
        </span>
        &nbsp;
        <span class="banner__link" tabindex="0" role="link">
          Learn&nbsp;More
        </span>
      </div>
      {/* navbar */}
      <nav className="navbar  ">
        <div className="container-navbar">
          {/* logo */}
          <div className="navbar-brand mb-0 h1">
            <img id="logo" src={logo} alt='logo'/>
          </div>
          {/* shopping cart icon */}
          <div className="cart">
            <a
              href="/"
              className="cart position-relative d-inline-flex"
              aria-label="View your shopping cart"
            >
              <i className="fas fa fa-shopping-cart fa-lg"></i>
              <div
                className="cart-basket d-flex align-items-center justify-content-center"
                id="cartTotal"
              >
                {cartItems}
              </div>
            </a>
          </div>
        </div>
      </nav>
      {/* end of nav bar */}
      {/* wait for the mattress data to be loaded before rendering the page */}
      {loaded && (
        <div className="container">
          <div className="container-components">
            {/* left */}
            <div className="container-mattress-left">
              <img
                className="mattress-left-images"
                src={
                  require(`../../images/${mattressArray[mattress].imageFileName}`)
                    .default
                }
                alt="Mattress"
              />
            </div>
            {/* left */}
            {/* right start*/}
            <div className="container-mattress-right">
              <div className="container-mattress-right-header">
                <h2>Choose Your Mattress</h2>
              </div>
              <div className="container-mattress-right-select-mattress">
                <h6>SELECT MATTRESS TYPE</h6>
                {/* map through the available mattresses and render a button for each */}
                {/* this should also change the selected mattress state */}
                <div className="container-mattress-right-select-mattress-buttons">
                  {mattressArray.map((mattress, index) => (
                    <button
                      key={mattress.name}
                      className="mattress-button"
                      onClick={() => setMattress(index)}
                    >
                      {mattress.name}
                    </button>
                  ))}
                </div>
                <div className="container-mattress-right-price">
                  <div className="container-mattress-right-price-name">
                    {mattressArray[mattress].name}
                  </div>
                  <div>${mattressArray[mattress].price}</div>
                </div>
                <div className="container-mattress-right-rating">
                  <h5>Rating: {mattressArray[mattress].reviewRating} </h5>
                  {/* star rating */}
                  <div className="star-rating-stars">
                    <Ratings
                      rating={mattressArray[mattress].reviewRating}
                      widgetDimensions="20px"
                      widgetSpacings=""
                      widgetRatedColor="gold"
                    >
                      <Ratings.Widget widgetRatedColor="gold" />
                      <Ratings.Widget widgetRatedColor="gold" />
                      <Ratings.Widget widgetRatedColor="gold" />
                      <Ratings.Widget widgetRatedColor="gold" />
                      <Ratings.Widget widgetRatedColor="gold" />
                    </Ratings>
                  </div>
                  {/* star rating */}
                </div>
                <div className="container-mattress-right-add-to-cart">
                  {/* add to cart button */}
                  <button
                    className="addToCartButton"
                    id="addToCart"
                    onClick={() => addToCart()}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            {/* right end*/}
          </div>
        </div>
      )}
    </div>
  );
}
