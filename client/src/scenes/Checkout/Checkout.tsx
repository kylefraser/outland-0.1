import { useLazyQuery, useMutation } from '@apollo/client';
import { useState, useEffect, ReactNode } from 'react';
import {
  Button,
  Container,
  Flex,
  Footer,
  Input,
  Section,
  Text,
  TextArea,
  TopBar,
} from '../../components';
import { CREATE_TRANSACTION, FIND_LISTING_BY_ID } from '../../queries';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { styled } from '../../../stitches.config';

interface CheckoutProps {
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setError: any;
  setToken: React.Dispatch<React.SetStateAction<string | number | null>>;
  token?: string | number | null;
}

const ticketItems: any = localStorage
  .getItem('outland-item')
  ?.replace(/^.*(?<=(tickets=))/, '');

const Checkout = ({
  setSearchedLocation,
  searchedLocation,
  setToken,
  token,
}: CheckoutProps) => {
  const [tickets, setTickets] = useState<number | any>(ticketItems);

  const [findListingById, result] = useLazyQuery(FIND_LISTING_BY_ID);
  const [secretStripe, setSecret] = useState();
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe('pk_test_85PfwLoMKM8OArA08xAB4MZF')
  );
  const [createTransaction, transactionResult] =
    useMutation(CREATE_TRANSACTION);

  function handleChange(e: any) {
    if (e.target.value == '' || Math.sign(e.target.value) == 1) {
      setTickets(e.target.value);
    }
  }

  const item = localStorage
    .getItem('outland-item')
    ?.substring(0, localStorage.getItem('outland-item')?.indexOf('?'));

  const previousCheckout = localStorage.getItem('outland-checkout-intent');

  useEffect(() => {
    if (item) {
      findListingById({ variables: { searchIdValue: item } });
    }

    createTransaction({
      variables: {
        name: 'George Washington',
        email: 'george.washington@test.com',
        receiver_id: 'receiver_id',
        listing_id: '62c33a7dc894dea9d5120b00',
        items: ['62c33a7dc894dea9d5120b00', '62c33a7dc894dea9d5120b00'],
        payment_intent: previousCheckout ? previousCheckout : null,
      },
    });

    // Create PaymentIntent as soon as the page loads
    // fetch('http://localhost:4000/create-payment-intent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: 'George Washington',
    //     email: 'george.washington@test.com',
    //     items: [
    //       {
    //         id: 'listing1',
    //       },
    //       {
    //         id: 'listing2',
    //       },
    //     ],
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => setSecret(data.clientSecret));
  }, []);

  useEffect(() => {
    console.log(transactionResult);

    if (transactionResult.data) {
      setSecret(transactionResult.data.createTransaction.clientSecret);
    }

    if (transactionResult.data && !previousCheckout) {
      localStorage.setItem(
        'outland-checkout-intent',
        transactionResult.data.createTransaction.payment_intent
      );
    }
  }, [transactionResult.data]);

  let listing;

  if (result.data) {
    listing = result.data.findListingById;
  }

  return (
    <>
      <Container>
        <Section size={'3'}>
          <Text
            as={'h2'}
            size={'9'}
            style={{
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Checkout
          </Text>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.5rem 2rem',
              border: '2px solid #9BB579',
              borderRadius: '1rem',
              margin: '2rem 0 4rem',
            }}
          >
            <div>
              <Text
                as={'h3'}
                size={'8'}
                style={{
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                {listing?.name}
              </Text>
              <Text
                as={'p'}
                size={'6'}
                style={{
                  fontWeight: 600,
                }}
              >
                Date: {listing?.date}
              </Text>
              <Text
                as={'p'}
                size={'6'}
                style={{
                  fontWeight: 600,
                }}
              >
                Time: {listing?.time}
              </Text>
            </div>
            <Flex>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0 2rem',
                }}
              >
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 500,
                    alignSelf: 'flex-start',
                    marginBottom: '0.25rem',
                  }}
                >
                  Tickets
                </Text>

                <Input
                  type="number"
                  value={tickets}
                  inputProps={{
                    min: '1',
                  }}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  onBlur={() => tickets < 1 && setTickets(1)}
                  style={{ width: '8rem' }}
                />
              </div>
              <div>
                <Text
                  as={'h2'}
                  size={'9'}
                  style={{
                    fontWeight: 800,
                    marginBottom: '1rem',
                    marginTop: '1rem',
                    textAlign: 'center',
                    alignSelf: 'flex-end',
                  }}
                >
                  ${listing?.price * tickets}
                </Text>
              </div>
            </Flex>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                flex: '0 0 calc(100% - 34rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Text
                as={'h3'}
                size={'7'}
                style={{
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                }}
              >
                Personal Information
              </Text>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Input
                  name="first_name"
                  style={{ flex: '0 0 calc(50% - 0.5rem)' }}
                  label="First Name"
                  placeholder="Benjamin"
                />
                <Input
                  name="last_name"
                  style={{ flex: '0 0 calc(50% - 0.5rem)' }}
                  label="Last Name"
                  placeholder="Franklin"
                />
              </div>
              <Input
                name="email"
                label="Email Address"
                placeholder="Ben@Franklin.com"
              />
              <Input
                name="address"
                label="Address"
                placeholder="1776 Main Street"
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '1rem',
                }}
              >
                <Input name="city" label="City" placeholder="Philadelphia" />
                <Input name="state" label="State" placeholder="PA" />
                <Input name="zipcode" label="Zipcode" placeholder="01776" />
              </div>
              <Input name="phone" label="Phone" placeholder="555-555-5555" />
              <TextArea
                name="notes"
                label="Notes"
                placeholder="Additional notes..."
              />
              <Text
                as={'h3'}
                size={'7'}
                style={{
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  marginTop: '2rem',
                }}
              >
                Payment Information
              </Text>
              {secretStripe && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: secretStripe,
                  }}
                >
                  <CheckoutForm />
                </Elements>
              )}
            </div>
            <CheckoutDetails direction={'column'}>
              <Text
                as={'h2'}
                size={'8'}
                color={'white'}
                style={{
                  fontWeight: 600,
                  marginBottom: '2rem',
                }}
              >
                Details
              </Text>
              <Flex direction={'column'} style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem',
                    width: '100%',
                  }}
                >
                  <Text
                    as={'p'}
                    size={'6'}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    {listing?.name} x {tickets} tickets
                  </Text>
                  <div
                    style={{
                      height: 1,
                      width: '100%',
                      margin: '0 0.5rem',
                      borderBottom: '2px dashed #a6cf70',
                    }}
                  ></div>
                  <Text
                    as={'p'}
                    size={'6'}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                      marginLeft: 'auto',
                    }}
                  >
                    ${tickets > 0 ? Math.round(listing?.price * tickets) : 0}{' '}
                  </Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                    width: '100%',
                  }}
                >
                  <Text
                    as={'p'}
                    size={'6'}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    Service Fee
                  </Text>
                  <div
                    style={{
                      height: 1,
                      width: '100%',
                      margin: '0 0.5rem',
                      borderBottom: '2px dashed #a6cf70',
                    }}
                  ></div>
                  <Text
                    as={'p'}
                    size={'6'}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                      marginLeft: 'auto',
                    }}
                  >
                    $
                    {tickets > 0
                      ? Math.round(listing?.price * tickets * 0.06)
                      : 0}
                  </Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Text
                    as={'p'}
                    size={'6'}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    Tax
                  </Text>
                  <div
                    style={{
                      height: 1,
                      width: '100%',
                      margin: '0 0.5rem',
                      borderBottom: '2px dashed #a6cf70',
                    }}
                  ></div>
                  <Text
                    as={'p'}
                    size={'6'}
                    color={'white'}
                    style={{
                      fontWeight: 600,
                      marginLeft: 'auto',
                    }}
                  >
                    $
                    {tickets > 0
                      ? Math.round(listing?.price * tickets * 0.07)
                      : 0}
                  </Text>
                </div>
              </Flex>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginTop: '2rem',
                  width: '100%',
                }}
              >
                <Text
                  as={'h2'}
                  size={'8'}
                  color={'white'}
                  style={{
                    fontWeight: 600,
                    textAlign: 'right',
                    marginLeft: 'auto',
                    marginRight: '1rem',
                  }}
                >
                  Total:
                </Text>
                <Text
                  as={'p'}
                  size={'8'}
                  color={'white'}
                  style={{
                    fontWeight: 600,
                    alignSelf: 'flex-end',
                    justifySelf: 'flex-end',
                  }}
                >
                  $
                  {tickets > 0
                    ? Math.round(listing?.price * tickets) +
                      Math.round(listing?.price * tickets * 0.06) +
                      Math.round(listing?.price * tickets * 0.07)
                    : 0}
                </Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  gap: '1rem',
                  marginTop: '2rem',
                  width: '100%',
                }}
              >
                <Button medium variant="special">
                  Clear
                </Button>
                <Button medium>Checkout</Button>
              </div>
            </CheckoutDetails>
          </div>
        </Section>
      </Container>
    </>
  );
};

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setErrorMessage] =
//     useState<React.SetStateAction<any | null>>();

//   const handleSubmit = async (event: any) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://127.0.0.1:5173/checkout/success',
//       },
//     });

//     if (error) {
//       setErrorMessage(error.message);
//     } else {
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button disabled={!stripe}>Submit</button>
//       {errorMessage && <div>{errorMessage}</div>}
//     </form>
//   );
// };

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<React.SetStateAction<string | any>>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://127.0.0.1:5173/checkout/success',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      localStorage.setItem('outland-checkout-intent', '');
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" style={{ fontSize: '2rem', color: '#000' }}>
          {message}
        </div>
      )}
    </form>
  );
}

const CheckoutDetails = styled(Flex, {
  backgroundColor: '$olive4',
  width: '30rem',
  flex: '0 0 30rem',
  borderRadius: 16,
  padding: '1.5rem',
  position: 'sticky',
  top: 'calc(95px + 3rem)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export default Checkout;
