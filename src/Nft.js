import React, { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';

import Modal from './Modal';
import ModalContent from './Modal/Content';

const Nft = (props) => {
    const [modal, setModal] = useState(false);
    const handleCloseModal = () => setModal(false);
    // Modal container, that has the data to show
    const renderModalContent = () => (
      <ModalContent id={props.id} title={props.title}
        address={props.address}
        name={props.name}
        description={props.description}
        tokenUri={props.tokenUri}
        image={props.image}
      />
    );
    // Modal logic
    const renderModal = () => {
      return (
        <Modal handleCloseModal={handleCloseModal}
          modal={modal}
          renderModalContent={renderModalContent}
        />
      );
    };

    // You can now display the NFT metadata.
    return (
        <>
            <Box maxW='lg'
                borderWidth='1px' borderRadius='lg' overflow='hidden'
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                cursor="pointer"
                noOfLines={1}
                onClick={() => setModal(true)}>
                <Image src={props.image} alt="" />
                <div>
                    {props.title ? props.title : "#" +props.id}
                </div>
                {props.description}

            </Box>
            {/* If the card was clicked we load the modal */}
            {modal ? (
                renderModal()
            ):null}
        </>
    )
}

export default Nft;
