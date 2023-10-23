import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_LISTINGS_BY_USER } from '../../../queries';
import { Flex, Modal, Schedule, Text } from '../../../components';
import GuideExplore from '../../../assets/images/guide-explore.webp';

const BusinessSchedule = () => {
  let { data, loading } = useQuery(ALL_LISTINGS_BY_USER);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [eventDetails, setEventDetails] = useState<any>();

  const handleEventClick = (e: any) => {
    console.log(e);
    setEventDetails(
      <Flex direction={'column'}>
        <div
          style={{
            backgroundImage: `url('${GuideExplore}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            borderRadius: 4,
            height: '140px',
            width: '100%',
          }}
        ></div>
        <Flex justify={'between'} align={'center'}>
          <Text as={'h3'} size={'3'} color={'text'} style={{ fontWeight: 500 }}>
            {e.event.extendedProps.when}
          </Text>
          <Text
            as={'h3'}
            size={'3'}
            color={'text'}
            style={{
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {e.event.extendedProps.type}
          </Text>
        </Flex>
        <Text as={'h2'} size={'5'} color={'text'} style={{ fontWeight: 600 }}>
          {e.event.title}
        </Text>
        <Text as={'p'} color={'text'}>
          {e.event.extendedProps.description}
        </Text>
        <Flex
          justify={'between'}
          align={'end'}
          style={{
            marginTop: '0.5rem',
          }}
        >
          <Text
            as={'h3'}
            color={'text'}
            style={{
              fontWeight: 500,
              textTransform: 'capitalize',
            }}
          >
            {e.event.extendedProps.city} {e.event.extendedProps.state}
          </Text>
          <Text as={'p'} color={'text'} style={{ fontWeight: 500 }}>
            ${e.event.extendedProps.price}
          </Text>
        </Flex>
      </Flex>
    );
    setModalOpen(true);
  };

  return (
    <>
      <Text
        as={'h2'}
        size={8}
        style={{
          fontWeight: 700,
          marginBottom: '2rem',
        }}
      >
        Schedule
      </Text>
      <Schedule
        eventClick={(e: React.ChangeEvent) => handleEventClick(e)}
        events={data?.allListingsByUser?.map((l: any, index: number) => {
          return {
            title: l.name,
            date: l.date,
            description: l.description,
            when: l.date,
            type: l.type,
            city: l.city,
            state: l.state,
            price: l.price,
          };
        })}
      />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        style={{
          minHeight: '280px',
          height: '280px',
          width: '420px',
          minWidth: '420px',
          borderRadius: 6,
          padding: '2rem',
        }}
      >
        {eventDetails}
      </Modal>
    </>
  );
};

export default BusinessSchedule;
