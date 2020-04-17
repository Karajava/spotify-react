import React, { useState, useEffect } from 'react';

interface Modal {
  modalIsOpen: boolean;
  modalStatus: any;
  data: any;
}

const Modal: React.FC<Modal> = (props: Modal) => {
  const { modalIsOpen, modalStatus, data } = props;
  console.log(data);
  return (
    <div className={`modal ${modalIsOpen ? 'open' : 'close'}`}>
      <div className="modal-box">
        <div
          className="linkToModal"
          role="button"
          onKeyUp={modalStatus}
          tabIndex={0}
          onClick={modalStatus}
        >
          X
        </div>
        <div className="featured-list">
          {data.map((s: any) => <span>{s.href}</span>)}
        </div>
      </div>
    </div>
  );
};

export default Modal;
