
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Définir le type des résultats de la recherche d'anime
interface Anime {
  mal_id: number; // Identifiant unique de l'anime
  title: string; // Titre de l'anime
  images: {
    jpg: {
      image_url: string; // URL de l'image de l'anime
    };
  };
  synopsis: string; // Synopsis de l'anime
  // Ajoutez d'autres propriétés si nécessaire
}

const App = () => {
  const [query, setQuery] = useState(''); // État pour stocker la requête de recherche
  const [results, setResults] = useState<Anime[]>([]); // État pour stocker les résultats de la recherche

  // Fonction pour rechercher des animes en utilisant l'API Jikan
  const searchAnime = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
      setResults(response.data.data); // Mettre à jour les résultats de la recherche
    } catch (error) {
      console.error('Erreur lors de la recherche d\'anime :', error); // Afficher l'erreur en cas de problème
    }
  };

  return (
    <View style={styles.container}>
      {/* Champ de saisie pour la requête de recherche */}
      <TextInput
        style={styles.input}
        placeholder="Rechercher un anime"
        value={query}
        onChangeText={setQuery}
      />
      {/* Bouton pour lancer la recherche */}
      <Button title="Rechercher" onPress={searchAnime} />
      {/* Liste des résultats de la recherche */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.mal_id.toString()} // Utiliser l'identifiant unique comme clé
        renderItem={({ item }) => (
          <TouchableOpacity>
            {/* Afficher le titre de l'anime */}
            <Text style={styles.item}>{item.title}</Text>
            {/* Afficher l'image de l'anime */}
            <Image source={{ uri: item.images.jpg.image_url }} style={styles.image} />
            {/* Afficher le synopsis de l'anime */}
            <Text style={styles.synopsis}>{item.synopsis}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles pour les composants
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6fa', // fond doux
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
  // Ajout d'un style pour la carte de chaque anime
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
