import './App.css';
import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Clarifai from 'clarifai';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Face from './Components/Face/Face'
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';


const app = new Clarifai.App({
  apiKey: '0b9431e178ae4bd69c08527da7d6febc'
});



class App extends Component {
  constructor() {
    super();
    
    this.state = { inputvalue: '', 
    imageUrl: '', 
    box: {},
    route:'signin',
    signedIn:false,
       user:{
        id:'',
        name: '',
        email: '',
        entries:0,
        joined:''
    }
   }
  }

  

  //coonecting Back end to frontend 
  // componentDidMount(){
  //   fetch("http://localhost:3001/")
  //   .then(response=>response.json())
  //   .then(data=>console.log(data));
  // }


  onInputChange = (event) => {
    this.setState({ inputvalue: event.target.value })
    
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById("inputimage")
    const width=Number(image.width);
    const height=Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayBox=(box)=>{
    this.setState({box:box})
  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.inputvalue })
    
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.inputvalue
    ).then(response => {
      if(response){
        fetch('https://pure-plateau-81160.herokuapp.com/image',{
          method:'put',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({
              id:this.state.user.id
          })
      }).then(response=>response.json())
      .then(count=>this.setState(Object.assign(this.state.user,{entries:count})))
      }
      this.displayBox(this.calculateFaceLocation(response))
    
    }).catch(err => console.log(err)
      )
    //console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
  }
  onRouteChange=(route)=>{
    if(route==='home'){
      this.setState({signedIn:true})
      this.setState({route:route})
    }else{
      this.setState({signedIn:false,route:route,imageUrl:''})
    }
    
  }

  onLoadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name: data.name,
      email: data.email,
      entries:data.entries,
      joined:data.joined
  }
    })
    console.log(this.state.user)
  }
  render() {
    return (
      <div className="App">
        
        <Navigation onRouteChange={this.onRouteChange} signedIn={this.state.signedIn}/>
         {this.state.route==='home'?
         <>
         <Logo />
         <Rank name={this.state.user.name} entries={this.state.user.entries}/>
         <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} /><Face imageUrl={this.state.imageUrl} box={this.state.box} />
        </>:
         (this.state.route==='Register'?<Register onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange} />:<Signin onRouteChange={this.onRouteChange} onLoadUser={this.onLoadUser}/>)
         }
      </div>
    );
  }
}

export default App;
