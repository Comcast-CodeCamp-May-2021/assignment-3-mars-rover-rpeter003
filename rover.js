class Rover {
   // Write code here!
   constructor(position){
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110
     }
receiveMessage(message){
  let response = {
    message: message.name,
    results: []
  }
  for(let i = 0; i < message.commands.length; i++){
    if (message.commands[i].commandType === "STATUS_CHECK"){
    let statusCheck = {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}}
    response.results.push(statusCheck)

    }else if (message.commands[i].commandType === "MODE_CHANGE"){
      this.mode = (message.commands[i].value);
      let completed = {completed: true};
      response.results.push(completed);

    }else if (message.commands[i].commandType==="MOVE"){
        if(this.mode==="LOW_POWER"){
          let completed = {completed: false}
          response.results.push(completed)
        }else{    
          this.position=(message.commands[i].value);
          let completed = {completed: true};
          response.results.push(completed);
      }
    }
  }
  return response;
  } 

}

module.exports = Rover;