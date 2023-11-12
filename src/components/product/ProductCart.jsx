import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { headerActions } from "../../store/headerSlice";
import { useSelector } from "react-redux";
import "./product.css";

export const ProductCart = ({
  id,
  cover,
  name,
  price,
  desc,
  setOpen,
  setPopupDetail,
}) => {
  // read state from redux store
  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  const history = useHistory();
  const dispatch = useDispatch();

  // add items to cart
  const addToCart = () => {
    if (isLoggIn) {
      dispatch(cartActions.addToCart({ id, name, price, cover }));
    } else {
      dispatch(headerActions.hideSearchBar());
      history.push("/login");
    }
  };

  const viewPopup = () => {
    setPopupDetail({
      productId: id,
      productCover: cover,
      productName: name,
      productPrice: price,
      productDesc: desc,
    });
    setOpen(true);
  };

  return (
    <>
      <div className="box boxItems" id="product">
        <div className="img">
          <Link>
            <img src={cover} alt="cover" />
          </Link>
        </div>
        <div className="details">
          <p>{name}</p>
          <h3>Rs. {price}</h3>
          <span className="view-more" onClick={viewPopup}>
            View More...
          </span>
          <button onClick={addToCart}>
            <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
    </>
  );
};
