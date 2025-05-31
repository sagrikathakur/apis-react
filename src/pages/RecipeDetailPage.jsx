// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function RecipeDetailPage() {
//   const { id } = useParams();
//   const [recipe, setRecipe] = useState(null);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       const res = await fetch(`https://dummyjson.com/recipes/${id}`);
//       const data = await res.json();
//       setRecipe(data);
//     };

//     fetchRecipe();
//   }, [id]);

//   if (!recipe) return <p>Loading...</p>;

//   return (
//     <div className="recipe-detail">
//       <h2>{recipe.name}</h2>
//       <img src={recipe.image} alt={recipe.name} />
//       <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
//       <p><strong>Servings:</strong> {recipe.servings}</p>
//       <p><strong>Rating:</strong> {recipe.rating}</p>
//       <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
//       <h3>Ingredients</h3>
//       <ul>
//         {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
//       </ul>
//       <h3>Instructions</h3>
//       <ol>
//         {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
//       </ol>
//     </div>
//   );
// }

// export default RecipeDetailPage;



import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch recipe');
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) return <p className="error-message">Error: {error}</p>;
  if (!recipe) return <p className="loading-message">Loading...</p>;

  // Helper function to render star rating (max 5 stars)
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= roundedRating ? 'star filled' : 'star'}
          aria-hidden="true"
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="container">
      <h2 className="title">{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <p><strong>Meal Type:</strong> {recipe.mealType.join(', ')}</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <p>
        <strong>Rating:</strong> {renderStars(recipe.rating)} <span className="rating-number">({recipe.rating.toFixed(1)})</span>
      </p>
      <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i} className="list-item">{ing}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, i) => (
          <li key={i} className="list-item">{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetailPage;









