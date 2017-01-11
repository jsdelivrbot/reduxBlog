import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostNew extends Component {

  //gives access to this.context.router but try avioid using context
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props){
    this.props.createPost(props)
      .then(()=>{
        //blog post has been created. Navigate the user by calling this.context.router.push with the new path to navigate
        this.context.router.push('/');
      });
  }


  render(){
    const { fields: {title, categories, content}, handleSubmit } = this.props; //equivalent to const handleSubmit = this.props.handleSubmit;
    // console.log(title);
    //should pass an actioncreator on formsubmit
    //   <form onSubmit = {handleSubmit(this.props.createPost)}>
    return(
      <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post</h3>
          <div className = {`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`}>
            <label>Title</label>
            <input type = "text" className = "form-control" {...title} />
            <div className = "text-help">{title.touched? title.error : ''}</div>
          </div>
          <div className = {`form-group ${categories.touched && categories.invalid ? 'has-danger' : '' }`}>
            <label>Categories</label>
            <input type = "text" className = "form-control" {...categories} />
            <div className = "text-help">{categories.touched? categories.error : ''}</div>
          </div>
          <div className = {`form-group ${content.touched && content.invalid ? 'has-danger' : '' }`}>
            <label>Content</label>
            <textarea type = "text" className = "form-control" {...content} />
            <div className = "text-help">{content.touched? content.error : ''}</div>
          </div>
          <button type = "submit" className ="btn btn-primary">Submit</button>
          <Link to = "/" className = "btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};
  if(!values.title){
    errors.title = "Enter  a username";
  }
  if(!values.categories){
    errors.categories = "Enter  categories";
  }
  if(!values.content){
    errors.content = "Enter  a content";
  }
  return errors;
}

//connect: first argument is mapStatetoProps, second is mapDispatchToProps
//reduxForm: first is form config, second is mapStatetoProps, third is mapDispatchToProps
export default reduxForm({
  form: 'PostNewForm',
  fields: ['title', 'categories','content'], validate},
  null, {createPost })(PostNew);

//user types something in, record it in application state behind the scenes like this
// state === {
//   form: {
//     PostsNewForm: {
//       title: '...',
//       categories: '...',
//       content: '...'
//     }
//   }
// }
