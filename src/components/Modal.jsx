import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ItemModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>show modal</button>
     
    </>
  );
};

export default ItemModal;
