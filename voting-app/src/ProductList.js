import React, { Component } from 'react'
import { data } from './data.js';
import Product from './Product'

class ProductList extends Component {
  state = {
      products: [],
  };

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    const products = data.sort((a, b) => {
      return b.votes - a.votes;
    });
    this.setState({ products: products });
  }

  handleUpVote = (productId) => {
    data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + 1;
        return;
      }
    });
    this.updateState();
  }

  render() {
   const products = this.state.products.map((product) => {
      return (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter={product.submitter}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVote={this.handleUpVote}
        />
      );
    });
    return (
      <div className='ui items'>
        {products}
      </div>
    );
  }
}

export default ProductList;
