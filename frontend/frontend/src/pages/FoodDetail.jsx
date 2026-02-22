import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FoodDetail() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const { fdc_id } = useParams();
  const navigate = useNavigate();
  
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


  return (
    <div>
        Food ID: {fdc_id}
    </div>
  );
}
