import React, { useState } from "react";
import { defaultUrl } from "../constants";
import Image from "./ImageComponent";
import { Modal, ModalBody } from "reactstrap";

function ImageView({ updateImage, deleteImage, urls }) {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState(defaultUrl);
  const set = (img) => {
    setImg(img);
    toggleModal();
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="columns">
      {urls.map((url) => (
        <Image
          key={url.id}
          url={url}
          set={set}
          updateImage={updateImage}
          deleteImage={deleteImage}
        />
      ))}
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalBody>
          <div className="container">
            <img src={img} alt="" className="expandedImage" />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ImageView;
