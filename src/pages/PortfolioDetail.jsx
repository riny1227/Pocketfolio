import React, { useState } from "react";
import Modal from "react-modal";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>팝업 열기</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
          content: { width: "300px", margin: "auto", padding: "20px" },
        }}
      >
        <h2>팝업창</h2>
        <p>내용을 입력하세요</p>
        <button onClick={() => setModalIsOpen(false)}>닫기</button>
      </Modal>
    </div>
  );
};

export default App;