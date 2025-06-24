export const searchAnime = async (query) => {
    try {
      const response = await axios.get(`https://api.jikan.moe${query}`);
      console.log(response.data); // Ajoutez cette ligne pour vérifier la structure des données
      return response.data.results;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
