import React from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/motoristas");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  return (
    <div className="landing-page">
      <h1>Página em construção</h1>
      <p>Estamos felizes em tê-lo aqui.</p>
      <button>Explorar</button>
    </div>
  );
}

export default LandingPage;
