import { gql } from '@apollo/client';

const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`;

export const FIND_USER = gql`
  query findUserById($idToSearch: ID!) {
    findUser(id: $idToSearch) {
      id
      username
      listings {
        _id
        name
        date
        rating
        price
        city
        state
        description
        type
        listingPhoto
      }
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`;

export const ALL_PERSONS = gql`
  {
    allPersons {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

export const PERSON_COUNT = gql`
  {
    personCount
  }
`;

export const GET_LOCATION = gql`
  query getLocationSearch($searchValue: String) {
    getLocation(search: $searchValue) {
      city
      state_name
      state_id
    }
  }
`;

const LISTING_DETAILS = gql`
  fragment ListingDetails on Listing {
    _id
    name
    description
    address
    city
    state
    instructor
    maxCount
    minCount
    equipment
    requirements
    restrictions
    duration
    courseType
    skillLevel
    rating
    price
    type
    date
    time
    lng
    lat
    listingPhoto
    createdAt
    updatedAt
  }
`;

const BUSINESS_DETAILS = gql`
  fragment BusinessDetails on Business {
    id
    business_name
    email
    cover_photo
    owner_id
    profile
    status
    address
    state
    city
    zipcode
    members
    stripe_id
    listings
    transactions
    createdAt
    updatedAt
  }
`;

const SEARCH_DETAILS = gql`
  fragment SearchDetails on Listing {
    _id
    name
    description
    city
    state
    rating
    price
    date
    type
    address
    lat
    lng
    score
    listingPhoto
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($listingId: String) {
    addFavorite(listingId: $listingId) {
      username
      favorites {
        _id
      }
    }
  }
`;

export const CREATE_BUSINESS = gql`
  mutation createBusiness(
    $business_name: String!
    $email: String!
    $cover_photo: String
  ) {
    createBusiness(
      business_name: $business_name
      email: $email
      cover_photo: $cover_photo
    ) {
      business_name
    }
  }
`;

export const CREATE_LISTING = gql`
  mutation createListing(
    $name: String!
    $description: String
    $address: String
    $city: String
    $state: String
    $instructor: String
    $maxCount: String
    $minCount: String
    $equipment: String
    $requirements: String
    $restrictions: String
    $duration: String
    $courseType: String
    $skillLevel: String
    $rating: String
    $price: String
    $type: String
    $date: String
    $time: String
    $listingPhoto: String
  ) {
    addListing(
      name: $name
      description: $description
      address: $address
      city: $city
      state: $state
      instructor: $instructor
      maxCount: $maxCount
      minCount: $minCount
      equipment: $equipment
      requirements: $requirements
      restrictions: $restrictions
      duration: $duration
      courseType: $courseType
      skillLevel: $skillLevel
      rating: $rating
      price: $price
      type: $type
      date: $date
      time: $time
      listingPhoto: $listingPhoto
    ) {
      name
      description
      address
      city
      state
      instructor
      maxCount
      minCount
      equipment
      requirements
      restrictions
      duration
      courseType
      skillLevel
      rating
      price
      type
      date
      time
      listingPhoto
      id
    }
  }
`;

export const EDIT_LISTING = gql`
  mutation editListing(
    $id: String
    $name: String!
    $description: String
    $address: String
    $city: String
    $state: String
    $instructor: String
    $maxCount: String
    $minCount: String
    $equipment: String
    $requirements: String
    $restrictions: String
    $duration: String
    $courseType: String
    $skillLevel: String
    $rating: String
    $price: String
    $type: String
    $date: String
    $time: String
  ) {
    editListing(
      id: $id
      name: $name
      description: $description
      address: $address
      city: $city
      state: $state
      instructor: $instructor
      maxCount: $maxCount
      minCount: $minCount
      equipment: $equipment
      requirements: $requirements
      restrictions: $restrictions
      duration: $duration
      courseType: $courseType
      skillLevel: $skillLevel
      rating: $rating
      price: $price
      type: $type
      date: $date
      time: $time
    ) {
      name
      description
      address
      city
      state
      instructor
      maxCount
      minCount
      equipment
      requirements
      restrictions
      duration
      courseType
      skillLevel
      rating
      price
      type
      date
      time
      id
    }
  }
`;

export const FIND_BY_LOCATION = gql`
  query findByLocationSearch($searchValue: String!) {
    findByLocation(city: $searchValue) {
      ...ListingDetails
    }
  }
  ${LISTING_DETAILS}
`;

export const ALL_LISTINGS = gql`
  {
    allListings {
      ...ListingDetails
    }
  }
  ${LISTING_DETAILS}
`;

export const ALL_LISTINGS_BY_USER = gql`
  query {
    allListingsByUser {
      ...ListingDetails
    }
  }
  ${LISTING_DETAILS}
`;

export const FIND_LISTING_BY_ID = gql`
  query findListingByIdSearch($searchIdValue: String!) {
    findListingById(id: $searchIdValue) {
      ...ListingDetails
    }
  }
  ${LISTING_DETAILS}
`;

export const SEARCH_LISTINGS = gql`
  query searchListingsSearch(
    $swLat: Float
    $swLng: Float
    $neLat: Float
    $neLng: Float
    $filterType: [String]
  ) {
    searchListings(
      swLat: $swLat
      swLng: $swLng
      neLat: $neLat
      neLng: $neLng
      filterType: $filterType
    ) {
      ...SearchDetails
    }
  }
  ${SEARCH_DETAILS}
`;

export const ME = gql`
  query me {
    me {
      username
      avatar
      about
      listings {
        _id
        name
        description
        listingPhoto
      }
      favorites {
        _id
      }
    }
  }
`;

export const GET_LISTINGS_IN_BOUNDS = gql`
  query getListingsByLngLatSearch(
    $swLat: Float
    $swLng: Float
    $neLat: Float
    $neLng: Float
    $filterType: [String]
  ) {
    getListingsByLngLat(
      swLat: $swLat
      swLng: $swLng
      neLat: $neLat
      neLng: $neLng
      filterType: $filterType
    ) {
      ...ListingDetails
    }
  }
  ${LISTING_DETAILS}
`;

export const PAGE_QUERY = gql`
  query {
    allPersons {
      ...PersonDetails
    }
    allListings {
      ...ListingDetails
    }
    me {
      username
    }
  }
  ${PERSON_DETAILS}
  ${LISTING_DETAILS}
`;

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($avatar: String, $about: String) {
    editUser(avatar: $avatar, about: $about) {
      avatar
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $name: String
    $email: String
    $receiver_id: String
    $listing_id: String
    $items: [String]
    $payment_intent: String
  ) {
    createTransaction(
      name: $name
      email: $email
      receiver_id: $receiver_id
      listing_id: $listing_id
      items: $items
      payment_intent: $payment_intent
    ) {
      clientSecret
      payment_intent
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      email
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation UploadFile(
    $name: String
    $type: String
    $size: Float
    $path: String!
  ) {
    uploadFile(name: $name, type: $type, size: $size, path: $path) {
      path
      imageId
    }
  }
`;
