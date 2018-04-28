import React from 'react';

import Form from './Form';

class AddProfile extends React.Component {

  addUser(user) {
    console.log('adding user',user);
  }
  render() {
    return (
      <div className="container">
        <Form userData={{}}
          onSubmit={(user)=>{
            this.addUser(user);
          }
          }/>
      </div>
    )
  }
}


export default AddProfile;
