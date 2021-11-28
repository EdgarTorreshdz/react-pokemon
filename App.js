import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component{

  state = {
    loading: true,
    pokemon: [],
    abilities: []
  }



  async componentDidMount () {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({pokemon: data.results,loading: false})
  }

  render(){
    if(this.state.loading){
      return <div>loading ... </div>;
    }
    if(!this.state.pokemon){
      return <div>No se han encontrado pokemons </div>;
    }
    return(
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Pokemones</h1>
        <ul>
          {
            this.state.pokemon.map(function(pokemon, i){
              return (
                <li>{pokemon.name} <button onClick={
                  async (e) => {
                    let abilities = [];
                    let habilidades = "";
                    const url = pokemon.url
                    const response = await fetch(url);
                    const data = await response.json();
                    abilities = data.abilities;
                    abilities.map(function(hab, i){
                      i++;
                      habilidades += "#"+i+": "+hab.ability.name+" \n";
                    })
                    alert(
                      "las habilidades del pokemon: \n"+pokemon.name+
                      "\nson las siguientes: \n"+
                      habilidades
                      );
                  }
                }>ver</button></li>
              )
              
            })
          }
        </ul>
        
      </div>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


