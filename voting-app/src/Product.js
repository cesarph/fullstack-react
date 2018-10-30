import React from 'react'

const Product = props => {
    return (
      <div className='item'>
        <div className='image'>
          <img src={props.product_image_url} alt={props.title}/>
        </div>
        <div className='middle aligned content'>
          <div className='ui grid'>
            <div className='three wide column'>
              <div className='ui basic center aligned segment'>
                <a onClick={() =>  props.onVote(props.id)}>
                  <i className='large caret up icon'></i>
                </a>
                <p><b>{props.votes}</b></p>
              </div>
            </div>
            <div className='twelve wide column'>
              <div className='header'>
                <a href={props.url}>
                  {props.title}
                </a>
              </div>
              <div className='meta'>
                <span></span>
              </div>
              <div className='description'>
                <p>{props.description}</p>
              </div>
              <div className='extra'>
                <span>Submitted by:</span>
                <img
                  className='ui avatar image'
                  src={props.submitter_avatar_url}
                  alt={props.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Product;