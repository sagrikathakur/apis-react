import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('token');
      const userRes = await fetch('https://dummyjson.com/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      setUser(userData);

      const recipeRes = await fetch('https://dummyjson.com/recipes');
      const recipeData = await recipeRes.json();
      setRecipes(recipeData.recipes);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    
    <div>
      <h3>MyPracticeApp.com</h3>
      <hr />
      <div className="header">
        {user && (
          <div className="user-info">
            <img src={user.image} alt={user.firstName} />
            <span>{user.firstName}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>Time: {recipe.cookTimeMinutes} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeListPage;
