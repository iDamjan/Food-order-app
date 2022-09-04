import classes from "./Modal.module.css";
import  ReactDOM  from "react-dom";
import Form from "../Form/Form";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick ={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const ctx = useContext(CartContext)

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose = {props.onClose}/>, portalElement)}
      {ctx.isOrdered ? ReactDOM.createPortal(<Form />, portalElement)  : ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
      
    
    </>
  );
};

export default Modal;
