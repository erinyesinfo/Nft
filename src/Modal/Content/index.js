import React from 'react';
import './index.css';

const ModalContent = ({ id, title, description, address, name, tokenUri, image }) => (
    <div className='modal-transaction-content'>
        <div className='m-content-wrapper'>
            <div>Name: </div>
            <div>{name}</div>
        </div>
        <div className='m-content-wrapper'>
            <div>Address: </div>
            <div>{address}</div>
        </div>
        {title ? (
            <div className='m-content-wrapper'>
                <div>Title: </div>
                <div>{title}</div>
            </div>
        ):null}
        {description ? (
        <div className='m-content-wrapper'>
            <div>Description: </div>
            <div>{description}</div>
        </div>
        ):null}
        <div className='m-content-wrapper'>
            <div>TokenUri: </div>
            <div><a rel="noopener noreferrer" href={tokenUri} target="_blank" style={{ color: 'steelblue' }}>
                {tokenUri}
            </a></div>
        </div>
        <div className='m-content-wrapper'>
            <div>Image: </div>
            <div><a rel="noopener noreferrer" href={image} target="_blank" style={{ color: 'steelblue' }}>
                {image}
            </a></div>
        </div>
        <button className='buy'>
            <a className='buy-link' rel="noopener noreferrer" href={"https://opensea.io/assets/" + address + '/' + id} target="_blank">
                Buy
            </a>
        </button>
    </div>
);

export default ModalContent;