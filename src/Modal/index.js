import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Modal extends React.Component {
  node = React.createRef();
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { modal } = this.props;
    if (this.node.contains(e.target) && modal) {
      return;
    } return this.props.handleCloseModal();
  };
  renderModal = () => {
    const { modal, renderModalContent } = this.props;
    return (
      <div className={modal ? 'modal-showModal-active' : ''} >
        <div id="modal-container-showModal" className={modal ? 'showModal' : 'out'} >
          <div className="modal-background-showModal">
            <div className="modal-showModal" ref={this.handleRef} onClick={this.handleClick}>
              {renderModalContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderModal(),
      document.querySelector('#modal')
    );
  };
};

export default Modal;