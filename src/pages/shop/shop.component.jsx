import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CollectionPage from '../collection/collection.component';
import CollectionOverviewContainer from './../../components/collection-overview/collection-overview.container';
import WithSpinner from './../../components/with-spinner';

import { fetchCollectionsStartAsync } from './../../redux/shop/shop.actions';
import {
  SelectIsCollectionLoaded,
} from './../../redux/shop/shop.selector';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  componentDidMount() {
    this.state.fetchCollectionStartAsync();
  }

  render() {
    const { match, isCollectionLoaded } = this.props;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: SelectIsCollectionLoaded,
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionsStartAsync),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
