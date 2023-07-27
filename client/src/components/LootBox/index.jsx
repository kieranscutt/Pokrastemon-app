import "../../App.css";

export default function LootBox() {

  
  return (
    <div data-testid="lootBox" className="loot-box">
      <div data-testid="chest" className="chest">
        <div data-testid="chestBGkeyhole" className="chest_keyholeBG">
          <div data-testid="chestKeyhole" className="chest_keyhole"></div>
        </div>
      </div>
      <p>A LootBox! need 3 keys to open</p>
    </div>
  );
}
