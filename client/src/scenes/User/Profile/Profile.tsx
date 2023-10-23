import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER, ME } from '../../../queries';
import {
  Button,
  Container,
  Flex,
  Input,
  Section,
  Skeleton,
  Switch,
  Text,
  TextArea,
  Toast,
} from '../../../components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { styled } from '../../../../stitches.config';
import { Avatar } from '../../../components/Avatar';
import { useForm } from 'react-hook-form';
interface UserProfileProps {
  setError: any;
  token?: string | number | null;
}

const UserProfile = ({ setError, token }: UserProfileProps) => {
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const { state }: any = location;

  const [editUser] = useMutation(EDIT_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    // update: (store, response) => {
    //   const dataInStore = store.readQuery({ query: ALL_LISTINGS });
    //   store.writeQuery({
    //     query: ALL_LISTINGS,
    //     data: {
    //       ...(dataInStore as any),
    //       allListings: [
    //         ...(dataInStore as any).allListings,
    //         response.data.addListing,
    //       ],
    //     },
    //   });
    // },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data: any) => {
    editUser({
      variables: {
        about: data['about'],
      },
    });
  };

  let { data, loading } = useQuery(ME);

  if (!token) {
    return (
      <Navigate replace to="/login" state={{ alert: 'Login or Register' }} />
    );
  }

  const onEditChange = (checked: any) => {
    setEdit(checked);
  };

  useEffect(() => {
    if (data?.me) {
      setValue('about', data?.me?.about);
    }
  }, [data?.me]);

  return (
    <Container>
      <Section size={'3'}>
        <Text
          as={'h2'}
          size={'8'}
          style={{
            fontWeight: 700,
            marginBottom: '1rem',
          }}
        >
          Profile
        </Text>
        {state?.alert && <Toast type={'alert'}>{state?.alert}</Toast>}
        {state?.success && <Toast type={'success'}>{state?.success}</Toast>}
        <Flex
          direction={'column'}
          align={'center'}
          gap={'4'}
          style={{
            marginBottom: '4rem',
          }}
        >
          <Avatar url={data?.me?.avatar} />
          <Text
            as={'h3'}
            size={'8'}
            style={{
              fontWeight: 700,
            }}
          >
            {data?.me?.username}
          </Text>
        </Flex>
        <div style={{ display: 'flex', marginBottom: '4rem' }}>
          <div
            style={{
              flex: '0 0 calc(30% - 4rem)',
              marginRight: '3rem',
              padding: '1rem 3rem 1rem 0',
              borderRight: '1px solid #DFDFDF',
            }}
          >
            <Text
              as={'h6'}
              size={'6'}
              style={{
                fontWeight: 700,
                marginBottom: '0.125rem',
              }}
            >
              About you
            </Text>
            <Text
              as={'p'}
              size={'4'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              Add a few lines about yourself
            </Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '3rem',
              }}
            >
              <div>
                <Text
                  as={'h6'}
                  size={'5'}
                  style={{
                    fontWeight: 700,
                    marginBottom: '0.125rem',
                  }}
                >
                  Edit profile
                </Text>
                <Text
                  as={'p'}
                  size={'3'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    fontStyle: 'italic',
                    marginRight: '1rem',
                  }}
                >
                  Toggle to unlock
                </Text>
              </div>
              <Switch small id="edit" checked={edit} onChange={onEditChange} />
            </div>
            {edit && (
              <>
                <Text
                  as={'p'}
                  size={'4'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginTop: '1rem',
                  }}
                >
                  Don't forget to save!
                </Text>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <Button mini outline type="submit">
                    Save
                  </Button>
                  <Button mini inline outline type="reset" variant="secondary">
                    Cancel
                  </Button>
                </div>
              </>
            )}
            <hr
              style={{
                border: '1px solid #d3d3d3',
                borderTop: 0,
                marginTop: '1rem',
              }}
            />
            <Flex
              justify={'between'}
              style={{
                marginTop: '1rem',
              }}
            >
              <div>
                <Text
                  as={'h6'}
                  size={'4'}
                  style={{
                    fontWeight: 700,
                    marginBottom: '0.125rem',
                  }}
                >
                  Hide address
                </Text>
                <Text
                  as={'p'}
                  size={'3'}
                  style={{
                    fontWeight: 500,
                    lineHeight: 1.3,
                    marginBottom: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    fontStyle: 'italic',
                    marginRight: '1rem',
                  }}
                >
                  Your profile is currently displaying your address
                </Text>
              </div>
              <Switch small id="edit" checked={false} onChange={() => {}} />
            </Flex>
          </div>
          <div
            style={{
              padding: '1rem 0',
              width: '100%',
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: 'grid',
                gap: '2.5rem',
                width: '100%',
              }}
            >
              <Input
                name="address"
                label="Address"
                inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={"Roger' Rangers"}
                value={data?.me?.address && data?.me?.address}
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '2.5rem',
                }}
              >
                <Input
                  name="city"
                  label="City"
                  inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                  placeholder={'Kennebunkport'}
                  value={data?.me?.city && data?.me?.city}
                  register={register}
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.name, e.target.value)
                  }
                />
                <Input
                  name="state"
                  label="State"
                  inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                  placeholder={'ME'}
                  value={data?.me?.state && data?.me?.state}
                  register={register}
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.name, e.target.value)
                  }
                />
                <Input
                  name="zipcode"
                  label="Zipcode"
                  inputStyle={{ pointerEvents: edit ? 'all' : 'none' }}
                  placeholder={'04046'}
                  value={data?.me?.zipcode && data?.me?.zipcode}
                  register={register}
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.name, e.target.value)
                  }
                />
              </div>
              <TextArea
                name="about"
                label="About"
                textAreaStyles={{ pointerEvents: edit ? 'all' : 'none' }}
                placeholder={
                  'If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.'
                }
                register={register}
                onChange={async (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setValue(e.target.name, e.target.value)
                }
              />
            </form>
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '4rem' }}>
          <div
            style={{
              flex: '0 0 calc(30% - 4rem)',
              marginRight: '3rem',
              padding: '1rem 3rem 1rem 0',
              borderRight: '1px solid #DFDFDF',
            }}
          >
            <Text
              as={'h6'}
              size={'6'}
              style={{
                fontWeight: 700,
                marginBottom: '0.125rem',
              }}
            >
              Transactions
            </Text>
            <Text
              as={'p'}
              size={'4'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              Your recent transactions
              <Link
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  margin: '2rem 1rem 0 0',
                  borderBottom: '1px solid #9BB579',
                  textDecoration: 'none',
                }}
                to="#"
              >
                <Text
                  as={'p'}
                  size={'3'}
                  color={'link'}
                  style={{
                    fontWeight: 600,
                    lineHeight: 1.5,
                    marginRight: '0.5rem',
                  }}
                >
                  Full transaction history
                </Text>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{
                    color: '#9BB579',
                    fontSize: '.9rem',
                  }}
                />
              </Link>
            </Text>
          </div>
          <div
            style={{
              padding: '1rem 0',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid #dedede',
                padding: '0 1rem 1rem',
                flex: '0 0 calc(50% - 0.5rem)',
              }}
            >
              <div>
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid #dedede',
                padding: '0 1rem 1rem',
                flex: '0 0 calc(50% - 0.5rem)',
                marginTop: '1rem',
              }}
            >
              <div>
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid #dedede',
                padding: '0 1rem 1rem',
                flex: '0 0 calc(50% - 0.5rem)',
                marginTop: '1rem',
              }}
            >
              <div>
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0 1rem 1rem',
                flex: '0 0 calc(50% - 0.5rem)',
                marginTop: '1rem',
              }}
            >
              <div>
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '4rem' }}>
          <div
            style={{
              flex: '0 0 calc(30% - 4rem)',
              marginRight: '3rem',
              padding: '1rem 3rem 1rem 0',
              borderRight: '1px solid #DFDFDF',
            }}
          >
            <Text
              as={'h6'}
              size={'6'}
              style={{
                fontWeight: 700,
                marginBottom: '0.125rem',
              }}
            >
              Feedback
            </Text>
            <Text
              as={'p'}
              size={'4'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              The most recent feedback that you've given to hosts
              <Link
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  margin: '2rem 1rem 0 0',
                  borderBottom: '1px solid #9BB579',
                  textDecoration: 'none',
                }}
                to="#"
              >
                <Text
                  as={'p'}
                  size={'3'}
                  color={'link'}
                  style={{
                    fontWeight: 600,
                    lineHeight: 1.5,
                    marginRight: '0.5rem',
                  }}
                >
                  View all feedback
                </Text>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{
                    color: '#9BB579',
                    fontSize: '.9rem',
                  }}
                />
              </Link>
            </Text>
          </div>
          <div
            style={{
              padding: '1rem 0',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid #dedede',
                padding: '0 1rem 1rem',
                flex: '0 0 calc(50% - 0.5rem)',
              }}
            >
              <div>
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid #dedede',
                padding: '0 1rem 1rem',
                flex: '0 0 calc(50% - 0.5rem)',
                marginTop: '1rem',
              }}
            >
              <div>
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: '1px solid #dedede',
                padding: '0 1rem 1rem',
                flex: '0 0 calc(50% - 0.5rem)',
                marginTop: '1rem',
              }}
            >
              <div>
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0 1rem 1rem',
                flex: '0 0 calc(50% - 0.5rem)',
                marginTop: '1rem',
              }}
            >
              <div>
                <Text
                  as={'h4'}
                  size={'5'}
                  style={{
                    fontWeight: 600,
                  }}
                >
                  First Last
                </Text>
                <Text as={'p'}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse venenatis id lorem non vehicula.
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '4rem' }}>
          <div
            style={{
              flex: '0 0 calc(30% - 4rem)',
              marginRight: '3rem',
              padding: '1rem 3rem 1rem 0',
              borderRight: '1px solid #DFDFDF',
            }}
          >
            <Text
              as={'h6'}
              size={'6'}
              style={{
                fontWeight: 700,
                marginBottom: '0.125rem',
              }}
            >
              Manage listings
            </Text>
            <Text
              as={'p'}
              size={'4'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              Information related to your listings
            </Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem',
                width: '100%',
              }}
            >
              {loading ? (
                <Skeleton
                  style={{
                    height: '2rem',
                    width: '8rem',
                  }}
                />
              ) : (
                data?.me?.listings?.length > 0 && (
                  <Text
                    as={'h2'}
                    size={'5'}
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {data?.me?.listings?.length + ' Listings'}
                  </Text>
                )
              )}
              <Link
                to={'../user/listings/add'}
                style={{ textDecoration: 'none' }}
              >
                <Button mini inline outline variant="primary">
                  Add Listing
                </Button>
              </Link>
            </div>
            <hr style={{ border: 0, borderBottom: '1px solid #e0e0e0' }} />
            <Text
              as={'p'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ fontWeight: 800 }}>8</span> Courses
            </Text>
            <Text
              as={'p'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ fontWeight: 800 }}>2</span> Guides
            </Text>
            <Text
              as={'p'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ fontWeight: 800 }}>2</span> Access
            </Text>
            <Text
              as={'p'}
              style={{
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ fontWeight: 800 }}>1</span> Epic
            </Text>
            <Link
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                margin: '2rem 1rem 0 0',
                borderBottom: '1px solid #9BB579',
                textDecoration: 'none',
              }}
              to="#"
            >
              <p
                style={{
                  color: '#9BB579',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '.9rem',
                  lineHeight: 1.5,
                  marginRight: '0.5rem',
                }}
              >
                Learn more about listing
              </p>
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{
                  color: '#9BB579',
                  fontSize: '.9rem',
                }}
              />
            </Link>
          </div>
          <div
            style={{
              padding: '1rem 0',
              width: '100%',
            }}
          >
            {/* <div
              style={{
                border: '1px solid #c5cbba',
                display: 'inline-block',
                borderRadius: '50px',
                padding: '1.5rem 3rem',
                backgroundColor: '#fafafa',
                position: 'relative',
              }}
            >
              <div
                style={{
                  borderRadius: '50%',
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#9bb579',
                  position: 'absolute',
                  right: '0.25rem',
                  top: '0.25rem',
                }}
              ></div>
            </div> */}
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {loading ? (
                  <>
                    <Skeleton style={{ height: '3.5rem' }} />
                    <Skeleton style={{ height: '3.5rem' }} />
                    <Skeleton style={{ height: '3.5rem' }} />
                    <Skeleton style={{ height: '3.5rem' }} />
                  </>
                ) : (
                  <div>
                    <ListingRow
                      direction={'row'}
                      align={'center'}
                      style={{ backgroundColor: 'rgba(0,0,0,0.07)' }}
                    >
                      <Flex
                        direction={'column'}
                        style={{ maxWidth: '25%', width: '100%' }}
                      >
                        <Text style={{ fontWeight: 700 }}>Listing</Text>
                      </Flex>
                      <Flex
                        style={{ maxWidth: '25%', width: '100%' }}
                        justify={'center'}
                        align={'center'}
                      >
                        <Text style={{ fontWeight: 700 }}>Type</Text>
                      </Flex>

                      <Flex
                        style={{ maxWidth: '25%', width: '100%' }}
                        justify={'center'}
                        align={'center'}
                      >
                        <Text style={{ fontWeight: 700 }}>Instructors</Text>
                      </Flex>
                      <Flex
                        style={{ maxWidth: '25%', width: '100%' }}
                        justify={'center'}
                        align={'center'}
                      >
                        <Text style={{ fontWeight: 700 }}>Created date</Text>
                      </Flex>
                    </ListingRow>
                    {data?.me?.listings?.map((l: any, index: number) => {
                      console.log('k', l);
                      return (
                        <ListingRow
                          as={Link}
                          to={'../user/listings/' + l._id}
                          state={l}
                          direction={'row'}
                          align={'center'}
                          key={l._id + index}
                        >
                          <Flex
                            direction={'column'}
                            style={{ maxWidth: '25%', width: '100%' }}
                          >
                            <Text
                              as={'h3'}
                              size={'4'}
                              style={{
                                fontWeight: 600,
                                paddingBottom: '0.25rem',
                              }}
                            >
                              {l.name}
                            </Text>
                            <Text
                              as={'h3'}
                              size={'3'}
                              style={{
                                fontWeight: 400,
                                width: '100%',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                lineHeight: 1.1,
                              }}
                            >
                              {l.description}
                            </Text>
                          </Flex>
                          <Flex
                            style={{ maxWidth: '25%', width: '100%' }}
                            justify={'center'}
                            align={'center'}
                          >
                            <Flex
                              align={'center'}
                              justify={'center'}
                              style={{
                                backgroundColor: 'rgba(166, 207, 102, 0.7)',
                                border: '1px solid rgba(166, 207, 102, 1)',
                                padding: '0.125rem 0.5rem',
                                borderRadius: 9999,
                              }}
                            >
                              <Text
                                as={'h6'}
                                size={'3'}
                                color={'white'}
                                style={{
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  lineHeight: 1,
                                }}
                              >
                                Epic
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex
                            style={{ maxWidth: '25%', width: '100%' }}
                            justify={'center'}
                            align={'center'}
                          >
                            <div
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '9999px',
                                backgroundColor: '#eaeaea',
                                position: 'relative',
                                zIndex: 4,
                              }}
                            ></div>
                            <div
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '9999px',
                                backgroundColor: '#dadada',
                                position: 'relative',
                                marginLeft: '-1.5rem',
                                zIndex: 3,
                              }}
                            ></div>
                            <div
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '9999px',
                                backgroundColor: '#cacaca',
                                position: 'relative',
                                marginLeft: '-1.5rem',
                                zIndex: 2,
                              }}
                            ></div>
                            <div
                              style={{
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '9999px',
                                backgroundColor: '#bababa',
                                position: 'relative',
                                marginLeft: '-1.5rem',
                                zIndex: 1,
                              }}
                            ></div>
                          </Flex>
                          <Flex
                            style={{ maxWidth: '25%', width: '100%' }}
                            justify={'center'}
                            align={'center'}
                          >
                            <Text
                              as={'h6'}
                              size={'3'}
                              style={{
                                fontWeight: 500,
                                lineHeight: 1,
                              }}
                            >
                              {l.date}
                            </Text>
                          </Flex>
                        </ListingRow>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          </div>
        </div>
      </Section>
    </Container>
  );
};

const ListingRow = styled(Flex, {
  backgroundColor: 'rgba(0,0,0,0.01)',
  padding: '0.625rem',
  borderBottom: '1px solid $gray3',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '$gray36',
  },
  '&:last-of-type': {
    border: 0,
  },
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
});

export default UserProfile;
