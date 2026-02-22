import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [FoodList, setFoodList] = useState([]);

  /*useEffect hook to check if there is a user logged in to this session. Navigate dependency isn't really needed
  It is just there as good practice*/
  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/auth/me/", { credentials: "include" });
      if (!resp.ok) {
        navigate("/login", { replace: true });
        return;
      }
      const data = await resp.json();
      setUser(data);
      setReady(true);

    })();
  }, [navigate]);



  /*useEffect hook for gradual search bar. Will query the backend whenever query variable
  is changed. There is a timer function so that the database isn't pinged for quick changes 
  in search*/
  useEffect(() => {
  if (query.length <= 1) {
    setFoodList([]);
    return;
  }

  const timer = setTimeout(() => {
    (async () => {
      const resp = await fetch(
        `/api/nutrition/searchfood/?q=${encodeURIComponent(query)}`
      );

      if (!resp.ok) return;

      const data = await resp.json();
      setFoodList(data);
    })();
  }, 100);

  return () => clearTimeout(timer);

}, [query]);

  if (!ready) return null;

  return (
  <div>
    <h1>Hello, {user.username}</h1>
    <div>
      <label htmlFor="food_search">Search foods</label>
      <input id="food_search" type="search" value={query} onChange={(e) => {
         setQuery(e.target.value);
         }}></input>

      <div>
        {FoodList.length > 0 && (
        <ul>
          {FoodList.map(food => (
            <li key={food.fdc_id}>
              {food.description} - {food.kcal} kcal
              <Link to={`/foods/${food.fdc_id}/`}>Add to meal</Link>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  </div>
);
}
