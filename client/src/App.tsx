import React, { SetStateAction, useState, Suspense } from 'react';
import { useApolloClient } from '@apollo/client';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { globalStyles } from '../stitches.config';
import { LoadingProvider } from './helpers/useLoading';
import ColourModeProvider from './components/ThemeProvider/ThemeProvider';
import { Splash } from './scenes';
import { UserProfile } from './scenes/User';
import { UserAddListing } from './scenes/User/Listings';
import { Footer, Notify, ScrollToTop, Toast, TopBar } from './components';

const AddBusiness = React.lazy(
  () => import('./scenes/AddBusiness/AddBusiness')
);
const AddListing = React.lazy(() => import('./scenes/AddListing/AddListing'));
const Business = React.lazy(() => import('./scenes/Business/Business'));
const BusinessListingEdit = React.lazy(
  () => import('./scenes/Business/Listings/Edit/Edit')
);
const Cart = React.lazy(() => import('./scenes/Checkout/Cart/Cart'));
const Checkout = React.lazy(() => import('./scenes/Checkout/Checkout'));
const Company = React.lazy(() => import('./scenes/Company/Company'));
const FAQ = React.lazy(() => import('./scenes/FAQ/FAQ'));
const Home = React.lazy(() => import('./scenes/Home/Home'));
const Listing = React.lazy(() => import('./scenes/Listing/Listing'));
const Login = React.lazy(() => import('./scenes/Login/Login'));
const MapScene = React.lazy(() => import('./scenes/MapScene/MapScene'));
const NotFound = React.lazy(() => import('./scenes/NotFound/NotFound'));
const UserOuting = React.lazy(() => import('./scenes/User/Outing/Outing'));
const Register = React.lazy(() => import('./scenes/Register/Register'));
const Success = React.lazy(() => import('./scenes/Checkout/Success/Success'));
const User = React.lazy(() => import('./scenes/User/User'));
const UserEditListing = React.lazy(
  () => import('./scenes/User/Listings/Edit/Edit')
);
const WhoWeAre = React.lazy(() => import('./scenes/WhoWeAre/WhoWeAre'));

const App = () => {
  const initialToken = localStorage.getItem('outland-user-token');
  const client = useApolloClient();
  const [token, setToken] = useState<string | number | null>(initialToken);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchedLocation, setSearchedLocation] = useState<any | null>(null);
  const [listings, setListings] = useState<any | null>(null);
  const { pathname, search } = useLocation();
  const [locationCoords, setLocationCoords] = useState<Array<number>>();

  globalStyles();

  let navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setToken(null);
    navigate('/home', { replace: true });
  };

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <ColourModeProvider>
      <LoadingProvider>
        {errorMessage && <Toast type={'alert'}>{errorMessage}</Toast>}
        <TopBar
          setSearchedLocation={setSearchedLocation}
          searchedLocation={searchedLocation}
          token={token}
          logout={logout}
        />
        <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route
              path="*"
              element={<NotFound setToken={setToken} token={token} />}
            />
            <Route
              path="/home"
              element={
                <Home
                  logout={logout}
                  token={token}
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login setToken={setToken} setError={notify} token={token} />
              }
            />
            <Route
              path="/register"
              element={<Register notify={notify} token={token} />}
            />
            <Route
              path="/map"
              element={
                <MapScene
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  locationCoords={locationCoords}
                />
              }
            />
            <Route
              path="/addlisting"
              element={
                <AddListing
                  setError={notify}
                  setToken={setToken}
                  token={token}
                  searchedLocation={searchedLocation}
                  setSearchedLocation={setSearchedLocation}
                />
              }
            />
            <Route path="/listings/:id" element={<Listing token={token} />} />
            <Route
              path="/addbusiness"
              element={
                <AddBusiness
                  setError={notify}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/business"
              element={
                <Business
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/business/listings"
              element={
                <Business
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                  setListings={setListings}
                />
              }
            />
            <Route
              path="/business/listings/add"
              element={
                <Business
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                  isActive={'listing'}
                />
              }
            />
            <Route
              path="/business/listings/:id"
              element={
                <Business
                  searchedLocation={searchedLocation}
                  setSearchedLocation={setSearchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                  isActive={'listing'}
                />
              }
            />
            <Route
              path="/business/schedule"
              element={
                <Business
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/business/roster"
              element={
                <Business
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/business/feedback"
              element={
                <Business
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/business/settings"
              element={
                <Business
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setError={notify}
                  setToken={setToken}
                  token={token}
                />
              }
            />
            <Route
              path="/checkout/success"
              element={
                <Success
                  searchedLocation={undefined}
                  setSearchedLocation={function (value: any): void {
                    throw new Error('Function not implemented.');
                  }}
                  setToken={function (
                    value: SetStateAction<string | number | null>
                  ): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              }
            />
            <Route
              path="/user/:id"
              element={
                <User
                  setSearchedLocation={setSearchedLocation}
                  searchedLocation={searchedLocation}
                  setToken={setToken}
                  token={token}
                  setError={notify}
                />
              }
            />
            <Route
              path="/user/outing"
              element={<UserOuting token={token} setError={notify} />}
            />
            <Route
              path="/user/profile"
              element={<UserProfile token={token} setError={notify} />}
            />
            <Route
              path="/user/listings/add"
              element={
                <UserAddListing
                  searchedLocation={searchedLocation}
                  setToken={setToken}
                  token={token}
                  setError={notify}
                  setSearchedLocation={setSearchedLocation}
                />
              }
            />
            <Route
              path="/user/listings/:id"
              element={
                <UserEditListing
                  token={token}
                  searchedLocation={searchedLocation}
                  setSearchedLocation={setSearchedLocation}
                  setToken={setToken}
                />
              }
            />
            <Route path="/company" element={<Company notify={notify} />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about/who-we-are" element={<WhoWeAre />} />
          </Routes>
        </Suspense>
        <Footer />
      </LoadingProvider>
    </ColourModeProvider>
  );
};

export default App;
