
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';


interface Anime {
  mal_id: number; 
  title: string; 
  images: {
    jpg: {
      image_url: string; 
    };
  };
  synopsis: string; 
 
}

const App = () => {
  const [query, setQuery] = useState(''); 
  const [results, setResults] = useState<Anime[]>([]); 

 
  const searchAnime = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
      setResults(response.data.data); 
    } catch (error) {
      console.error('Erreur lors de la recherche d\'anime :', error); 
    }
  };

  return (
    <View style={styles.container}>
   
      <TextInput
        style={styles.input}
        placeholder="Rechercher un anime"
        value={query}
        onChangeText={setQuery}
      />
      
      <Button title="Rechercher" onPress={searchAnime} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.mal_id.toString()} 
        renderItem={({ item }) => (
          <TouchableOpacity>
           
            <Text style={styles.item}>{item.title}</Text>
           
            <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
        
            <Text style={styles.synopsis}>{item.synopsis}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa', 
  },
  input: {
    height: 44,
    borderColor: '#a18cd1',
    borderWidth: 1.5,
    marginBottom: 18,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: '#fff',
    fontSize: 17,
    color: '#333',
    shadowColor: '#a18cd1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6a11cb',
    marginBottom: 6,
    marginTop: 6,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'center',
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
 
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    shadowColor: '#a18cd1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  synopsis: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 20,
    textAlign: 'justify',
  },
});

export default App;
