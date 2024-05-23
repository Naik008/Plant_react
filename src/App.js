import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [plants, setPlants] = useState([]);
  const [plantName, setPlantName] = useState("");
  const [page, setPage] = useState("top"); // ページの状態を管理

  const growthStages = ["種", "種芽", "若芽", "花"];
  
  const addPlant = () => {
    if (plantName.trim() === "") return;
    const newPlant = {
      id: Date.now(),
      name: plantName.trim(),
      growthStage: 0,
      totalActions: 0, // 水やりと日光の合計回数
    };
    setPlants([...plants, newPlant]);
    setPlantName("");
  };

  const deletePlant = (id) => {
    const updatedPlants = plants.filter(plant => plant.id !== id);
    setPlants(updatedPlants);
  };

  const performAction = (id) => {
    const updatedPlants = plants.map(plant => {
      if (plant.id === id && plant.growthStage < 3) { // 最終成長段階を超えていない場合のみ
        const newTotalActions = plant.totalActions + 1;
        let newGrowthStage = plant.growthStage;

        // 成長段階が進むごとにアクションを付ける
        let action = "";
        if (newTotalActions === 10) {
          action = <strong>芽が出ました！</strong>;
        } else if (newTotalActions === 20) {
          action = <strong>葉っぱが広がってきました！</strong>;
        } else if (newTotalActions === 30) {
          action = <strong>花が咲きました！</strong>;
        }

        if (newTotalActions >= 10 && newTotalActions < 40) {
          newGrowthStage = Math.min(Math.floor(newTotalActions / 10), 3);
        }

        return {
          ...plant,
          totalActions: newTotalActions,
          growthStage: newGrowthStage,
          action: action,
        };
      }
      return plant;
    });
    setPlants(updatedPlants);
  };

  const switchToTopPage = () => {
    setPage("top");
  };

  const switchToPlantListPage = () => {
    setPage("plantList");
  };

  return (
    <div>
      {page === "top" && (
        <div id='top'>
          <h1>植物図鑑</h1>
          <button onClick={switchToPlantListPage} id='next'>植物リストを見る</button>
        </div>
      )}

      {page === "plantList" && (
        <div>
          <h1>植物リスト</h1>
          <div className="plant-list-container">
            <ul className="plant-list">
              {plants.map(plant => (
                <li key={plant.id}>
                  {plant.name} - 成長段階: {growthStages[plant.growthStage]}（水やりと日光: {plant.totalActions} 回）
                  {plant.action && (
                    <div>
                      <p>{plant.action}</p>
                    </div>
                  )}
                  {(plant.growthStage < 3) && (
                    <div>
                      <button onClick={() => performAction(plant.id)}>水やり</button>
                      <button onClick={() => performAction(plant.id)}>日光をあげる</button>
                    </div>
                  )}
                  {plant.growthStage === 3 && (
                    <button onClick={() => deletePlant(plant.id)}>削除</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <input
            type="text"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
          />
          <button onClick={addPlant} id='tuika'>追加</button>
          <div className='buback'>
            <button onClick={switchToTopPage} id='back'>トップページに戻る</button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default App;
